import React from "react";
import styles from "./index.module.scss"
import logo from "./logo.svg"
import catalog from "./catalog.svg"
import operatorLogo from "./operatorLogo.svg"
import download from "./download.svg"
import basket from "./basket.svg"
import {Link} from "react-router-dom";
import {AppLinks} from "../../../Routes/links";
import {CustomInput} from "../../CustomInput/customInput";

const HeaderDesktop = () => {
	const handleInputSearch = (value: string) => {
		alert(value)
	}
	return (
		<div className={styles.main}>
			<div className={styles.logo}>
				<Link to={AppLinks.home}> <img src={logo} alt="logo"/></Link>
			</div>
			<div className={styles.btn}>
				<Link to={AppLinks.catalog}>
					Каталог
					<img src={catalog} alt="catalog"/>
				</Link>
			</div>
			<div className={styles.input}>
				<CustomInput InputSubmit={handleInputSearch} width={263}/>
			</div>
			<div className={styles.operator}>
				<div className={styles.operator__description}>
					<p><b>+7 (777) 490-00-91</b></p>
					<p>время работы: 9:00-20:00</p>
					<Link to={"/call"}>Заказать звонок</Link>
				</div>
				<div className={styles.operator__logo}>
					<img src={operatorLogo} alt="operator logo"/>
					<div className={styles.operator__logo_online}></div>
				</div>
			</div>
			<div className={styles.border}></div>
			<div className={styles.btn}>
				<Link to={AppLinks.priceList}>
					Прайс-лист
					<img src={download} alt="download"/>
				</Link>
			</div>
			<div className={styles.border}></div>
			<div className={styles.basket}>
					<div>
						<img src={basket} alt="3"/>
					</div>
					<div className={styles.basket__ellipse}>
						3
					</div>
			</div>
			<div className={styles.basket__text}>
				<div className={styles.basket__title}>
					Корзина
				</div>
				<div className={styles.basket__price}>
					12 478 ₸
				</div>
			</div>
		</div>
	);
};

export default HeaderDesktop;