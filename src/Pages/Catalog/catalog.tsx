import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../Store/hooks/useAppSelector";
import wrapper from "../../Styles/wrapper.module.scss";
import styles from "./index.module.scss"
import breadCrumbs from "../../Styles/breadCrumbs.module.scss";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {AppLinks} from "../../Routes/links";
import {DefaultCustomTitle} from "../../Components/DefaultCustomTitle/defaultCustomTitle";
import {CardItem} from "../../Components/CardItem/cardItem";
import {getDataSearchByString} from "../../Utills/getDataSearchByString";
import {MenuSortBy} from "../../Components/MenuSortBy/menuSortBy";
import bradCrumbsLogo from "../../assets/bradCrumbsArrow.svg"

import {useAppDispatch} from "../../Store/hooks/useAppDispatch";
import {
	catalogDataDefaultSort,
	catalogDataFilterByItemType,
	catalogDataFilterByManufacturer,
	catalogDataFilterByPrice,
	DefaultSortType,
	setCatalogData,
	setCurrentPage,
	setFilterByPrice,
	setSortByItemType
} from "../../Store/slices/productListFilter";
import Pagination from "../../Components/Pagination/pagination";
import {useMediaQuery} from "usehooks-ts";
import {SelectionByParametrs} from "../../Components/SelectionByParametrs/selectionByParametrs";

type FilterStateType = {
	max: number
	min: number
	sortBy: DefaultSortType
	filterByManufacturer: Array<string>
}
type ParamsType = {
	maxPrice: string
	minPrice: string
	sortBy: string
	page: string
	SortByItemType?: string
}

const Catalog = () => {
	const isTablet = useMediaQuery("(max-width: 768px)")
	const isMobile = useMediaQuery("(max-width: 480px)")

	useEffect(() => {
		//This code is for loading search parameters by "Item type"
		const SortByItemTypeParams = searchParams.get("SortByItemType")

		let SortByItemTypeArray: Array<string> = []
		if (SortByItemTypeParams !== null) {
			SortByItemTypeArray = SortByItemTypeParams.split(",")
			dispatch(setSortByItemType({item: SortByItemTypeArray}))
		}
	}, [])
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();

	const items = useAppSelector((state) => state.productListFilter.productsList)
	const itemsCopy = useAppSelector((state) => state.productListFilter.productsListCopy)

	const sortByList = useAppSelector(state => state.productListFilter.sortByList)

	const filterSortBy = useAppSelector(state => state.productListFilter.sortBy)
	const filterByMaxPrice = useAppSelector(state => state.productListFilter.maxPrice)
	const filterByMinPrice = useAppSelector(state => state.productListFilter.minPrice)
	const filterCurrentPage = useAppSelector(state => state.productListFilter.currentPage)
	const filterCountPerPage = useAppSelector(state => state.productListFilter.countPerPage)
	const filterSortByItemType = useAppSelector(state => state.productListFilter.sortByItemType)

	const [filterState, setFilterState] = useState<FilterStateType>({
		max: filterByMaxPrice,
		min: filterByMinPrice,
		sortBy: filterSortBy,
		filterByManufacturer: []
	})

	useEffect(() => {

		const params: ParamsType = {
			maxPrice: "0",
			minPrice: "0",
			sortBy: "price:asc",
			page: "1",

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
		if (filterSortByItemType.length > 0) {
			params.SortByItemType = filterSortByItemType.join(",")
		}

		params.page = String(filterCurrentPage)
		setSearchParams(params)
	}, [filterByMaxPrice, filterByMinPrice, filterSortBy, filterCurrentPage, filterSortByItemType])

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

	const handleAddItemTypes = (item: string) => {
		dispatch(setSortByItemType({item}))
	}
	const typeCardItems = itemTypesFiltredArr.map((el) => {
		let isSelectedItem
		if (filterSortByItemType.includes(el)) {
			isSelectedItem = `${styles.typeCards__item} ${styles.typeCards__item_selected}`
		} else {
			isSelectedItem = styles.typeCards__item
		}

		return (
			<div
				onClick={() => handleAddItemTypes(el)}
				className={isSelectedItem}
			>
				{el}
			</div>
		)
	})
	const leftMenuTypeCardsItems = itemTypesFiltredArr.map((el, index, array) => {
		let isSelectedItem
		if (filterSortByItemType.includes(el)) {
			isSelectedItem = `${styles.itemTypeCare__title} ${styles.itemTypeCare__title_selected}`
		} else {
			isSelectedItem = styles.itemTypeCare__title
		}

		const linesAfterItem = index !== array.length - 1 && <div className={styles.line}></div>

		return (
			<>
				<div className={isSelectedItem} onClick={() => handleAddItemTypes(el)}>{el}</div>
				{!isMobile && linesAfterItem}
			</>
		)
	})

	const filtredItemsByPrice = items.filter(el => el.price >= filterState.min && el.price <= filterState.max)

	const itemsByManufacturer = getDataSearchByString(filtredItemsByPrice, "manufacturer")

	useEffect(() => {
		const maxPriceParams = searchParams.get("maxPrice") ?? filterByMaxPrice
		const minPriceParams = searchParams.get("minPrice") ?? filterByMinPrice
		const sortByParams = searchParams.get("sortBy")
		const pageParams = searchParams.get("page") ?? filterCurrentPage
		const SortByItemTypeParams = searchParams.get("SortByItemType")

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

		let SortByItemTypeArray: Array<string> = []
		if (SortByItemTypeParams !== null) {
			SortByItemTypeArray = SortByItemTypeParams.split(",")
			dispatch(catalogDataFilterByItemType({fitlerValues: SortByItemTypeArray}))
		}

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
					{isMobile ?
						<div className={breadCrumbs.navigate__item_mobile}>
							<Link to={AppLinks.home}>
								<div><img src={bradCrumbsLogo} alt="bradCrumbsLogo"/></div>
								Назад
							</Link>
						</div>
						:
						<>
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
						</>}
				</div>
				<div className={styles.header}>
					<DefaultCustomTitle text={"Косметика и гигиена"}/>
					{!isTablet && <MenuSortBy
      selected={filterState.sortBy}
      sortBy={sortByList}
      onChangeSelected={handleChangeDefaultSort}
     />}
				</div>
				{!isTablet && <div className={styles.typeCards}>
					{typeCardItems}
    </div>}
				<div className={styles.catalogGroup}>
					<div className={styles.filterPanel}>
						<SelectionByParametrs
							FilterByPriceData={{max: filterState.max, min: filterState.min}}
							FilterByStringData={itemsByManufacturer}
							onChangeFilterByPrice={handleChangeSelectionByPrice}
							onChangeFilterByString={handleChangeFilterByManufacturer}
							onResetResetParametrs={handleResetParametrs}
							onSubmitParametrs={handleSubmitParametrs}
						/>
						<div className={styles.filterPanel__itemTypeCare}>
							{leftMenuTypeCardsItems}
						</div>
						{isTablet && <MenuSortBy
       selected={filterState.sortBy}
       sortBy={sortByList}
       onChangeSelected={handleChangeDefaultSort}
      />}
					</div>
					<div>
						<div className={styles.cards}>
							{productCardItems}
						</div>
						<Pagination
							currentPage={filterCurrentPage}
							onSetPage={handleSetPage}
							countPerPage={filterCountPerPage}
							totalCountItems={items.length}
						/>
						<div className={styles.cards__description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
							interdum ut justo, vestibulum sagittis
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