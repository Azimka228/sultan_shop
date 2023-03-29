import React, {FC} from "react";
import styles from "./index.module.scss"
import {BasketDataType, decreaseItemCount, deleteBasketItem, increaseItemCount} from "../../Store/Slices/basketSlice";
import {useAppSelector} from "../../Store/Hooks/useAppSelector";
import deleteIcon from "./delete.svg"
import {useAppDispatch} from "../../Store/Hooks/useAppDispatch";
import {ItemSize} from "../ItemSize/itemSize";

type BasketItemPropsType = {
	data: BasketDataType
}

export const BasketItem: FC<BasketItemPropsType> = ({data}) => {
	const dispatch = useAppDispatch()
	const basketWallet = useAppSelector(state => state.basket.wallet)

	const handleDeleteItem = () => {
		dispatch(deleteBasketItem({item: data}))
	}
	const handleDecreaseItemCount = () => {
		dispatch(decreaseItemCount({item: data}))
	}
	const handleIncreaseItemCount = () => {
		dispatch(increaseItemCount({item: data}))
	}
	return (
		<div className={styles.main}>
			<div className={styles.logo}>
				<img src={data.url} alt="img"/>
			</div>
			<div className={styles.information}>
				<ItemSize size={data.size} typeSize={data.typeSize}/>
				<div className={styles.title}>{data.brand} {data.title}</div>
				<div className={styles.description}>{data.description}</div>
			</div>
			<div className={styles.main__settings}>
				<div className={styles.calculateBTNS}>
					<button onClick={handleDecreaseItemCount}>-</button>
					<p>{data.count}</p>
					<button onClick={handleIncreaseItemCount}>+</button>
				</div>
				<div className={styles.price}>
					<p>{data.price} {basketWallet}</p>
				</div>
				<div className={styles.deleteBTN}>
					<button onClick={handleDeleteItem}><img src={deleteIcon} alt="deleteIcon"/></button>
				</div>
			</div>
		</div>
	);
};

