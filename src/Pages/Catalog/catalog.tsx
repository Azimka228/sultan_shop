import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../Store/hooks/useAppSelector";
import wrapper from "../../Styles/wrapper.module.scss";
import styles from "./index.module.scss"
import breadCrumbs from "../../Styles/breadCrumbs.module.scss";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {AppLinks} from "../../Routes/links";
import {DefaultCustomTitle} from "../../Components/DefaultCustomTitle/defaultCustomTitle";
import {CardItem} from "../../Components/CardItem/cardItem";
import FilterByPrice from "../../Components/FilterByNumber/filterByPrice";
import {FilterByString} from "../../Components/FilterByString/filterByString";
import {getDataSearchByString} from "../../Utills/getDataSearchByString";
import {MenuSortBy} from "../../Components/MenuSortBy/menuSortBy";
import deleteIcon from "../../assets/delete.svg"

import {useAppDispatch} from "../../Store/hooks/useAppDispatch";
import {
	catalogDataDefaultSort,
	catalogDataFilterByManufacturer,
	catalogDataFilterByPrice,
	DefaultSortType,
	setCatalogData,
	setCurrentPage,
	setFilterByPrice
} from "../../Store/slices/productListFilter";
import Pagination from "../../Components/Pagination/pagination";

type FilterStateType = {
	max: number
	min: number
	sortBy: DefaultSortType
	filterByManufacturer: Array<string>
}

const Catalog = () => {
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();

	const items = useAppSelector((state) => state.productListFilter.productsList)
	const itemsCopy = useAppSelector((state) => state.productListFilter.productsListCopy)

	console.log(items)

	const sortByList = useAppSelector(state => state.productListFilter.sortByList)

	const filterSortBy = useAppSelector(state => state.productListFilter.sortBy)
	const filterByMaxPrice = useAppSelector(state => state.productListFilter.maxPrice)
	const filterByMinPrice = useAppSelector(state => state.productListFilter.minPrice)
	const filterCurrentPage = useAppSelector(state => state.productListFilter.currentPage)
	const filterCountPerPage = useAppSelector(state => state.productListFilter.countPerPage)

	const [filterState, setFilterState] = useState<FilterStateType>({
		max: filterByMaxPrice,
		min: filterByMinPrice,
		sortBy: filterSortBy,
		filterByManufacturer: []
	})

	useEffect(() => {
		type ParamsType = {
			maxPrice: string
			minPrice: string
			sortBy: string
			page: string
		}
		const params: ParamsType = {
			maxPrice: "0",
			minPrice: "0",
			sortBy: "price:asc",
			page: "1"
		}

		if (filterByMaxPrice >= 0) params.maxPrice = String(filterByMaxPrice)
		if (filterByMinPrice >= 0) params.minPrice = String(filterByMinPrice)
		switch (filterSortBy) {
			case "дешевые" : {
				params.sortBy = "price-asc"
				break;
			}
			case "дорогие" : {
				params.sortBy = "price-desc"
				break;
			}
			case "по названию A-Z" : {
				params.sortBy = "title-asc"
				break;
			}
			case "по названию Z-A" : {
				params.sortBy = "title-desc"
				break;
			}
		}
		params.page = String(filterCurrentPage)
		setSearchParams(params)

	}, [filterByMaxPrice, filterByMinPrice, filterSortBy, filterCurrentPage])

	const itemTypesFiltred = new Set()
	items.forEach((item) => {
		item.itemType.forEach(el => {
			(itemTypesFiltred.add(el))
		})
	})
	let itemTypesFiltredArr = (Array.from(itemTypesFiltred)) as string[]

	const handleDisablePageNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
	}

	// That for pagination
	const lastItemsIndex = filterCurrentPage * filterCountPerPage
	const firstItemsIndex = lastItemsIndex - filterCountPerPage
	const currentItems = items.slice(firstItemsIndex, lastItemsIndex)
	//

	const productCardItems = currentItems.map(el => (<CardItem data={el}/>))
	const typeCardItems = itemTypesFiltredArr.map((el) => (<div className={styles.typeCards__item}>{el}</div>))

	const filtredItemsByPrice = items.filter(el => el.price >= filterState.min && el.price <= filterState.max)

	const itemsByManufacturer = getDataSearchByString(filtredItemsByPrice, "manufacturer")

	useEffect(() => {
		const maxPriceParams = searchParams.get("maxPrice") ?? filterByMaxPrice
		const minPriceParams = searchParams.get("minPrice") ?? filterByMinPrice
		const sortByParams = searchParams.get("sortBy")
		const pageParams = searchParams.get("page") ?? filterCurrentPage

		type SortBY = {
			value: DefaultSortType
		}
		const sortBy: SortBY = {
			value: "дешевые"
		}
		switch (sortByParams) {
			case "price-asc" : {
				sortBy.value = "дешевые"
				break;
			}
			case "price-desc" : {
				sortBy.value = "дорогие"
				break;
			}
			case "title-asc" : {
				sortBy.value = "по названию A-Z"
				break;
			}
			case "title-desc" : {
				sortBy.value = "по названию Z-A"
				break;
			}
		}

		setFilterState({...filterState, sortBy: sortBy.value, max: Number(maxPriceParams), min: Number(minPriceParams)})
		dispatch(catalogDataDefaultSort({sortBy: sortBy.value}))
		dispatch(catalogDataFilterByPrice({maxPrice: Number(maxPriceParams), minPrice: Number(minPriceParams)}))
		dispatch(setFilterByPrice({max: Number(maxPriceParams), min: Number(minPriceParams)}))
		dispatch(setCurrentPage({page: Number(pageParams)}))
	}, [location])

	const handleChangeSelectionByPrice = (max: number, min: number) => {
		setFilterState({...filterState, max, min, filterByManufacturer: []})
	}
	const handleSubmitParametrs = () => {
		dispatch(catalogDataFilterByManufacturer({value: filterState.filterByManufacturer}))
		dispatch(setFilterByPrice({max: filterState.max, min: filterState.min}))
	}
	const handleResetParametrs = () => {
		setFilterState({...filterState, max: 10000, min: 0, filterByManufacturer: []})
		dispatch(setFilterByPrice({max: 10000, min: 0}))
		dispatch(setCatalogData({productsList: itemsCopy}))
	}
	const handleChangeDefaultSort = (e: DefaultSortType) => {
		setFilterState({...filterState, sortBy: e})
		dispatch(catalogDataDefaultSort({sortBy: e}))
	}
	const handleChangeFilterByManufacturer = (e: Array<string>) => {
		setFilterState({...filterState, filterByManufacturer: e})
	}

	const handleSetPage = (value: number) => {
		dispatch(setCurrentPage({page: value}))
	}

	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				<div className={breadCrumbs.navigate}>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.home}>Главная</Link>
					</div>
					<div className={breadCrumbs.navigate__item}>
						<Link
							to={AppLinks.catalog}
							onClick={handleDisablePageNavigation}
							className={breadCrumbs.navigate__item_disabled}
						>Каталог</Link>
					</div>
				</div>
				<div className={styles.header}>
					<DefaultCustomTitle text={"Косметика и гигиена"}/>
					<MenuSortBy
						selected={filterState.sortBy}
						sortBy={sortByList}
						onChangeSelected={handleChangeDefaultSort}
					/>
				</div>
				<div className={styles.typeCards}>
					{typeCardItems}
				</div>
				<div className={styles.catalogGroup}>
					<div className={styles.filterPanel}>
						<div>
							<div className={styles.filterPanel__title}><p>ПОДБОР ПО ПАРАМЕТРАМ</p></div>
							<div className={styles.filterPanel__priceTitle}>Цена <b>₸</b></div>
							<FilterByPrice
								initialValue={{max: filterState.max, min: filterState.min}}
								onChangeCallback={handleChangeSelectionByPrice}
							/>
							<FilterByString
								onChangeCallback={handleChangeFilterByManufacturer}
								data={itemsByManufacturer}
								title={"Производитель"}
								itemsAmountByStart={4}/>
							<div className={styles.filterPanel__btns}>
								<button
									onClick={handleSubmitParametrs}
									className={styles.filterPanel__submit}
								>Показать
								</button>
								<button
									onClick={handleResetParametrs}
									className={styles.filterPanel__reset}
								>
									<img
										src={deleteIcon}
										alt="deleteIcon"
									/>
								</button>
							</div>
						</div>
						<div className={styles.filterPanel__itemTypeCare}>
							<div className={styles.itemTypeCare__title}>Уход за собой</div>
							<div className={styles.line}></div>
							<div className={styles.itemTypeCare__title}>Уход за собой</div>
							<div className={styles.line}></div>
							<div className={styles.itemTypeCare__title}>Уход за собой</div>
							<div className={styles.line}></div>
						</div>
					</div>
					<div>
						<div className={styles.cards}>
							{productCardItems}
						</div>
						<Pagination currentPage={filterCurrentPage}
																		onSetPage={handleSetPage}
																		countPerPage={filterCountPerPage}
																		totalCountItems={items.length}
						/>
						<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis
							iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed
							pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim,
							malesuada.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Catalog;