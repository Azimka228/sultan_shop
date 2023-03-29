import React, {FC} from "react";
import styles from "./index.module.scss";
import {Link} from "react-router-dom";
import {BradCrumbsPathType} from "../bradCrumbs";

type BradCrumbsDesktopItemPropsType = {
	data: BradCrumbsPathType
	disableItem: boolean
}

export const BradCrumbsDesktopItem: FC<BradCrumbsDesktopItemPropsType> = ({data,disableItem}) => {

	const handleDisablePageNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if(disableItem){
			e.preventDefault()
		}
	}
	const isDisableItem = disableItem ? styles.item_disabled : ''
	return (
		<div className={styles.item}>
			<Link
				to={data.to}
				onClick={handleDisablePageNavigation}
				className={isDisableItem}
			>{data.title}</Link>
		</div>
	);
};

