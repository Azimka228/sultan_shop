import {ProductDataType} from "../Store/Slices/productListFilterSlice";

export const getItemsTypesCareData = (items: Array<ProductDataType>) => {
	const itemTypesFiltred = new Set()
	items.forEach((item) => {
		item.itemType.forEach(el => {
			(itemTypesFiltred.add(el))
		})
	})
	return Array.from(itemTypesFiltred) as string[]
}