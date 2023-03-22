import React, {FC, useEffect, useState} from "react";
import {CustomInput} from "../CustomInput/customInput";
import {DataType} from "../../Utills/getDataSearchByString";
import {FilterByStringItem} from "./FilterByStringItem/filterByStringItem";

type FilterByStringPropsType = {
	title: string
	data: Array<DataType>
}

export const FilterByString: FC<FilterByStringPropsType> = ({title, data}) => {
	const [currentData, setCurrentData] = useState<any>()

	useEffect(() => {
		setCurrentData(Object.entries(data))
	}, [data])

	const test = (e: string) => {
		console.log(e)
		setCurrentData(currentData.filter((el: string | string[]) =>(el[0].includes(e))))
		if (e === "") {
			setCurrentData(Object.entries(data))
		}
	}
	const items = currentData?.map((el: any,index:number) => (<FilterByStringItem key={index} data={el}/>))
	return (
		<div>
			<div>{title}</div>
			<CustomInput width={238} InputSubmit={test}/>
			{items}
		</div>
	);
};

