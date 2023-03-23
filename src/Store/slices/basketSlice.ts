import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {itemVolumeLiquidType, itemWeightType} from "./productListSlice";

export type BasketDataType = {
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
	count: number
}

const initialState: InitialAppStateType = {
	items: [],
	amountItems: 0,
	balance: 0,
	wallet: "₸"
}

export type InitialAppStateType = {
	items: Array<BasketDataType>
	amountItems: number
	balance: number
	wallet: string
}

const slice = createSlice({
	name: "productList",
	initialState: initialState,
	reducers: {
		setBasketItem(state, action: PayloadAction<{ item: BasketDataType }>) {
			const isItemInState = state?.items.find((el) => (el.id === action.payload.item.id))
			if (isItemInState) {
				state.items = state.items.map((el) => {
					if (el.id === action.payload.item.id && el.count) {
						el.count = el.count + action.payload.item.count
					}
					return el
				})
			} else {
				state.items.push({...action.payload.item, count: action.payload.item.count})
			}

			state.amountItems += action.payload.item.count
			state.balance += action.payload.item.price * action.payload.item.count
		},
		deleteBasketItem(state, action: PayloadAction<{ item: BasketDataType }>) {
			state.items = state.items.filter((el) => (el.id !== action.payload.item.id))
			state.amountItems = state.amountItems - action.payload.item.count
			state.balance = state.balance - (action.payload.item.count * action.payload.item.price)
		},
		decreaseItemCount(state, action: PayloadAction<{ item: BasketDataType }>) {
			state.items = state.items.map(el => {
				if (el.id === action.payload.item.id) {
					return {...el, count: el.count - 1}
				}
				return el
			}).filter(el => (el.count >= 1))
			state.amountItems -= 1
			state.balance -= action.payload.item.price
		},

		increaseItemCount(state, action: PayloadAction<{ item: BasketDataType }>) {
			state.items = state.items.map(el => {
				if (el.id === action.payload.item.id) {
					return {...el, count: el.count + 1}
				}
				return el
			})
			state.amountItems += 1
			state.balance += action.payload.item.price
		},
		clearBasket(state) {
			state.items = []
			state.amountItems = 0
			state.balance = 0
		},
	}
})

export const basketReducer = slice.reducer
export const {setBasketItem, deleteBasketItem, decreaseItemCount, increaseItemCount,clearBasket} = slice.actions
