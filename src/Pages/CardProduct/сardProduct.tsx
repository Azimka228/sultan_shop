import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../Store/Hooks/useAppSelector";
import wrapper from "../../Styles/wrapper.module.scss";
import {AppLinks} from "../../Routes/links";
import cartImg from "../../Assets/cart.svg";
import styles from "./index.module.scss"
import CollapsibleDiv from "../../Components/CollapsibleDiv/collapsibleDiv";
import shareLogo from "./share.svg"
import downloadLogo from "./download.svg"
import {setBasketItem} from "../../Store/Slices/basketSlice";
import {useAppDispatch} from "../../Store/Hooks/useAppDispatch";
import {useMediaQuery} from "usehooks-ts";
import {ItemSize} from "../../Components/ItemSize/itemSize";
import {mainItemsSelector} from "../../Store/Selectors/productListSelector";
import BradCrumbs, {BradCrumbsType} from "../../Components/BradCrumbs/bradCrumbs";
import {ProductDataType} from "../../Store/Slices/productListSlice";
import {basketItemsSelector} from "../../Store/Selectors/basketSelector";
import Specification, {SpecificationItem} from "../../Components/Specification/specification";

const defaultCurrentItem: ProductDataType = {
	id: "static",
	itemType: ["static"],
	url: "https://api.e-dostavka.by/UserFiles/images/catalog/Goods/4588/00634588/norm/00634588.n_1.png",
	title: "static",
	typeSize: "кг",
	size: 0,
	barcode: "0",
	manufacturer: "static",
	brand: "static",
	description: "string",
	price: 0,
	currencyType: "₸"
}

const СardProduct = () => {

	const isDesktop = useMediaQuery("(max-width: 1253px)")
	const isMobile = useMediaQuery("(max-width: 480px)")

	const [amountItems, setAmountItems] = useState<number>(1)
	const dispatch = useAppDispatch()
	let {barcode} = useParams()
	const productsList = useAppSelector(mainItemsSelector)
	let currentItem = productsList?.find((el) => (el.barcode === barcode))

	const typeCare = currentItem?.itemType.join(", ")

	const currentItemSpecification:Array<SpecificationItem> = [
		{title: "Производитель",text: currentItem?.manufacturer || 'static' },
		{title: "Бренд",text: currentItem?.brand || 'static' },
		{title: "Артикул",text: currentItem?.barcode.slice(0, 6) || 'static' },
		{title: "Штрихкод",text: currentItem?.barcode || 'static' },
		{title: "Вес коробки",text: `${currentItem?.size} ${currentItem?.typeSize}` ?? 'static' },
		{title: "Тип ухода",text: typeCare || 'static' },
	]

	const navigate = useNavigate()
	const basketItems = useAppSelector(basketItemsSelector)
	const isItemInCart = basketItems.find(el => el.id === currentItem?.id)
	const [isAddedToCart, setAddedToCart] = useState(!!isItemInCart)
	const buttonAddToCartText = isAddedToCart ? "В КОРЗИНЕ" : "В КОРЗИНУ"
	const buttonAddToCartClass = isAddedToCart ? styles.addToCart_active : styles.addToCart

	if (!currentItem) {
		currentItem = defaultCurrentItem
	}
	const breadCrumbsData: BradCrumbsType = {
		desktop: [
			{to: AppLinks.home, title: "Главная"},
			{to: AppLinks.catalog, title: "Каталог"},
			{to: AppLinks.catalog + `/${barcode}`, title: currentItem?.title || "static"}
		],
		mobile: {to: AppLinks.home, title: "Назад"},
	}

	const handleIncreaseAmountItems = () => {
		setAmountItems(amountItems + 1)
	}
	const handleDecreaseAmountItems = () => {
		setAmountItems(amountItems - 1)
	}
	const handleAddToCart = () => {

		if (currentItem && currentItem.id !== "static") {
			if (isAddedToCart) {
				navigate(AppLinks.basket)
			} else {
				setAddedToCart(true)
				dispatch(setBasketItem({item: {...currentItem, count: amountItems}}))
			}

		}
	}

	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				<BradCrumbs desktop={breadCrumbsData.desktop} mobile={breadCrumbsData.mobile}/>
				<div className={styles.content}>
					<div className={styles.logo}><img src={currentItem?.url} alt="Item img"/></div>
					<div className={styles.content__main}>
						<div className={styles.status}>В наличии</div>
						<div className={styles.title}><b>{currentItem?.brand}</b> {currentItem?.title}</div>
						{!isMobile && <ItemSize typeSize={currentItem?.typeSize || "мл"} size={currentItem?.size || 0}/>}
						<div className={styles.cashout}>
							<p className={styles.cashout__price}>{currentItem?.price} {currentItem?.currencyType}</p>
							<div className={styles.cashout__settings}>
								<button onClick={handleDecreaseAmountItems} disabled={amountItems <= 1}>-</button>
								<p>{amountItems}</p>
								<button onClick={handleIncreaseAmountItems}>+</button>
							</div>
							{!isDesktop &&
        <button onClick={handleAddToCart} className={buttonAddToCartClass}>{buttonAddToCartText}<img
         src={cartImg} alt="cart"/>
        </button>}
						</div>
						<div className={styles.informationBTNS}>
							<div className={styles.informationBTNS__share}>
								{isDesktop &&
         <button onClick={handleAddToCart} className={buttonAddToCartClass}>{buttonAddToCartText}<img
          src={cartImg} alt="cart"/>
         </button>}
								<button><img src={shareLogo} alt="shareLogo"/></button>
							</div>
							<div>
								<button>При покупке от <b>10 000 ₸</b> бесплатная<br/> доставка по Кокчетаву и области</button>
							</div>
							<div>
								<button className={styles.informationBTNS__download}><b>Прайс-лист</b>
									<img src={downloadLogo} alt="downloadLogo"/>
								</button>
							</div>
						</div>
						<Specification data={currentItemSpecification}/>
						<CollapsibleDiv title={"Описание"}>
							<div className={styles.description}>{currentItem?.description}</div>
						</CollapsibleDiv>
						<div className={styles.line}></div>
						<CollapsibleDiv title={"Характеристики"}>
							<Specification data={currentItemSpecification}/>
						</CollapsibleDiv>
					</div>
				</div>
			</div>
		</div>
	);
};

export default СardProduct;