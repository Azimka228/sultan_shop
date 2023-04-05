import {
	BasketDataType,
	basketReducer,
	clearBasket,
	deleteBasketItem,
	InitialBasketStateType,
	setBasketItem
} from "./basketSlice";

describe("basket Reducer", () => {
	const state: InitialBasketStateType = {
		items: [],
		amountItems: 0,
		balance: 0,
		wallet: "₸"
	}

	it("should set basket item", () => {
		const initialState: InitialBasketStateType = {...state}

		const expectedState: InitialBasketStateType = {
			...state,
			amountItems: 1,
			balance: 9999,
			items: [{
				id: "0",
				itemType: ["test"],
				url: "test",
				title: "test",
				typeSize: "кг",
				size: 1,
				barcode: "1111",
				manufacturer: "adidas",
				brand: "adidas",
				description: "boost",
				price: 9999,
				currencyType: "test",
				count: 1
			}]
		}

		const itemForSetBasket: BasketDataType = {
			id: "0",
			itemType: ["test"],
			url: "test",
			title: "test",
			typeSize: "кг",
			size: 1,
			barcode: "1111",
			manufacturer: "adidas",
			brand: "adidas",
			description: "boost",
			price: 9999,
			currencyType: "test",
			count: 1
		}
		expect(basketReducer(initialState, setBasketItem({item: itemForSetBasket}))).toEqual(expectedState)
	})
	it("should remove basket item", () => {
		const initialState: InitialBasketStateType = {
			...state,
			amountItems: 1,
			balance: 9999,
			items: [{
				id: "0",
				itemType: ["test"],
				url: "test",
				title: "test",
				typeSize: "кг",
				size: 1,
				barcode: "1111",
				manufacturer: "adidas",
				brand: "adidas",
				description: "boost",
				price: 9999,
				currencyType: "test",
				count: 1
			}]
		}

		const expectedState: InitialBasketStateType = {
			...state,
			amountItems: 0,
			balance: 0,
			items: []
		}

		const itemForSetBasket: BasketDataType = {
			id: "0",
			itemType: ["test"],
			url: "test",
			title: "test",
			typeSize: "кг",
			size: 1,
			barcode: "1111",
			manufacturer: "adidas",
			brand: "adidas",
			description: "boost",
			price: 9999,
			currencyType: "test",
			count: 1
		}
		expect(basketReducer(initialState, deleteBasketItem({item: itemForSetBasket}))).toEqual(expectedState)
	})
	it("should clear basket", () => {
		const initialState: InitialBasketStateType = {
			...state,
			amountItems: 1,
			balance: 9999,
			items: [{
				id: "0",
				itemType: ["test"],
				url: "test",
				title: "test",
				typeSize: "кг",
				size: 1,
				barcode: "1111",
				manufacturer: "adidas",
				brand: "adidas",
				description: "boost",
				price: 9999,
				currencyType: "test",
				count: 1
			}]
		}

		const expectedState: InitialBasketStateType = {
			...state,
			amountItems: 0,
			balance: 0,
			items: []
		}

		expect(basketReducer(initialState, clearBasket())).toEqual(expectedState)
	})
})