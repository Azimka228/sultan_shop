import {getItemsTypesCareData} from "./getItemsTypesCareData";
import {ProductDataType} from "../Store/Slices/productListFilterSlice";

const data: Array<ProductDataType> = [{
	barcode: "4604049097555",
	brand: "Нефтехим",
	currencyType: "₸",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo.  Nullam interdum ut justo  Nullam interdum ut justo  Nullam interdum ut justo",
	id: "8",
	itemType: ["Средства для загара"],
	manufacturer: "Раша",
	price: 11,
	size: 200,
	title: "Крем от загара",
	typeSize: "г",
	url: "https://img.e-dostavka.by/UserFiles/images/catalog/Goods/2568/00702568/norm/thumbs/00702568.n_1_140x140@2x.png",
},
	{
		barcode: "4604049097555",
		brand: "Нефтехим",
		currencyType: "₸",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo.  Nullam interdum ut justo  Nullam interdum ut justo  Nullam interdum ut justo",
		id: "8",
		itemType: ["Уход за телом"],
		manufacturer: "Раша",
		price: 11,
		size: 200,
		title: "Крем от загара",
		typeSize: "г",
		url: "https://img.e-dostavka.by/UserFiles/images/catalog/Goods/2568/00702568/norm/thumbs/00702568.n_1_140x140@2x.png",
	},
	{
		barcode: "4604049097555",
		brand: "Нефтехим",
		currencyType: "₸",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo.  Nullam interdum ut justo  Nullam interdum ut justo  Nullam interdum ut justo",
		id: "8",
		itemType: ["Гигиена полости рта"],
		manufacturer: "Раша",
		price: 11,
		size: 200,
		title: "Крем от загара",
		typeSize: "г",
		url: "https://img.e-dostavka.by/UserFiles/images/catalog/Goods/2568/00702568/norm/thumbs/00702568.n_1_140x140@2x.png",
	},
	{
		barcode: "4604049097555",
		brand: "Нефтехим",
		currencyType: "₸",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo.  Nullam interdum ut justo  Nullam interdum ut justo  Nullam interdum ut justo",
		id: "8",
		itemType: ["Гигиена полости рта"],
		manufacturer: "Раша",
		price: 11,
		size: 200,
		title: "Крем от загара",
		typeSize: "г",
		url: "https://img.e-dostavka.by/UserFiles/images/catalog/Goods/2568/00702568/norm/thumbs/00702568.n_1_140x140@2x.png",
	},
]

test("getItemsTypesCareData should return correct value", () => {
	expect(getItemsTypesCareData(data)).toEqual(["Средства для загара", "Уход за телом", "Гигиена полости рта"])
})
