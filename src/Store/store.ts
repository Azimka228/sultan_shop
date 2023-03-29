import {configureStore} from "@reduxjs/toolkit";
import {productListReducer} from "./Slices/productListSlice";
import {basketReducer} from "./Slices/basketSlice";
import {productListFilterReducer} from "./Slices/productListFilterSlice";
import {burgerMenuSlice} from "./Slices/burgerMenuSlice";

export const store = configureStore({
	reducer: {
		productList: productListReducer,
		basket: basketReducer,
		productListFilter: productListFilterReducer,
		burgerMenu: burgerMenuSlice
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch