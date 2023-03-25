import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ProductDataType = {
	id: string
	itemType: Array<string>
	url: string
	title: string
	typeSize: itemWeightType | itemVolumeLiquidType
	size: number
	barcode: string
	manufacturer: string
	brand: string
	description: string
	price: number
	currencyType: string
}

export type itemWeightType = "кг" | "г" | "мг"
export type itemVolumeLiquidType = "мл" | "л"

const initialState: InitialAppStateType = {
	maxPrice: 10000,
	minPrice: 0,
	sortBy: "дешевые",
	sortByList: ["дешевые", "дорогие", "по названию A-Z", "по названию Z-A"],
	sortByBrand: [],
	sortByItemType: [],
	productsList: [],
	productsListCopy: [],
	currentPage: 1,
	countPerPage: 5,
}

export type InitialAppStateType = {
	maxPrice: number
	minPrice: number
	sortBy: DefaultSortType
	sortByList: Array<DefaultSortType>,
	sortByBrand: Array<string>,
	sortByItemType: Array<string>,
	productsList: Array<ProductDataType>
	productsListCopy: Array<ProductDataType>
	currentPage: number,
	countPerPage: number,
}

export type DefaultSortType = "дешевые" | "дорогие" | "по названию A-Z" | "по названию Z-A"

const slice = createSlice({
	name: "productListFilter",
	initialState: initialState,
	reducers: {
		setFilterByPrice(state, action: PayloadAction<{ max: number, min: number }>) {
			state.maxPrice = action.payload.max
			state.minPrice = action.payload.min
		},
		setCatalogData(state, action: PayloadAction<{ productsList: Array<ProductDataType> }>) {
			state.productsList = action.payload.productsList
			state.productsListCopy = action.payload.productsList
		},
		setCurrentPage(state, action: PayloadAction<{ page: number }>) {
			state.currentPage = action.payload.page
		},
		catalogDataFilterByPrice(state, action: PayloadAction<{ minPrice: number, maxPrice: number }>) {
			state.productsList = state.productsList.filter(el => el.price >= action.payload.minPrice && el.price <= action.payload.maxPrice)
		},
		catalogDataFilterByManufacturer(state, action: PayloadAction<{ value: Array<string> }>) {
			if (action.payload.value.length === 0) return
			const FiltredArray: ProductDataType[] = []

			action.payload.value.forEach(el => {
				state.productsList.forEach(productItm => {
					if (productItm.manufacturer === el) {
						FiltredArray.push(productItm)
					}
				})
			})

			//Delete repeating elements
			const table: any = {};
			state.productsList = FiltredArray.filter(({id}) => (!table[id] && (table[id] = 1)));
		},
		catalogDataDefaultSort(state, action: PayloadAction<{ sortBy: DefaultSortType }>) {
			switch (action.payload.sortBy) {
				case "дешевые" : {
					state.productsList = state.productsList.sort((a, b) => parseFloat(String(a.price)) - parseFloat(String(b.price)))
					state.sortBy = "дешевые"
					break;
				}
				case "дорогие" : {
					state.productsList = state.productsList.sort((a, b) => parseFloat(String(b.price)) - parseFloat(String(a.price)))
					state.sortBy = "дорогие"
					break;
				}
				case "по названию A-Z" : {
					state.productsList = state.productsList.sort((a, b) => a.title.localeCompare(b.title))
					state.sortBy = "по названию A-Z"
					break;
				}
				case "по названию Z-A" : {
					state.productsList = state.productsList.sort((a, b) => b.title.localeCompare(a.title))
					state.sortBy = "по названию Z-A"
					break;
				}
			}

		}
	}
})

export const productListFilterReducer = slice.reducer
export const {
	setFilterByPrice,
	setCatalogData,
	catalogDataFilterByPrice,
	catalogDataDefaultSort,
	catalogDataFilterByManufacturer,
	setCurrentPage
} = slice.actions
