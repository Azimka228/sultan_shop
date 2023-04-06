import React, {useEffect} from "react";
import {Menu} from "./Components/Menu/menu";
import "./Styles/normalize.scss"
import Header from "./Components/Header/header";
import {AppRoutes} from "./Routes/appRoutes";
import {Footer} from "./Components/Footer/footer";
import data from "./db.json"
import {useAppDispatch} from "./Store/Hooks/useAppDispatch";
import {ProductDataType, setCatalogData} from "./Store/Slices/productListFilterSlice";
import {setProductData} from "./Store/Slices/productListSlice";
import useReadLocalStorage from "usehooks-ts/dist/esm/useReadLocalStorage/useReadLocalStorage";

function App() {

	const dispatch = useAppDispatch()
	const cardItems = useReadLocalStorage<Array<ProductDataType>>("cardItems")
	let isCardItems: boolean
	if (cardItems) {
		isCardItems = cardItems.length > 0
	}

	useEffect(() => {
		if (isCardItems && cardItems) {
			dispatch(setProductData({productsList: cardItems}))
			dispatch(setCatalogData({productsList: cardItems}))
		} else {
			dispatch(setProductData({productsList: data.productsList as Array<ProductDataType>}))
			dispatch(setCatalogData({productsList: data.productsList as Array<ProductDataType>}))
		}

	}, [dispatch])

	return (
		<React.Fragment>
			<Menu/>
			<Header/>
			<AppRoutes/>
			<Footer/>
		</React.Fragment>
	);
}

export default App;
