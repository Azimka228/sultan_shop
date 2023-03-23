import React, {FC} from "react";
import bottleImg from "../../assets/bottle.svg";
import boxImg from "../../assets/box.svg";
import {itemVolumeLiquidType, itemWeightType} from "../../Store/slices/productListSlice";
import styles from './index.module.scss'
type ItemSizePropsType = {
	typeSize: itemWeightType | itemVolumeLiquidType
	size: number
}

export const ItemSize: FC<ItemSizePropsType> = ({typeSize, size}) => {

	const itemSizeImg = typeSize === "мл" ? bottleImg : boxImg
	return (
		<div className={styles.main}>
			<img src={itemSizeImg} alt="itemSizeImg"/>
			{size} {typeSize}
		</div>
	);
};

