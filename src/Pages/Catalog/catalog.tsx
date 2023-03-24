import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../Store/hooks/useAppSelector";
import wrapper from "../../Styles/wrapper.module.scss";
import styles from "./index.module.scss"
import breadCrumbs from "../../Styles/breadCrumbs.module.scss";
import {Link, useSearchParams} from "react-router-dom";
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
	catalogDataFilterByPrice,
	DefaultSortType,
	setFilterByPrice
} from "../../Store/slices/productListFilter";

const sortBy:Array<DefaultSortType> = ["дешевые", "дорогие", "по названию A-Z", "по названию Z-A"]

const Catalog = () => {


	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams();


	const items = useAppSelector((state) => state.productListFilter.productsList)
	const filterByMaxPrice = useAppSelector(state => state.productListFilter.maxPrice)
	const filterByMinPrice = useAppSelector(state => state.productListFilter.minPrice)

	useEffect(() => {
		type ParamsType = {
			maxPrice: string
			minPrice: string
		}
		const params: ParamsType = {
			maxPrice: "0",
			minPrice: "0",
		}

		if (filterByMaxPrice >= 0) params.maxPrice = String(filterByMaxPrice)
		if (filterByMinPrice >= 0) params.minPrice = String(filterByMinPrice)
		setSearchParams(params)
		dispatch(catalogDataDefaultSort({sortBy: "дешевые"}))
		dispatch(catalogDataFilterByPrice({maxPrice: +params.maxPrice, minPrice: +params.minPrice}))

	}, [filterByMaxPrice, filterByMinPrice])

	const [selectionByPrice, setSelectionByPrice] = useState({
		max: filterByMaxPrice,
		min: filterByMinPrice,
	})

	const itemTypesFiltred = new Set()
	items.forEach((el) => (itemTypesFiltred.add(el.itemType)))
	let itemTypesFiltredArr = (Array.from(itemTypesFiltred)) as string[]
	const handleDisablePageNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
	}

	const productCardItems = items.map(el => (<CardItem data={el}/>))
	const typeCardItems = itemTypesFiltredArr.map((el) => (<div className={styles.typeCards__item}>{el}</div>))
	const filtredItemsByPrice = items.filter(el => el.price >= selectionByPrice.min && el.price <= selectionByPrice.max)
	const itemsByManufacturer = getDataSearchByString(filtredItemsByPrice, "manufacturer")

	useEffect(() => {
		const maxPrice = searchParams.get("maxPrice") ?? filterByMaxPrice
		const minPrice = searchParams.get("minPrice") ?? filterByMinPrice

		setSelectionByPrice({max: Number(maxPrice), min: Number(minPrice)})
		dispatch(setFilterByPrice({max: Number(maxPrice), min: Number(minPrice)}))
	}, [])

	const handleChangeSelectionByPrice = (max: number, min: number) => {
		setSelectionByPrice({max, min})
	}

	const handleSubmitParametrs = () => {
		dispatch(setFilterByPrice(selectionByPrice))
	}
	const handleChangeDefaultSort = (e:DefaultSortType) => {
		dispatch(catalogDataDefaultSort({sortBy: e}))
	}
	debugger;

	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				<div className={breadCrumbs.navigate}>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.home}>Главная</Link>
					</div>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.catalog} onClick={handleDisablePageNavigation}
												className={breadCrumbs.navigate__item_disabled}>Каталог</Link>
					</div>
				</div>
				<div className={styles.header}>
					<DefaultCustomTitle text={"Косметика и гигиена"}/>
					<MenuSortBy selected={sortBy[0]} sortBy={sortBy} onChangeSelected={handleChangeDefaultSort}/>
				</div>
				<div className={styles.typeCards}>
					{typeCardItems}
				</div>
				<div className={styles.catalogGroup}>
					<div className={styles.filterPanel}>
						<div>ПОДБОР ПО ПАРАМЕТРАМ</div>
						<div>Цена <b>₸</b></div>
						<FilterByPrice initialValue={{max: selectionByPrice.max, min: selectionByPrice.min}}
																					onChangeCallback={handleChangeSelectionByPrice}/>
						<FilterByString data={itemsByManufacturer} title={"Производитель"}/>
						<div>
							<button onClick={handleSubmitParametrs}>Показать</button>
							<button><img src={deleteIcon} alt=""/></button>
						</div>
					</div>
					<div>
						<div className={styles.cards}>
							{productCardItems}
						</div>
						<div>pagination</div>
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