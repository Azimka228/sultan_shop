import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../Store/hooks/useAppSelector";
import wrapper from "../../Styles/wrapper.module.scss";
import breadCrumbs from "../../Styles/breadCrumbs.module.scss";
import {AppLinks} from "../../Routes/links";
import bottleImg from "../../assets/bottle.svg";
import boxImg from "../../assets/box.svg";
import cartImg from "../../assets/cart.svg";
import styles from "./index.module.scss"
import CollapsibleDiv from "../../Components/CollapsibleDiv/collapsibleDiv";
import shareLogo from "./share.svg"
import downloadLogo from "./download.svg"
import {setBasketItem} from "../../Store/slices/basketSlice";
import {useAppDispatch} from "../../Store/hooks/useAppDispatch";

const СardProduct = () => {

	const [amountItems, setAmountItems] = useState<number>(1)
	const dispatch = useAppDispatch()
	let {barcode} = useParams()
	const productsList = useAppSelector((state) => state.productList.productsList)
	const currentItem = productsList?.find((el) => (el.barcode === barcode))

	const handleDisablePageNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
	}

	const handleIncreaseAmountItems = () => {
		setAmountItems(amountItems + 1)
	}
	const handleDecreaseAmountItems = () => {
		setAmountItems(amountItems - 1)
	}
	const handleAddToCart = () => {
		if (currentItem) {
			dispatch(setBasketItem({item: {...currentItem, count: amountItems}}))
		}
	}

	const itemSizeImg = currentItem?.typeSize === "мл" ? bottleImg : boxImg
	const typeCare = currentItem?.itemType.join(", ")

	const characteristicsBlock =
		<div className={styles.specification}>
			<p>Производитель: <span>{currentItem?.manufacturer}</span></p>
			<p>Бренд: <span>{currentItem?.brand}</span></p>
			<p>Артикул: <span>{currentItem?.barcode.slice(0, 6)}</span></p>
			<p>Штрихкод: <span>{currentItem?.barcode}</span></p>
			<p>Вес коробки: <span>{currentItem?.size} {currentItem?.typeSize}</span></p>
			<p>Тип ухода: <span>{typeCare}</span></p>
		</div>;

	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				<div className={breadCrumbs.navigate}>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.home}>Главная</Link>
					</div>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.catalog}>Каталог</Link>
					</div>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.catalog + `/${barcode}`} onClick={handleDisablePageNavigation}
												className={breadCrumbs.navigate__item_disabled}>{currentItem?.title}</Link>
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.logo}><img src={currentItem?.url} alt="Item img"/></div>
					<div>
						<div className={styles.status}>В наличии</div>
						<div className={styles.title}><b>{currentItem?.brand}</b> {currentItem?.title}</div>
						<div className={styles.size}><img src={itemSizeImg} alt="itemSizeImg"/>{currentItem?.size} {currentItem?.typeSize}
						</div>
						<div className={styles.cashout}>
							<p className={styles.cashout__price}>{currentItem?.price} {currentItem?.currencyType}</p>
							<div className={styles.cashout__settings}>
								<button onClick={handleDecreaseAmountItems} disabled={amountItems <= 1}>-</button>
								<p>{amountItems}</p>
								<button onClick={handleIncreaseAmountItems}>+</button>
							</div>
							<button onClick={handleAddToCart}>В корзину <img src={cartImg} alt="cart"/></button>
						</div>
						<div className={styles.informationBTNS}>
							<button><img src={shareLogo} alt="shareLogo"/></button>
							<button>При покупке от <b>10 000 ₸</b> бесплатная<br/> доставка по Кокчетаву и области</button>
							<button className={styles.informationBTNS__download}><b>Прайс-лист</b> <img src={downloadLogo}
																																																																																			alt="downloadLogo"/></button>
						</div>
						<div className={styles.specification}>
							<p>Производитель: <span>{currentItem?.manufacturer}</span></p>
							<p>Бренд: <span>{currentItem?.brand}</span></p>
							<p>Артикул: <span>{currentItem?.barcode.slice(0, 6)}</span></p>
							<p>Штрихкод: <span>{currentItem?.barcode}</span></p>
							<p>Вес коробки: <span>{currentItem?.size} {currentItem?.typeSize}</span></p>
						</div>
						<CollapsibleDiv
							title={"Описание"}>
							<div className={styles.description}>{currentItem?.description}</div>
						</CollapsibleDiv>
						<div className={styles.line}></div>
						<CollapsibleDiv
							title={"Характеристики"}>
							{characteristicsBlock}
						</CollapsibleDiv>
					</div>
				</div>
			</div>
		</div>
	);
};

export default СardProduct;