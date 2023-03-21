import React from "react";
import styles from "./index.module.scss";
import wrapper from "../../Styles/wrapper.module.scss";
import {FooterDesktop} from "./FooterDesktop/footerDesktop";

export const Footer = () => {
	return (
		<footer className={styles.main}>
				<div className={wrapper.wrapper}>
					<FooterDesktop/>
				</div>
		</footer>
	);
};

