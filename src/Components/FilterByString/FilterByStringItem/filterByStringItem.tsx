import React, {FC} from "react";

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
		<div onClick={handleChange}>
			<input type="checkbox" checked={checked}/>
			<span> {title} </span>
			<span>({amount})</span>
		</div>
	);
};

