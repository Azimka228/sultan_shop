import React from "react";
import styles from "./index.module.scss";
import wrapper from "../../Styles/wrapper.module.scss";
import {FooterContent} from "./FooterContent/footerContent";

export const Footer = () => {
	return (
		<footer className={styles.main}>
				<div className={wrapper.wrapper}>
					<FooterContent/>
				</div>
		</footer>
	);
};

