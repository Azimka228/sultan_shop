import {configureStore} from "@reduxjs/toolkit";
import {productListReducer} from "./slices/productListSlice";
import {basketReducer} from "./slices/basketSlice";

export const store = configureStore({
	reducer: {
		productList: productListReducer,
		basket: basketReducer,

	},
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch