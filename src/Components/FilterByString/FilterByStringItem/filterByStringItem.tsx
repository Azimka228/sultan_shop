import React, {FC} from "react";

type FilterByStringItemPropsType = {
data:any
}

export const FilterByStringItem:FC<FilterByStringItemPropsType> = ({data}) => {
		const [title,amount] = data
	return (
		<div>
			<input type="checkbox"/>
			<span> {title} </span>
			<span>({amount})</span>
		</div>
	);
};

