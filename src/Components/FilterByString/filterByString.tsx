import React, {FC, useEffect, useState} from "react";
import {CustomInput} from "../CustomInput/customInput";
import {DataType} from "../../Utills/getDataSearchByString";
import {FilterByStringItem} from "./FilterByStringItem/filterByStringItem";

type FilterByStringPropsType = {
	title: string
	data: Array<DataType>
	onChangeCallback: (e: Array<string>) => void
}

export const FilterByString: FC<FilterByStringPropsType> = ({title, data,onChangeCallback}) => {
	const [currentData, setCurrentData] = useState<any>()
	const [selectedItems, setSelectedItems] = useState<string[]>([])

	useEffect(() => {
		setCurrentData(Object.entries(data))
	}, [data])

	const handleSubmit = (e: string) => {
		setCurrentData(currentData.filter((el: string | string[]) => (el[0].includes(e))))
		if (e === "") {
			setCurrentData(Object.entries(data))
		}
	}
	const handleChangeSelectedItems = (name: string, checked: boolean) => {
		if (checked) {
			const currentArray = [...selectedItems, name]
			setSelectedItems(currentArray)
			onChangeCallback(currentArray)
		} else {
			const currentArray = [...selectedItems].filter(el => el === name)
			setSelectedItems(currentArray)
			onChangeCallback(currentArray)
		}
	}
	const items = currentData?.map((el: any, index: number) => (
		<FilterByStringItem onChangeCallback={handleChangeSelectedItems} key={index} data={el}/>))
	return (
		<div>
			<div>{title}</div>
			<CustomInput width={238} InputSubmit={handleSubmit}/>
			{items}
		</div>
	);
};

