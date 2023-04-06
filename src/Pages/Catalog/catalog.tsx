import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../Store/Hooks/useAppSelector";
import wrapper from "../../Styles/wrapper.module.scss";
import styles from "./index.module.scss"
import {useLocation, useSearchParams} from "react-router-dom";
import {AppLinks} from "../../Routes/links";
import {DefaultCustomTitle} from "../../Components/DefaultCustomTitle/defaultCustomTitle";
import {CardItem} from "../../Components/CardItem/cardItem";
import {getDataSearchByString} from "../../Utills/getDataSearchByString";
import {MenuSortBy} from "../../Components/MenuSortBy/menuSortBy";
import {v4 as generateId} from "uuid";
import {useAppDispatch} from "../../Store/Hooks/useAppDispatch";
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
} from "../../Store/Slices/productListFilterSlice";
import Pagination from "../../Components/Pagination/pagination";
import {useMediaQuery, useUpdateEffect} from "usehooks-ts";
import SelectionByParametrs from "../../Components/SelectionByParametrs/selectionByParametrs";
import {defaultSortBy} from "../../Utills/defaultSortBy";
import {defaultFilterSortBy} from "../../Utills/defaultFilterSortBy";
import {getItemsTypesCareData} from "../../Utills/getItemsTypesCareData";
import {
	filterByMaxPriceSelector,
	filterByMinPriceSelector,
	filterCountPerPageSelector,
	filterCurrentPageSelector,
	filterSortByItemTypeSelector,
	filterSortByManufacturerSelector,
	filterSortBySelector,
	itemsCopySelector,
	itemsSelector,
	sortByListSelector
} from "../../Store/Selectors/productListFilterSelector";
import BradCrumbs, {BradCrumbsType} from "../../Components/BradCrumbs/bradCrumbs";
import CatalogTypeCareItem from "../../Components/CatalogTypeCareItem/catalogTypeCareItem";
import CatalogMenuTypeCareItem from "../../Components/CatalogMenuTypeCareItem/catalogMenuTypeCareItem";

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
	FilterByItemType?: string
	FilterByManufacturer?: string
}
type SortBY = {
	value: DefaultSortType
}

const breadCrumbsData: BradCrumbsType = {
	desktop: [
		{
			to: AppLinks.home,
			title: "Главная"
		},
		{
			to: AppLinks.catalog,
			title: "Каталог"
		}
	],
	mobile: {
		to: AppLinks.home,
		title: "Назад"
	},
}

const Catalog = () => {

	const isTablet = useMediaQuery("(max-width: 768px)")

	useEffect(() => {
		//This code is for loading search parameters by "Item type"
		const FilterByItemTypeParams = searchParams.get("FilterByItemType")

		let SortByItemTypeArray: Array<string> = []
		if (FilterByItemTypeParams !== null) {
			SortByItemTypeArray = FilterByItemTypeParams.split(",")
			dispatch(setSortByItemType({item: SortByItemTypeArray}))
		}
	}, [])

	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation()
	const items = useAppSelector(itemsSelector)
	const itemsCopy = useAppSelector(itemsCopySelector)
	const sortByList = useAppSelector(sortByListSelector)

	const filterSortBy = useAppSelector(filterSortBySelector)
	const filterByMaxPrice = useAppSelector(filterByMaxPriceSelector)
	const filterByMinPrice = useAppSelector(filterByMinPriceSelector)
	const filterCurrentPage = useAppSelector(filterCurrentPageSelector)
	const filterCountPerPage = useAppSelector(filterCountPerPageSelector)
	const filterSortByItemType = useAppSelector(filterSortByItemTypeSelector)
	const filterSortByManufacturer = useAppSelector(filterSortByManufacturerSelector)

	const [filterState, setFilterState] = useState<FilterStateType>({
		max: filterByMaxPrice,
		min: filterByMinPrice,
		sortBy: filterSortBy,
		filterByManufacturer: []
	})

	useUpdateEffect(() => {

		const params: ParamsType = {
			maxPrice: "0",
			minPrice: "0",
			sortBy: "price:asc",
			page: "1",

		}

		if (filterByMaxPrice >= 0) params.maxPrice = String(filterByMaxPrice)
		if (filterByMinPrice >= 0) params.minPrice = String(filterByMinPrice)

		params.sortBy = defaultFilterSortBy(filterSortBy)

		if (filterSortByItemType.length > 0) {
			params.FilterByItemType = filterSortByItemType.join(",")
		}
		params.page = String(filterCurrentPage)
		setSearchParams(params)
	}, [filterByMaxPrice, filterByMinPrice, filterSortBy, filterCurrentPage, filterSortByItemType])

	let itemTypesFiltredArr = getItemsTypesCareData(items)

	// That for pagination
	const lastItemsIndex = filterCurrentPage * filterCountPerPage
	const firstItemsIndex = lastItemsIndex - filterCountPerPage
	const currentItems = items.slice(firstItemsIndex, lastItemsIndex)
	//

	const productCardItems = currentItems.map(el => (<CardItem key={generateId()} data={el}/>))

	const handleAddItemTypes = (item: string) => {
		dispatch(setCurrentPage({page: 1}))
		dispatch(setSortByItemType({item}))
	}

	const typeCardItems = itemTypesFiltredArr.map((el, index) => {
		return <CatalogTypeCareItem key={index} itemValue={el} onClickItemCallback={handleAddItemTypes}/>
	})

	const leftMenuTypeCardsItems = itemTypesFiltredArr.map((el, index, array) => {
		return <CatalogMenuTypeCareItem isLineAfterItem={index !== array.length - 1}
																																		itemValue={el}
																																		onClickItemCallback={handleAddItemTypes}/>
	})

	const filtredItemsByPrice = items.filter(el => el.price >= filterState.min && el.price <= filterState.max)

	const itemsByManufacturer = getDataSearchByString(filtredItemsByPrice, "manufacturer")

	useEffect(() => {

		const maxPriceParams = searchParams.get("maxPrice") ?? filterByMaxPrice
		const minPriceParams = searchParams.get("minPrice") ?? filterByMinPrice
		const sortByParams = searchParams.get("sortBy")
		const pageParams = searchParams.get("page") ?? filterCurrentPage
		const SortByItemTypeParams = searchParams.get("FilterByItemType")

		const sortBy: SortBY = {
			value: "дешевые"
		}
		if (sortByParams) {
			sortBy.value = defaultSortBy(sortByParams)
		}

		let SortByItemTypeArray: Array<string> = []
		if (SortByItemTypeParams !== null) {
			SortByItemTypeArray = SortByItemTypeParams.split(",")
			dispatch(catalogDataFilterByItemType({fitlerValues: SortByItemTypeArray}))
		} else {
			dispatch(catalogDataFilterByItemType({fitlerValues: []}))
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
		dispatch(setCurrentPage({page: 1}))
		setFilterState({...filterState, filterByManufacturer: []})
		dispatch(catalogDataFilterByManufacturer({value: filterState.filterByManufacturer}))
		dispatch(setFilterByPrice({max: filterState.max, min: filterState.min}))
	}
	const handleResetParametrs = () => {
		setFilterState({...filterState, max: 9999999, min: 0, filterByManufacturer: []})
		dispatch(setFilterByPrice({max: 9999999, min: 0}))
		dispatch(setCatalogData({productsList: itemsCopy}))
		dispatch(catalogDataFilterByManufacturer({value: []}))

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
				<BradCrumbs desktop={breadCrumbsData.desktop} mobile={breadCrumbsData.mobile}/>
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
							FilterByManufacturerData={filterSortByManufacturer}/>
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