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
import {useAppSelector} from "../../../Store/Hooks/useAppSelector";
import {useMediaQuery} from "usehooks-ts";

const HeaderDesktop = () => {

	const isMediumWindowWidth = useMediaQuery('(max-width: 693px)')
	const basketBalance = useAppSelector(state => state.basket.balance)
	const basketAmountItems = useAppSelector(state => state.basket.amountItems)
	const basketWallet = useAppSelector(state => state.basket.wallet)

	const navigate = useNavigate()

	const elementBorder = !isMediumWindowWidth && 	<div className={styles.border}></div>

	const handleNavigateToBasket = () => {
		navigate(AppLinks.basket)
	}
	return (
		<div className={styles.main}>
			<div className={styles.main__wrapper}>
				<div className={styles.logo}>
					<Link to={AppLinks.catalog}> <img src={logo} alt="logo"/></Link>
				</div>
				<div className={styles.btn}>
					<Link to={AppLinks.catalog}>
						<p>Каталог</p>
						<img src={catalog} alt="catalog"/>
					</Link>
				</div>
				<div className={styles.input}>
					<CustomInput InputSubmit={()=>{}} width={"263px"}/>
				</div>
			</div>
			<div className={styles.main__wrapper}>
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
				{elementBorder}
				<div className={styles.btn}>
					<Link to={'#'}>
						<p>Прайс-лист</p>
						<img src={download} alt="download"/>
					</Link>
				</div>
				{elementBorder}
				<div className={styles.basket__main}>
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

			</div>
		</div>
	);
};

export default HeaderDesktop;