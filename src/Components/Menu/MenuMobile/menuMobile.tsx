import React from "react";
import styles from "./index.module.scss"
import mobileLogo from "../../../Assets/mobileLogo.svg"
import mobileCartLogo from "../../../Assets/mobileCart.svg"
import {useAppDispatch} from "../../../Store/Hooks/useAppDispatch";
import {useAppSelector} from "../../../Store/Hooks/useAppSelector";
import {setIsOpen} from "../../../Store/Slices/burgerMenuSlice";
import {useNavigate} from "react-router-dom";
import {AppLinks} from "../../../Routes/links";
import openBurgerMenuLogo from "./openBurgerMenu.svg"
import closeBurgerMenuLogo from "./closeBurgerMenu.svg"

export const MenuMobile = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isOpenBurgerMenu = useAppSelector(state => state.burgerMenu.isOpen)
	const basketAmountItems = useAppSelector(state => state.basket.amountItems)

	const isOpenBurgerMenuLogo = isOpenBurgerMenu ? closeBurgerMenuLogo : openBurgerMenuLogo

	const handleChangeBurgerMenuStatus = () => {
		dispatch(setIsOpen({value: !isOpenBurgerMenu}))
	}
	const handleNavigateToBasket = () => {
		navigate(AppLinks.basket)
	}
	return (
		<div className={styles.main}>
			<button onClick={handleChangeBurgerMenuStatus} className={styles.button}>
				<img src={isOpenBurgerMenuLogo} alt="isOpenBurgerMenuLogo"/>
			</button>
			<div><img src={mobileLogo} alt="mobileLogo"/></div>
			<div className={styles.basket} onClick={handleNavigateToBasket}>
				<div className={styles.basket__amountItems}>{basketAmountItems}</div>
				<img src={mobileCartLogo} alt="mobileCartLogo"/>
			</div>
		</div>
	);
};

