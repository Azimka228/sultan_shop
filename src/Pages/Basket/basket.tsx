import React, {useState} from "react";
import wrapper from "../../Styles/wrapper.module.scss";
import {useAppSelector} from "../../Store/hooks/useAppSelector";
import styles from "./index.module.scss";
import breadCrumbs from "../../Styles/breadCrumbs.module.scss";
import {Link} from "react-router-dom";
import {AppLinks} from "../../Routes/links";
import {DefaultCustomTitle} from "../../Components/DefaultCustomTitle/defaultCustomTitle";
import {BasketItem} from "../../Components/BasketItem/basketItem";
import {EmptyBasketItem} from "../../Components/EmptyBasketItem/emptyBasketItem";
import {SuccsesPurchaseModal} from "../../Components/ModalWindow/SuccsesPurchaseModal/succsesPurchaseModal";
import {useAppDispatch} from "../../Store/hooks/useAppDispatch";
import {clearBasket} from "../../Store/slices/basketSlice";

const Basket = () => {
	const basketBalance = useAppSelector(state => state.basket.balance)
	const basketWallet = useAppSelector(state => state.basket.wallet)
	const basketItems = useAppSelector(state => state.basket.items)

	const dispatch = useAppDispatch()

	const handleDisablePageNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
	}

	const mappedBasketItems = basketItems.map((el) => {
		return (<BasketItem key={el.id} data={el}/>)
	})

	const cardsBody = mappedBasketItems.length ? mappedBasketItems : <EmptyBasketItem/>
	const [isOpenModal, setIsOpenModal] = useState(false)
	const hanldeChangeStateModal = () => {
		setIsOpenModal(!isOpenModal)
	}

	const handleConfirmOrder = () => {
		setIsOpenModal(true)
		dispatch(clearBasket())
	}
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
					<SuccsesPurchaseModal isOpen={isOpenModal} toggle={hanldeChangeStateModal}></SuccsesPurchaseModal>
					<button disabled={basketItems.length <= 0} onClick={handleConfirmOrder}>Оформить заказ</button>
					<p>{basketBalance} {basketWallet}</p>
				</div>
			</div>
		</div>
	);
};

export default Basket;