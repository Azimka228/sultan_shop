import React, {FC} from "react";
import {useMediaQuery} from "usehooks-ts";
import styles from "./index.module.scss"
import BradCrumbsMobile from "./BradCrumbsMobile/bradCrumbsMobile";
import {BradCrumbsDesktopItem} from "./BradCrumbsDesktopItem/bradCrumbsDesktopItem";
import {v4 as generateId} from "uuid";

export type BradCrumbsType = {
	desktop: Array<BradCrumbsPathType>
	mobile: BradCrumbsPathType
}

export type BradCrumbsPathType = {
	to: string,
	title: string
}

const BradCrumbs: FC<BradCrumbsType> = ({desktop, mobile}) => {
	const isMobile = useMediaQuery("(max-width: 480px)")

	const BradCrumbsDesktop = desktop.map((el,index) => {
		if (index === desktop.length - 1) return <BradCrumbsDesktopItem key={generateId()} data={el} disableItem/>
		return	<BradCrumbsDesktopItem key={generateId()} data={el} disableItem={false}/>
	})

	return (
		<div className={styles.navigate}>
			{isMobile ?
				<BradCrumbsMobile data={mobile}/>
				:
				BradCrumbsDesktop
				}
		</div>
	);
};

export default BradCrumbs;