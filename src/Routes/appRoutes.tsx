import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "../Pages/Main/main";
import Basket from "../Pages/Basket/basket";
import Catalog from "../Pages/Catalog/catalog";
import СardProduct from "../Pages/CardProduct/сardProduct";
import {AppLinks} from "./links";
import Admin from "../Pages/Admin/admin";

export const AppRoutes = () => {
	return (
		<main>
			<Routes>
				<Route path={"*"} element={<Navigate to={AppLinks.catalog} replace />}/>
				<Route path={AppLinks.admin} element={<Admin />}/>
				{/*<Route path={AppLinks.home} element={<Main />}/>*/}
				<Route path={AppLinks.catalog} element={<Catalog />}/>
				<Route path={`${AppLinks.catalog}/:barcode`} element={<СardProduct/>}/>
				<Route path={AppLinks.basket} element={<Basket/>}/>
			</Routes>
		</main>
	);
};
