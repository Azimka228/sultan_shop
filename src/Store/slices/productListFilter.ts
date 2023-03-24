import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductDataType} from "./productListSlice";

const initialState: InitialAppStateType = {
	maxPrice: 10000,
	minPrice: 0,
	sortBy: [],
	sortByBrand: [],
	sortByManufacturer: [],
	sortByItemType: [],
	productsList: []
}

export type InitialAppStateType = {
	maxPrice: number
	minPrice: number
	sortBy: Array<string>,
	sortByBrand: Array<string>,
	sortByManufacturer: Array<string>,
	sortByItemType: Array<string>,
	productsList: Array<ProductDataType>
}

export type DefaultSortType = "дешевые"| "дорогие"| "по названию A-Z"| "по названию Z-A"

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
		},
		catalogDataFilterByPrice(state, action: PayloadAction<{ minPrice: number, maxPrice: number}>) {
			state.productsList = state.productsList.filter(el => el.price >= action.payload.minPrice && el.price <= action.payload.maxPrice)
		},
		catalogDataDefaultSort(state, action: PayloadAction<{sortBy: DefaultSortType}>) {
			switch (action.payload.sortBy) {
				case "дешевые" :{
					state.productsList = state.productsList.sort((a, b) => parseFloat(String(a.price)) - parseFloat(String(b.price)))
					break;
				}
				case "дорогие" :{
					state.productsList = state.productsList.sort((a, b) => parseFloat(String(b.price)) - parseFloat(String(a.price)))
					break;
				}
				case "по названию A-Z" :{
					state.productsList = state.productsList.sort((a, b) => a.title.localeCompare(b.title))
					break;
				}
				case "по названию Z-A" :{
					state.productsList = state.productsList.sort((a, b) => b.title.localeCompare(a.title))
					break;
				}
			}

		}
	}
})

export const productListFilterReducer = slice.reducer
export const {setFilterByPrice, setCatalogData,catalogDataFilterByPrice,catalogDataDefaultSort} = slice.actions
