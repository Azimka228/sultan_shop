import {fireEvent, render, screen} from "@testing-library/react";
import {BasketItem} from "./basketItem";
import * as actions from "../../Store/Slices/basketSlice";
import {BasketDataType} from "../../Store/Slices/basketSlice";
import * as reduxHooks from "react-redux";

const emptyData = {} as BasketDataType
const fulliedData: BasketDataType = {
	id: "string",
	itemType: ["test"],
	url: "test",
	title: "string",
	typeSize: "кг",
	size: 0,
	barcode: "str",
	manufacturer: "str",
	brand: "srt",
	description: "string",
	price: 0,
	currencyType: "test",
	count: 0,
}

jest.mock("react-redux")
const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector")
const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch")

describe("Basket item", () => {
	it("should create Basket item empty", () => {
		mockedUseSelector.mockReturnValue([])
		const utils = render(
			<BasketItem data={emptyData}/>
		);

		let test = expect(utils).toMatchSnapshot()
	})
	it("should create Basket item with data", () => {
		const dispatch = jest.fn()
		mockedUseSelector.mockReturnValue([])
		// @ts-ignore
		mockedDispatch.mockReturnValue(dispatch)
		const mockIncreaseItemCount = jest.spyOn(actions,'increaseItemCount')

		const utils = render(
			<BasketItem data={fulliedData}/>
		);

		fireEvent.click(screen.getByText('+'))
		let test = expect(utils).toMatchSnapshot()
		expect(dispatch).toHaveBeenCalled()
		expect(mockIncreaseItemCount).toHaveBeenCalled()
	})
})