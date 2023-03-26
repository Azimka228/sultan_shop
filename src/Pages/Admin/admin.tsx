import React from "react";
import {useLocalStorage} from "usehooks-ts";
import wrapper from "../../Styles/wrapper.module.scss";
import {ProductDataType} from "../../Store/slices/productListSlice";
import { v4 as generateId } from 'uuid';
import {DefaultCustomTitle} from "../../Components/DefaultCustomTitle/defaultCustomTitle";

const Admin = () => {
	const [isDarkTheme, setDarkTheme] = useLocalStorage<Array<ProductDataType>>('cardItems',[] )


	const handleAddNewCardItem = () => {
		setDarkTheme([{
			id: generateId(),
			itemType: ["string"],
			url: "string",
			title: "string",
			typeSize: "мл",
			size: 32,
			barcode: "string",
			manufacturer: "string",
			brand: "string",
			description: "string",
			price: 32,
			currencyType: "string",
		}])
	}
	return (
	<div>
		<div className={wrapper.wrapper}>
			<DefaultCustomTitle text={"Admin"}/>
			<button onClick={handleAddNewCardItem}>+</button>
		</div>
	</div>
	)
};

export default Admin;