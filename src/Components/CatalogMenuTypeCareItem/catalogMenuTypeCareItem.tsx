import React, {FC} from "react";
import styles from "./index.module.scss";
import {useAppSelector} from "../../Store/Hooks/useAppSelector";
import {filterSortByItemTypeSelector} from "../../Store/Selectors/productListFilterSelector";
import {useMediaQuery} from "usehooks-ts";

type CatalogMenuTypeCareItemPropsType = {
	itemValue: string
	onClickItemCallback: (item: string) => void
	isLineAfterItem: boolean
}

const CatalogMenuTypeCareItem: FC<CatalogMenuTypeCareItemPropsType> = ({
																																																																								itemValue,
																																																																								onClickItemCallback,
																																																																								isLineAfterItem
																																																																							}) => {
	const isMobile = useMediaQuery("(max-width: 480px)")
	const filterSortByItemType = useAppSelector(filterSortByItemTypeSelector)
	let isSelectedItem
	if (filterSortByItemType.includes(itemValue)) {
		isSelectedItem = `${styles.itemTypeCare__title} ${styles.itemTypeCare__title_selected}`
	} else {
		isSelectedItem = styles.itemTypeCare__title
	}

	const linesAfterItem = isLineAfterItem && <div className={styles.line}></div>

	const handleClickItem = () => {
		onClickItemCallback(itemValue)
	}

	return (
		<>
			<div className={isSelectedItem} onClick={handleClickItem}>{itemValue}</div>
			{!isMobile && linesAfterItem}
		</>
	)
};

export default CatalogMenuTypeCareItem;