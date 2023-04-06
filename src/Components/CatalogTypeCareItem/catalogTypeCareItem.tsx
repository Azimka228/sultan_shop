import React, {FC} from "react";
import styles from "./index.module.scss";
import {useAppSelector} from "../../Store/Hooks/useAppSelector";
import {filterSortByItemTypeSelector} from "../../Store/Selectors/productListFilterSelector";

type CatalogTypeCareItemPropsType = {
	itemValue: string
	onClickItemCallback: (item: string) => void
}

const CatalogTypeCareItem: FC<CatalogTypeCareItemPropsType> = ({itemValue, onClickItemCallback}) => {
	const filterSortByItemType = useAppSelector(filterSortByItemTypeSelector)
	let isSelectedItem
	if (filterSortByItemType.includes(itemValue)) {
		isSelectedItem = `${styles.typeCards__item} ${styles.typeCards__item_selected}`
	} else {
		isSelectedItem = styles.typeCards__item
	}
	const handleClickItem = () => {
		onClickItemCallback(itemValue)
	}
	return (
		<div
			onClick={handleClickItem}
			className={isSelectedItem}
		>
			{itemValue}
		</div>
	)
};

export default CatalogTypeCareItem;