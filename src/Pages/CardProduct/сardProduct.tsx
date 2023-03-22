import React from "react";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../Store/hooks/useAppSelector";

const СardProduct = () => {
	let { barcode } = useParams()
	const currentItem = useAppSelector((state) => state.productList.productsList).find((el) => (el.barcode === barcode))
	return (
		<div>
			{barcode}
		</div>
	);
};

export default СardProduct;