import React, {FC} from "react";
import bottleImg from "../../Assets/bottle.svg";
import boxImg from "../../Assets/box.svg";
import styles from './index.module.scss'
import {itemVolumeLiquidType, itemWeightType} from "../../Store/Slices/productListFilterSlice";
export type ItemSizePropsType = {
	typeSize: itemWeightType | itemVolumeLiquidType
	size: number
}

export const ItemSize: FC<ItemSizePropsType> = ({typeSize, size}) => {

	const itemSizeImg = typeSize === "мл" ? bottleImg : boxImg
	return (
		<div className={styles.main}>
			<img src={itemSizeImg} alt="itemSizeImg"/>
			<p >{size} {typeSize}</p>
		</div>
	);
};

