import React, {FC} from "react";
import {Link} from "react-router-dom";
import styles from "./index.module.scss"
import cartImg from "../../assets/cart.svg"
import {useAppDispatch} from "../../Store/hooks/useAppDispatch";
import {setBasketItem} from "../../Store/slices/basketSlice";
import {ItemSize} from "../ItemSize/itemSize";
import {ProductDataType} from "../../Store/slices/productListFilter";

type PromotionalGoodsItemPropsType = {
	data: ProductDataType
}

export const CardItem: FC<PromotionalGoodsItemPropsType> = ({data}) => {
	const dispatch = useAppDispatch()

	const handleAddToCart = (item: ProductDataType) => {
		dispatch(setBasketItem({item: {...item, count: 1},}))
	}
	const typeCare = data.itemType.join(", ")

	return (
		<div className={styles.main}>
			<div className={styles.mark}>ПОПУЛЯРНОЕ</div>
			<div className={styles.logo}><img src={data.url} alt="img"/></div>
			<ItemSize size={data.size} typeSize={data.typeSize}/>
			<div className={styles.title}><Link to={`/catalog/${data.barcode}`}><span>{data.brand} </span>{data.title}
			</Link></div>
			<div className={styles.barcode}>Штрихкод: <b>{data.barcode}</b></div>
			<div className={styles.manufacturer}>Производитель: <b>{data.manufacturer}</b></div>
			<div className={styles.brand}>Бренд: <b>{data.brand}</b></div>
			<div>Тип ухода: <b>{typeCare}</b></div>
			<div className={styles.cashout}>
				<div><b>{data.price} {data.currencyType}</b></div>
				<button onClick={() => handleAddToCart(data)}>В КОРЗИНУ <img src={cartImg} alt="cart"/></button>
			</div>
		</div>
	);
};
