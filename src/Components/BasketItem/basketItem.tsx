import React, {FC} from "react";
import styles from "./index.module.scss"
import {BasketDataType, decreaseItemCount, deleteBasketItem, increaseItemCount} from "../../Store/slices/basketSlice";
import {useAppSelector} from "../../Store/hooks/useAppSelector";
import deleteIcon from "./delete.svg"
import {useAppDispatch} from "../../Store/hooks/useAppDispatch";

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
			<div>
				<div>{data.size} {data.typeSize}</div>
				<div>{data.title}</div>
				<div>{data.description}</div>
			</div>
			<div className={styles.main__settings}>
				<div>
					<button onClick={handleDecreaseItemCount}>-</button>
					{data.count}
					<button onClick={handleIncreaseItemCount}>+</button>
				</div>
				<div>
					<p>{data.price.toFixed(2)} {basketWallet}</p>
				</div>
				<div>
					<button onClick={handleDeleteItem}><img src={deleteIcon} alt="deleteIcon"/></button>
				</div>
			</div>
		</div>
	);
};

