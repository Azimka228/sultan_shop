import React from "react";
import styles from './index.module.scss'

type FilterByPricePropsType = {
	defaultMax: number
	defaultMin: number
}

const FilterByPrice = () => {

	return (
		<div className={styles.main}>
			<input type="number" defaultValue={0}/>
			<span> - </span>
			<input type="number" defaultValue={1000}/>
		</div>
	);
};

export default FilterByPrice;