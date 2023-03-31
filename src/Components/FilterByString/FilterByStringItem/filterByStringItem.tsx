import React, {FC, useEffect} from "react";
import styles from "./index.module.scss"

type FilterByStringItemPropsType = {
	data: any
	onChangeCallback: (name: string, checked: boolean) => void
	checkedData: Array<string>
}

export const FilterByStringItem: FC<FilterByStringItemPropsType> = ({data, onChangeCallback, checkedData}) => {
	const [title, amount] = data
	const [checked, setChecked] = React.useState(checkedData.includes(title));
	const handleChange = () => {
		onChangeCallback(title, !checked)
		setChecked(!checked);
	};

	useEffect(() => {
		if (checkedData.includes(title)) {
			setChecked(false)
		}
	}, [checkedData])

	return (
		<div onClick={handleChange} className={styles.main}>
			<input type="checkbox"
										checked={checked}/>
			<span className={styles.title}> {title} </span>
			<span className={styles.amount}>({amount})</span>
		</div>
	);
};

