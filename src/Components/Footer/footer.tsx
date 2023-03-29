import React from "react";
import styles from "./index.module.scss";
import wrapper from "../../Styles/wrapper.module.scss";
import {FooterDescktop} from "./FooterDesktop/footerDescktop";
import {useAppDispatch} from "../../Store/Hooks/useAppDispatch";
import {useAppSelector} from "../../Store/Hooks/useAppSelector";
import {setIsOpen} from "../../Store/Slices/burgerMenuSlice";
import {useMediaQuery} from "usehooks-ts";
import {FooterMobile} from "./FooterMobile/footerMobile";

export const Footer = () => {
	const dispatch = useAppDispatch()
	const isOpenBurgerMenu = useAppSelector(state => state.burgerMenu.isOpen)
	const handleCloseBurgerMenu = () => {
		dispatch(setIsOpen({value: false}))
	}
	const isMobile = useMediaQuery('(max-width: 480px)')
	const FooterBody = isMobile? <FooterMobile/> : <FooterDescktop/>
	return (
		<footer className={styles.main}>
			{isOpenBurgerMenu &&	isMobile &&<div onClick={handleCloseBurgerMenu} className={styles.overlay}></div>}
				<div className={wrapper.wrapper}>
					{FooterBody}
				</div>
		</footer>
	);
};

