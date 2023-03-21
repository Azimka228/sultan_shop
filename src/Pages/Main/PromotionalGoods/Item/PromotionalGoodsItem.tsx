import React, {FC} from "react";
import {Link} from "react-router-dom";
import styles from "./index.module.scss"
import bottleImg from "./bottle.svg"
import boxImg from "./box.svg"

type PromotionalGoodsItemPropsType = {
	data: dataType
}

export type dataType = {
	"id": number
	"url": string
	"title": string
	"typeSize": string
	"size": number
	"barcode": string
	"manufacturer": string
	"brand": string
	"description": string
	"price": number
	"currencyType": string
}

export const PromotionalGoodsItem: FC<PromotionalGoodsItemPropsType> = ({data}) => {
	const itemSizeImg = data.typeSize === "мл" ? bottleImg : boxImg
	return (
		<div className={styles.main}>
			<div className={styles.mark}>ПОПУЛЯРНОЕ</div>
			<div className={styles.logo}><img src={data.url} alt="img"/></div>
			<div className={styles.size}><img src={itemSizeImg} alt="itemSizeImg"/>{data.size} {data.typeSize}</div>
			<div><Link to={`/catalog/${data.barcode}`}>{data.title}</Link></div>
			<div className={styles.barcode}>Штрихкод: <b>{data.barcode}</b></div>
			<div className={styles.manufacturer}>Производитель: <b>{data.manufacturer}</b></div>
			<div className={styles.brand}>Бренд: <b>{data.brand}</b></div>
			<div>
				<div><b>{data.price} {data.currencyType}</b></div>
				<button></button>
			</div>

		</div>
	);
};
