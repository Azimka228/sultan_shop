import React from "react";
import wrapper from "../../Styles/wrapper.module.scss"
import styles from "./index.module.scss"
import MenuDesktop from "./MenuDesktop/menuDesktop";
import {useMediaQuery} from "usehooks-ts";
import {MenuMobile} from "./MenuMobile/menuMobile";

export const Menu = () => {
	const isMobile = useMediaQuery('(max-width: 694px)')
	const MenuBody = isMobile? <MenuMobile/> : <MenuDesktop/>
	const menuWrapper =  isMobile ? `${wrapper.wrapper}  ${styles.mobileWrapper}` : wrapper.wrapper
	return (
		<div className={styles.main}>
			<div className={menuWrapper}>
				{MenuBody}
			</div>
		</div>
	);
};

