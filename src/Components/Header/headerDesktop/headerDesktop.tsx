import React from "react";
import styles from "./index.module.scss"
import logo from "./logo.svg"
import catalog from "./catalog.svg"
import operatorLogo from "./operatorLogo.svg"
import download from "./download.svg"
import basket from "./basket.svg"
import {Link, useNavigate} from "react-router-dom";
import {AppLinks} from "../../../Routes/links";
import {CustomInput} from "../../CustomInput/customInput";
import {useAppSelector} from "../../../Store/hooks/useAppSelector";

const HeaderDesktop = () => {
	const basketBalance = useAppSelector(state => state.basket.balance)
	const basketAmountItems = useAppSelector(state => state.basket.amountItems)
	const basketWallet = useAppSelector(state => state.basket.wallet)

	const navigate = useNavigate()

	const handleInputSearch = (value: string) => {
	}

	const handleNavigateToBasket = () => {
		navigate(AppLinks.basket)
	}
	return (
		<div className={styles.main}>
			<div className={styles.logo}>
				<Link to={AppLinks.home}> <img src={logo} alt="logo"/></Link>
			</div>
			<div className={styles.btn}>
				<Link to={AppLinks.catalog}>
					<p>Каталог</p>
					<img src={catalog} alt="catalog"/>
				</Link>
			</div>
			<div className={styles.input}>
				<CustomInput InputSubmit={handleInputSearch} width={263}/>
			</div>
			<div className={styles.operator}>
				<div className={styles.operator__description}>
					<p className={styles.operator__number}><b>+7 (777) 490-00-91</b></p>
					<p className={styles.operator__workTime}>время работы: 9:00-20:00</p>
					<Link to={"#"}>Заказать звонок</Link>
				</div>
				<div className={styles.operator__logo}>
					<img src={operatorLogo} alt="operator logo"/>
					<div className={styles.operator__logo_online}></div>
				</div>
			</div>
			<div className={styles.border}></div>
			<div className={styles.btn}>
				<Link to={'#'}>
					<p>Прайс-лист</p>
					<img src={download} alt="download"/>
				</Link>
			</div>
			<div className={styles.border}></div>
			<div className={styles.basket} onClick={handleNavigateToBasket}>
				<div>
					<img src={basket} alt="3"/>
				</div>
				<div className={styles.basket__ellipse}>
					{basketAmountItems}
				</div>
			</div>
			<div className={styles.basket__text}>
				<div className={styles.basket__title}>
					Корзина
				</div>
				<div className={styles.basket__price}>
					{basketBalance.toFixed(2)} {basketWallet}
				</div>
			</div>
		</div>
	);
};

export default HeaderDesktop;