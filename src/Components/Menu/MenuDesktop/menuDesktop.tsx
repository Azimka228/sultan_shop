import React from "react";
import styles from "./index.module.scss"
import marker from './marker.svg'
import email from './email.svg'


const MenuDesktop = () => {
	return (
		<div className={styles.main}>
			<div className={styles.contacts}>
				<div className={styles.address}>
					<div className={styles.address__img}>
						<img src={marker} alt="marker"/>
					</div>

					<div className={styles.address__text}>
						<p><b>г. Кокчетав, ул. Ж. Ташенова 129Б</b></p>
						<p>(Рынок Восточный)</p>
					</div>
				</div>
				<div className={styles.email}>
					<div className={styles.email__img}>
						<img src={email} alt="marker"/>
					</div>
					<div className={styles.email__text}>
						<p><b>opt.sultan@mail.ru</b></p>
						<p>На связи в любое время</p>
					</div>
				</div>
			</div>
		<div className={styles.links}>
			<div className={styles.item}>О компании</div>
			<div className={styles.item}>Доставка и оплата</div>
			<div className={styles.item}>Возврат</div>
			<div className={styles.item}>Контакты</div>
		</div>
		</div>
	);
};

export default MenuDesktop;