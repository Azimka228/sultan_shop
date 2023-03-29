import React, {useState} from "react";
import wrapper from "../../Styles/wrapper.module.scss";
import {useAppSelector} from "../../Store/Hooks/useAppSelector";
import styles from "./index.module.scss";
import {AppLinks} from "../../Routes/links";
import {DefaultCustomTitle} from "../../Components/DefaultCustomTitle/defaultCustomTitle";
import {BasketItem} from "../../Components/BasketItem/basketItem";
import {EmptyBasketItem} from "../../Components/EmptyBasketItem/emptyBasketItem";
import {SuccsesPurchaseModal} from "../../Components/ModalWindow/SuccsesPurchaseModal/succsesPurchaseModal";
import {useAppDispatch} from "../../Store/Hooks/useAppDispatch";
import {clearBasket} from "../../Store/Slices/basketSlice";
import {basketBalanceSelector, basketItemsSelector, basketWalletSelector} from "../../Store/Selectors/basketSelector";
import BradCrumbs, {BradCrumbsType} from "../../Components/BradCrumbs/bradCrumbs";

const breadCrumbsData: BradCrumbsType = {
	desktop: [
		{
			to: AppLinks.home,
			title: "Главная"
		},
		{
			to: AppLinks.basket,
			title: "Корзина"
		}
	],
	mobile: {
		to: AppLinks.home,
		title: "Назад"
	},
}

const Basket = () => {
	const dispatch = useAppDispatch()

	const basketBalance = useAppSelector(basketBalanceSelector)
	const basketWallet = useAppSelector(basketWalletSelector)
	const basketItems = useAppSelector(basketItemsSelector)


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
				<BradCrumbs desktop={breadCrumbsData.desktop} mobile={breadCrumbsData.mobile}/>
				<DefaultCustomTitle text={"Корзина"}/>
				<div className={styles.cards}>
					{cardsBody}
				</div>
				<div className={styles.checkout}>
					<SuccsesPurchaseModal isOpen={isOpenModal} toggle={hanldeChangeStateModal}></SuccsesPurchaseModal>
					<button disabled={basketItems.length <= 0} onClick={handleConfirmOrder}>Оформить заказ</button>
					<p>{basketBalance.toFixed(2)} {basketWallet}</p>
				</div>
			</div>
		</div>
	);
};

export default Basket;