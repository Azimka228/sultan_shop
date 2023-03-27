import React from "react";
import styles from "./index.module.scss";
import wrapper from "../../Styles/wrapper.module.scss";
import HeaderDesktop from "./HeaderDesktop/headerDesktop";
import {useMediaQuery} from "usehooks-ts";
import {HeaderMobile} from "./HeaderMobile/headerMobile";

const Header = () => {
	const isMobile = useMediaQuery('(max-width: 480px)')
	const HeaderBody = isMobile? <HeaderMobile/> : <HeaderDesktop/>
	const headerWrapper =  isMobile ? `${wrapper.wrapper}  ${styles.mobileWrapper}` : wrapper.wrapper
	return (
		<div className={styles.main}>
			<div className={headerWrapper}>
				{HeaderBody}
			</div>
		</div>
	);
};

export default Header;