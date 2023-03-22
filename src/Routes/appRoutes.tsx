import React from "react";
import {Route, Routes} from "react-router-dom";
import Main from "../Pages/Main/main";
import Basket from "../Pages/Basket/basket";
import Catalog from "../Pages/Catalog/catalog";
import СardProduct from "../Pages/CardProduct/сardProduct";
import {AppLinks} from "./links";

export const AppRoutes = () => {
	return (
		<main>
			<Routes>
				<Route path={AppLinks.home} element={<Main />}/>
				<Route path={AppLinks.catalog} element={<Catalog />}/>
				<Route path={`${AppLinks.catalog}/:barcode`} element={<СardProduct/>}/>
				<Route path={AppLinks.basket} element={<Basket/>}/>
			</Routes>
		</main>
	);
};
