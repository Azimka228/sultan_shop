import React, {ChangeEvent, FC} from "react";
import styles from "./index.module.scss"

type FilterByPricePropsType = {
	initialValue: {
		max: number
		min: number
	}
	onChangeCallback: (max: number, min: number) => void
}

const FilterByPrice: FC<FilterByPricePropsType> = ({initialValue, onChangeCallback}) => {

	const handleChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
		onChangeCallback(Number(e.target.value), initialValue.min)
	}
	const handleChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
		onChangeCallback(initialValue.max, Number(e.target.value))
	}

	return (
		<div className={styles.main}>
			<input type="number" min={0} onChange={handleChangeMinValue} value={initialValue.min}/>
			<span> - </span>
			<input type="number" min={0} onChange={handleChangeMaxValue} value={initialValue.max}/>
		</div>
	);
};

export default FilterByPrice;