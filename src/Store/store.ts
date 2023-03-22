import {configureStore} from "@reduxjs/toolkit";
import {productListReducer} from "./slices/productListSlice";

export const store = configureStore({
	reducer: {
		productList: productListReducer
	},
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch