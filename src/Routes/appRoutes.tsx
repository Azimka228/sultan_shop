import React from "react";
import {Route, Routes} from "react-router-dom";
import Main from "../Pages/Main/main";
import Basket from "../Pages/Basket/basket";

export const AppRoutes = () => {
	return (
		<main>
			<Routes>
				<Route path='/' element={<Main />}/>
				<Route path='/basket' element={<Basket/>}/>
			</Routes>
		</main>
	);
};
