import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ProductDataType = {
	id: number
	itemType: string
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
	productsList: []
}

export type InitialAppStateType = {
	productsList: Array<ProductDataType>
}

const slice = createSlice({
	name: "productList",
	initialState: initialState,
	reducers: {
		setProductData(state, action: PayloadAction<{ productsList: Array<ProductDataType>}>) {
			state.productsList = action.payload.productsList
		},
	}
})

export const productListReducer = slice.reducer
export const {setProductData} = slice.actions
