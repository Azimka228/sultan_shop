import React from "react";
import wrapper from "../../Styles/wrapper.module.scss"
import styles from "./index.module.scss"
import MenuDesktop from "./MenuDesktop/menuDesktop";
import {useMediaQuery} from "usehooks-ts";
import {MenuMobile} from "./MenuMobile/menuMobile";

export const Menu = () => {
	const isMobile = useMediaQuery('(max-width: 480px)')
	const MenuBody = isMobile? <MenuMobile/> : <MenuDesktop/>
	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				{MenuBody}
			</div>
		</div>
	);
};

