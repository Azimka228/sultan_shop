import React from "react";
import wrapper from "../../styles/wrapper.module.scss"
import styles from "./index.module.scss"
import MenuDesktop from "./MenuDesktop/menuDesktop";

export const Menu = () => {
	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				<MenuDesktop/>
			</div>
		</div>
	);
};

