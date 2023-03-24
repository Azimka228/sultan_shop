import React, {FC, useEffect, useState} from "react";
import styles from "./index.module.scss"
import openListLogo from "../../assets/openedList.svg";
import closedListLogo from "../../assets/closedList.svg";
import {DefaultSortType} from "../../Store/slices/productListFilter";

type MenuSortByPropsType = {
	selected: string
	sortBy: Array<DefaultSortType>
	onChangeSelected: (e: DefaultSortType) => void
}

export const MenuSortBy: FC<MenuSortByPropsType> = ({selected, sortBy, onChangeSelected}) => {
	const [isOpened, setIsOpened] = useState(false)

	const [selectedItem, setSelectedItem] = useState("")

	useEffect(() => {
		setSelectedItem(selected)
	}, [selected])

	const isOpenedImg = isOpened ? openListLogo : closedListLogo

	const handleChangeIsOpened = () => {
		setIsOpened(!isOpened)
	}
	const handleSetSelectedItem = (item: DefaultSortType) => {
		onChangeSelected(item)
		setSelectedItem(item)
		setIsOpened(!isOpened)
	}
	return (
		<React.Fragment>
			<div className={styles.main} onClick={handleChangeIsOpened}>
				<div onClick={handleChangeIsOpened} className={styles.button}>Сортировка: <span>{selectedItem}</span> <img
					src={isOpenedImg} alt="isOpenedImg"/></div>
				{isOpened && <div className={styles.menu}>{sortBy.map(el => {
					return <div onClick={() => {
						handleSetSelectedItem(el)
					}}>{el}</div>
				})}</div>}
			</div>
		</React.Fragment>

	);
};

