import {configureStore} from "@reduxjs/toolkit";
import {productListReducer} from "./slices/productListSlice";
import {basketReducer} from "./slices/basketSlice";
import {productListFilterReducer} from "./slices/productListFilter";
import {burgerMenuSlice} from "./slices/burgerMenuSlice";

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