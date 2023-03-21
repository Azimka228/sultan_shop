import React from "react";
import styles from "./index.module.scss"
import {Link} from "react-router-dom";
import {HeaderLinks} from "../../links";
import download from "../../Header/headerDesktop/download.svg";
import whatsappLogo from "../whatsapp.svg"
import telegramLogo from "../telegram.svg"
import visaLogo from "../visa.svg"
import mastercardLogo from "../mastercard.svg"
import subscribeMainLogo from '../logo.svg'

export const FooterDesktop = () => {
	return (
		<div className={styles.main}>
			<div className={styles.subscribe}>
				<div className={styles.subscribe__logo}>
					<img src={subscribeMainLogo} alt="log"/>
				</div>
				<div className={styles.subscribe__text}>
					<p>	Компания «Султан» — снабжаем розничные магазины товарами
						"под ключ" в Кокчетаве и Акмолинской области</p>
				</div>
				<p>Подпишись на скидки и акции</p>

			</div>
			<div className={styles.item}>
				<div className={styles.item__title}>Меню сайта:</div>
				<div className={styles.item__link}>
					<Link to={"/"}>О компании</Link>
				</div>
				<div className={styles.item__link}>
					<Link to={"/"}>Доставка и оплата</Link>
				</div>
				<div className={styles.item__link}>
					<Link to={"/"}>Возврат</Link>
				</div>
				<div className={styles.item__link}>
					<Link to={"/"}>Контакты</Link>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.item__title}>Категории:</div>
				<div className={styles.item__link}>
					<Link to={"/"}>Бытовая химия</Link>
				</div>
				<div className={styles.item__link}>
					<Link to={"/"}>Косметика и гигиена</Link>
				</div>
				<div className={styles.item__link}>
					<Link to={"/"}>Товары для дома</Link>
				</div>
				<div className={styles.item__link}>
					<Link to={"/"}>Товары для детей и мам</Link>
				</div>
				<div className={styles.item__link}>
					<Link to={"/"}>Посуда</Link>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.item__title}>Скачать прайс-лист:</div>
				<div className={styles.item__btn}>
					<Link to={HeaderLinks.priceList}>
						Прайс-лист
						<img src={download} alt="download"/>
					</Link>
				</div>
				<div className={styles.item__link}>
					<Link to={"/"}>Связь в мессенджерах:</Link>
				</div>
				<div className={`${styles.item__link} ${styles.item__socialNet}`}>
					<Link to={"/"}><img src={whatsappLogo} alt="whatsappLogo"/></Link>
					<Link to={"/"}><img src={telegramLogo} alt="telegramLogo"/></Link>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.item__title}>Контакты:</div>
				<div className={styles.feedback}>
					<div className={styles.feedback__phone}>+7 (777) 490-00-91</div>
					<div className={styles.feedback__time}>время работы: 9:00-20:00</div>
					<div className={styles.feedback__call}>Заказать звонок</div>
				</div>
				<div className={styles.email}>
					<p>opt.sultan@mail.ru</p>
						<p>На связи в любое время</p>
				</div>
				<div className={styles.cards}>
					<img src={visaLogo} alt="visaLogo"/>
					<img src={mastercardLogo} alt="mastercardLogo"/>
				</div>
			</div>
		</div>
	);
};

