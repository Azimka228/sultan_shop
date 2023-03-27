import React from "react";
import styles from './index.module.scss'
import {Link} from "react-router-dom";
import searchLogo from '../../../assets/search.svg'
import cubesLogo from '../../../assets/cubes.svg'

export const HeaderMobile = () => {
	return (
		<div className={styles.main}>
			<Link to={"#"}><img src={cubesLogo} alt="cubesLogo"/> Каталог</Link>
			<div className={styles.line}></div>
			<Link to={"#"}><img src={searchLogo} alt="searchLogo"/> Поиск</Link>
		</div>
	);
};

