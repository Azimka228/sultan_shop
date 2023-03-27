import React, {FC} from "react";
import styles from "./index.module.scss"
import mailLogo from "./mail.svg"
import markerLogo from "./marker.svg"
import phoneLogo from "./phone.svg"
import callButtonLogo from "./callButton.svg"
import downloadLogo from "./download.svg"

import {Link} from "react-router-dom";

type BurgerMenuPropsType = {
	isOpen: boolean
}

export const BurgerMenu: FC<BurgerMenuPropsType> = ({isOpen}) => {
	if (!isOpen) return null
	return (
		<div className={styles.main}>
			<div className={styles.information}>
				<div className={styles.information__item}>
					<img src={markerLogo} alt="markerLogo"/>
					<div>
						<p>г. Кокчетав, ул. Ж. Ташенова 129Б</p>
						<p>(Рынок Восточный)</p>
					</div>
				</div>
				<div className={styles.information__item}>
					<img src={mailLogo} alt="mailLogo"/>
					<div>
						<p>opt.sultan@mail.ru</p>
						<p>На связи в любое время</p>
					</div>
				</div>
				<div className={styles.information__item}>
					<img src={phoneLogo} alt="phoneLogo"/>
					<div>
						<p>Отдел продаж</p>
						<p>+7 (777) 490-00-91</p>
						<p className={styles.information__timeWork}>время работы: 9:00-20:00</p>
					</div>
				</div>
				<div className={styles.information__RequestCall}>
					<button><img src={callButtonLogo} alt="callButtonLogo"/></button>
					<p>Заказать звонок</p>
				</div>
			</div>
			<div className={styles.line}></div>
			<div className={styles.menu}>
				<div className={styles.menu__title}>Меню сайта:</div>
				<div className={styles.menu__links}>
					<Link to={"#"}>О компании</Link>
					<Link to={"#"}>Доставка и оплата</Link>
					<Link to={"#"}>Возврат</Link>
					<Link to={"#"}>Контакты</Link>
				</div>

				<button>
					Прайс-лист
					<img src={downloadLogo} alt="downloadLogo"/>
				</button>
			</div>
		</div>
	);
};

