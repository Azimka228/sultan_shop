import React, {useEffect} from "react";
import "./App.css";
import {Menu} from "./Components/Menu/menu";
import "./Styles/normalize.scss"
import Header from "./Components/Header/header";
import {AppRoutes} from "./Routes/appRoutes";
import {Footer} from "./Components/Footer/footer";
import data from "./db.json"
import {useAppDispatch} from "./Store/hooks/useAppDispatch";
import {ProductDataType, setCatalogData} from "./Store/slices/productListFilter";
import {setProductData} from "./Store/slices/productListSlice";

function App() {

	const dispatch = useAppDispatch()

	useEffect(()=>{
		dispatch(setProductData({productsList : data.productsList as Array<ProductDataType>}))
		dispatch(setCatalogData({productsList : data.productsList as Array<ProductDataType>}))
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
