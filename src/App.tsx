import React, {useEffect} from "react";
import "./App.css";
import {Menu} from "./Components/Menu/menu";
import "./Styles/normalize.scss"
import Header from "./Components/Header/header";
import {AppRoutes} from "./Routes/appRoutes";
import {Footer} from "./Components/Footer/footer";
import data from "./db.json"
import {useAppDispatch} from "./Store/hooks/useAppDispatch";
import {ProductDataType, setCatalogData, setCatalogMaxPrice} from "./Store/slices/productListFilter";
import {setProductData} from "./Store/slices/productListSlice";
import {useLocalStorage} from "usehooks-ts";

function App() {

	const dispatch = useAppDispatch()
	const [cardItems,] = useLocalStorage<Array<ProductDataType>>("cardItems", [])
	const isCardItems = cardItems.length > 0

	useEffect(()=>{
		if(isCardItems) {
			dispatch(setProductData({productsList : cardItems }))
			dispatch(setCatalogData({productsList : cardItems}))
			dispatch(setCatalogMaxPrice({productsList : cardItems}))
		} else {
			dispatch(setProductData({productsList : data.productsList as Array<ProductDataType>}))
			dispatch(setCatalogData({productsList : data.productsList as Array<ProductDataType>}))
			dispatch(setCatalogMaxPrice({productsList : data.productsList as Array<ProductDataType>}))
		}

	},[dispatch])

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
