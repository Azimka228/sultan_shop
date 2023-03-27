import React from "react";
import styles from "./index.module.scss"
import logo from "./logo.svg"
import downloadLogo from "./download.svg"
import buttonLogo from "../button.svg";
import visaLogo from "../visa.svg"
import mastercardLogo from "../mastercard.svg"
import {Link} from "react-router-dom";
import whatsappLogo from "../whatsapp.svg"
import telegramLogo from "../telegram.svg"

export const FooterMobile = () => {
	return (
		<div className={styles.main}>
			<div className={styles.logo}>
				<img src={logo} alt="logo"/>
				<button>Прайс-лист
					<img src={downloadLogo} alt="downloadLogo"/>
				</button>
			</div>
			<div>Компания «Султан» — снабжаем розничные магазины товарами "под ключ" в Кокчетаве
				и Акмолинской области
			</div>
			<div className={styles.subscribe}>Подпишись на скидки и акции</div>
			<div className={styles.input}>
				<input type="text" placeholder="Введите ваш E-mail"/>
				<button><img src={buttonLogo} alt="buttonLogo"/></button>
			</div>
			<div className={styles.links}>
				<div className={styles.links__item}>
					<div className={styles.item__title}>Меню сайта:</div>
					<Link to={"#"}>О компании</Link>
					<Link to={"#"}>Доставка и оплата</Link>
					<Link to={"#"}>Возврат</Link>
					<Link to={"#"}>Контакты</Link>
				</div>
				<div className={styles.links__item}>
					<div className={styles.item__title}>Категории:</div>
					<Link to={"#"}>Бытовая химия</Link>
					<Link to={"#"}>Косметика и гигиена</Link>
					<Link to={"#"}>Товары для дома</Link>
					<Link to={"#"}>Товары для детей и мам</Link>
					<Link to={"#"}>Посуда</Link>
				</div>
			</div>

			<div className={styles.contacts}>
				<div>
					<div className={styles.item__title}>Контакты:</div>
					<div className={styles.contacts__information}>
						<p className={styles.phone}>+7 (777) 490-00-91</p>
						<p className={styles.timeWork}>время работы: 9:00-20:00</p>
						<p className={styles.requestCall}>Заказать звонок</p>
					</div>
					<div>
						<p className={styles.email}>opt.sultan@mail.ru</p>
						<p>На связи в любое время</p>
					</div>
					<div className={styles.cards}>
						<img src={visaLogo} alt="visaLogo"/>
						<img src={mastercardLogo} alt="mastercardLogo"/>
					</div>
				</div>
				<div className={styles.connection}>
					<p>Связь<br/>
						в мессенджерах:</p>
					<div className={styles.connection__img}>
						<img src={whatsappLogo} alt="whatsappLogo"/>
						<img src={telegramLogo} alt="telegramLogo"/>
					</div>
				</div>
			</div>
		</div>
	);
};

