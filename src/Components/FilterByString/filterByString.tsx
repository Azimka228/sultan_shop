import React, {FC, useEffect, useState} from "react";
import {CustomInput} from "../CustomInput/customInput";
import {DataType} from "../../Utills/getDataSearchByString";
import {FilterByStringItem} from "./FilterByStringItem/filterByStringItem";
import openListLogo from "../../assets/openedList.svg";
import closedListLogo from "../../assets/closedList.svg";
import styles from "./index.module.scss"
import {useMediaQuery} from "usehooks-ts";

type FilterByStringPropsType = {
	checkedData: Array<string>
	title: string
	data: Array<DataType>
	onChangeCallback: (e: Array<string>) => void
	itemsAmountByStart: number
}

const FilterByString: FC<FilterByStringPropsType> = ({title, data, onChangeCallback, itemsAmountByStart,checkedData}) => {
	const isMobile = useMediaQuery("(max-width: 480px)")
	console.log('test')
	const [currentData, setCurrentData] = useState<any>()
	const [selectedItems, setSelectedItems] = useState<string[]>([])

	useEffect(() => {
		setSelectedItems([])
	}, [])
	useEffect(() => {
		if (isOpened) {
			setCurrentData(Object.entries(data))
		} else {
			setCurrentData(Object.entries(data).slice(0, itemsAmountByStart))
		}

	}, [data])


	const handleChangeSelectedItems = (name: string, checked: boolean) => {
		if (checked) {
			const currentArray = [...selectedItems, name]
			setSelectedItems(currentArray)
			onChangeCallback(currentArray)
		}
		if (!checked) {
			const currentArray = selectedItems.filter(el => el !== name)
			setSelectedItems(currentArray)
			onChangeCallback(currentArray)
		}
	}

	const items = currentData?.map((el: any, index: number) => (
		<FilterByStringItem checkedData={checkedData} onChangeCallback={handleChangeSelectedItems} key={index} data={el}/>))

	const [isOpened, setIsOpened] = useState(false)
	const isOpenedImg = isOpened ? openListLogo : closedListLogo
	const handleChangeIsOpened = () => {
		if (!isOpened) {
			setCurrentData(Object.entries(data))
		}
		if (isOpened) {
			setCurrentData(Object.entries(data).slice(0, itemsAmountByStart))
		}
		setIsOpened(!isOpened)
	}

	const buttonTitle = isOpened ? "Закрыть cписок" : "Показать все"

	const customInputWidth = isMobile ? "100%" : "238px"

	const handleSubmit = (e: string) => {
		setCurrentData(currentData.filter((el: string | string[]) => (el[0].includes(e))))
		if (e === "" && isOpened) {
			setCurrentData(Object.entries(data))
		}
		if (e === "" && !isOpened) {
			setCurrentData(Object.entries(data).slice(0,itemsAmountByStart))
		}
	}
	return (
		<div>
			<div className={styles.title}>{title}</div>
			<CustomInput width={customInputWidth} InputSubmit={handleSubmit}/>
			<div className={styles.items}>
				{items}
			</div>
			<button onClick={handleChangeIsOpened} className={styles.button}>{buttonTitle}<img src={isOpenedImg}
																																																																																						alt="isOpenedImg"/></button>
		</div>
	);
};

export default React.memo(FilterByString);

