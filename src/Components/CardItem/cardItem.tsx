import React, {FC} from "react";
import {Link} from "react-router-dom";
import styles from "./index.module.scss"
import bottleImg from "./bottle.svg"
import boxImg from "./box.svg"
import cartImg from "./cart.svg"
import {ProductDataType} from "../../Store/slices/productListSlice";
import {useAppDispatch} from "../../Store/hooks/useAppDispatch";
import {setBasketItem} from "../../Store/slices/basketSlice";

type PromotionalGoodsItemPropsType = {
	data: ProductDataType
}

export const CardItem: FC<PromotionalGoodsItemPropsType> = ({data}) => {
	const dispatch = useAppDispatch()
	const itemSizeImg = data.typeSize === "мл" ? bottleImg : boxImg
	const titleFirstWord = data.title.split(" ")[0] + " "
	const remainingWords = data.title.split(" ").slice(1).join(" ")

	const handleAddToCart = (item: ProductDataType) => {
		dispatch(setBasketItem({item: {...item, count: 0},}))
	}

	return (
		<div className={styles.main}>
			<div className={styles.mark}>ПОПУЛЯРНОЕ</div>
			<div className={styles.logo}><img src={data.url} alt="img"/></div>
			<div className={styles.size}><img src={itemSizeImg} alt="itemSizeImg"/>{data.size} {data.typeSize}</div>
			<div className={styles.title}><Link to={`/catalog/${data.barcode}`}><span>{titleFirstWord}</span>{remainingWords}
			</Link></div>
			<div className={styles.barcode}>Штрихкод: <b>{data.barcode}</b></div>
			<div className={styles.manufacturer}>Производитель: <b>{data.manufacturer}</b></div>
			<div className={styles.brand}>Бренд: <b>{data.brand}</b></div>
			<div className={styles.cashout}>
				<div><b>{data.price} {data.currencyType}</b></div>
				<button onClick={() => handleAddToCart(data)}>В КОРЗИНУ <img src={cartImg} alt="cart"/></button>
			</div>
		</div>
	);
};
