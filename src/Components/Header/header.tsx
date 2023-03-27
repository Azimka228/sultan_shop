import React from "react";
import styles from "./index.module.scss";
import wrapper from "../../Styles/wrapper.module.scss";
import HeaderDesktop from "./headerDesktop/headerDesktop";
import {useMediaQuery} from "usehooks-ts";
import {MenuMobile} from "../Menu/MenuMobile/menuMobile";
import MenuDesktop from "../Menu/MenuDesktop/menuDesktop";

const Header = () => {
	const isMobile = useMediaQuery('(max-width: 480px)')
	const MenuBody = isMobile? <MenuMobile/> : <MenuDesktop/>
	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				<HeaderDesktop/>
			</div>
		</div>
	);
};

export default Header;