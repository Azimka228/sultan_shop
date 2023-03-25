import React, {FC} from "react";
import styles from './index.module.scss'

type FilterByStringItemPropsType = {
	data: any
	onChangeCallback: (name:string, checked: boolean) => void

}

export const FilterByStringItem: FC<FilterByStringItemPropsType> = ({data,onChangeCallback}) => {
	const [title, amount] = data
	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		onChangeCallback(title,!checked)
		setChecked(!checked);
	};



	return (
		<div onClick={handleChange} className={styles.main}>
			<input type="checkbox"
										onChange={handleChange}
										checked={checked}/>
			<span className={styles.title}> {title} </span>
			<span className={styles.amount}>({amount})</span>
		</div>
	);
};

