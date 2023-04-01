import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Basket from "../Pages/Basket/basket";
import Catalog from "../Pages/Catalog/catalog";
import СardProduct from "../Pages/CardProduct/сardProduct";
import {AppLinks} from "./links";
import Admin from "../Pages/Admin/admin";
import styles from "./index.module.scss"
import {BurgerMenu} from "../Components/BurgerMenu/burgerMenu";
import {useAppSelector} from "../Store/Hooks/useAppSelector";
import {useMediaQuery} from "usehooks-ts";
import {useAppDispatch} from "../Store/Hooks/useAppDispatch";
import {setIsOpen} from "../Store/Slices/burgerMenuSlice";

export const AppRoutes = () => {
	const dispatch = useAppDispatch()
	const isOpenBurgerMenu = useAppSelector(state => state.burgerMenu.isOpen)
	const isMobile = useMediaQuery("(max-width: 694px)")
	const handleCloseBurgerMenu = () => {
		dispatch(setIsOpen({value: false}))
	}
	return (
		<main className={styles.main}>
			{isMobile && <BurgerMenu isOpen={isOpenBurgerMenu}/>}
			{isOpenBurgerMenu && isMobile && <div onClick={handleCloseBurgerMenu} className={styles.overlay}></div>}
			<Routes>
				<Route path={"*"} element={<Navigate to={AppLinks.catalog} replace/>}/>
				<Route path={AppLinks.admin} element={<Admin/>}/>
				<Route path={AppLinks.catalog} element={<Catalog/>}/>
				<Route path={`${AppLinks.catalog}/:barcode`} element={<СardProduct/>}/>
				<Route path={AppLinks.basket} element={<Basket/>}/>
			</Routes>
		</main>
	);
};
