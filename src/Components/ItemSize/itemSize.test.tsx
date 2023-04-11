import {render} from "@testing-library/react";
import {ItemSize, ItemSizePropsType} from "./itemSize";

const ItemSizeEmptyData: ItemSizePropsType = {
	typeSize: "кг",
	size: 0
}
const ItemSizeData: ItemSizePropsType = {
	typeSize: "кг",
	size: 100
}

describe("ItemSize", () => {
	it("should create ItemSize empty", () => {
		const utils = render(
			<ItemSize size={ItemSizeEmptyData.size} typeSize={ItemSizeEmptyData.typeSize}/>
		);
		// eslint-disable-next-line testing-library/prefer-screen-queries
	expect(utils.getByText("0 кг")).toBeInTheDocument()
		expect(utils).toMatchSnapshot()
	})
	it("should create Basket item with data", () => {
		const utils = render(
			<ItemSize size={ItemSizeData.size} typeSize={ItemSizeData.typeSize}/>
		);

		// eslint-disable-next-line testing-library/prefer-screen-queries
		expect(utils.getByText("100 кг")).toBeInTheDocument()
		expect(utils).toMatchSnapshot()
	})
})