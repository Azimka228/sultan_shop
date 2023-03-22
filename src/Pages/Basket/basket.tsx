import React from "react";
import wrapper from "../../Styles/wrapper.module.scss";
import {useAppSelector} from "../../Store/hooks/useAppSelector";
import styles from "./index.module.scss";
import breadCrumbs from "../../Styles/breadCrumbs.module.scss";
import {Link} from "react-router-dom";
import {AppLinks} from "../../Routes/links";
import {DefaultCustomTitle} from "../../Components/DefaultCustomTitle/defaultCustomTitle";
import {BasketItem} from "../../Components/BasketItem/basketItem";
import {EmptyBasketItem} from "../../Components/EmptyBasketItem/emptyBasketItem";

const Basket = () => {
	const basketBalance = useAppSelector(state => state.basket.balance)
	const basketWallet = useAppSelector(state => state.basket.wallet)
	const basketItems = useAppSelector(state => state.basket.items)

	const handleDisablePageNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
	}

	const mappedBasketItems = basketItems.map((el) => {
		return (<BasketItem key={el.id} data={el}/>)
	})

	const cardsBody = mappedBasketItems.length ? mappedBasketItems : <EmptyBasketItem/>

	return (
		<div>
			<div className={wrapper.wrapper}>
				<div className={breadCrumbs.navigate}>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.home}>Главная</Link>
					</div>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.basket} onClick={handleDisablePageNavigation}
												className={breadCrumbs.navigate__item_disabled}>Корзина</Link>
					</div>
				</div>
				<DefaultCustomTitle text={"Корзина"}/>
				<div className={styles.cards}>
					{cardsBody}
				</div>
				<div className={styles.checkout}>
					<button>Оформить заказ</button>
					<p>{basketBalance.toFixed(2)} {basketWallet}</p>
				</div>
			</div>
		</div>
	);
};

export default Basket;