import React from "react";
import styles from "./index.module.scss";
import wrapper from "../../Styles/wrapper.module.scss";
import HeaderDesktop from "./headerDesktop/headerDesktop";

const Header = () => {
	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				<HeaderDesktop/>
			</div>
		</div>
	);
};

export default Header;