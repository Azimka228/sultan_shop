import React, {useEffect, useState} from "react";
import wrapper from "../../../Styles/wrapper.module.scss";
import {ColoredCustomTitle} from "../../../Components/ColoredCustomTitle/coloredCustomTitle";
import styles from "./index.module.scss"
import data from "../../../db.json"
import {CardItem} from "../../../Components/CardItem/cardItem";

const PromotionalGoods = () => {
	const [currentdata, setCurrentData] = useState<any>()

	useEffect(() => {
		setCurrentData(data.productsList)
	}, [])

	const Items =currentdata?.map((el:any) => (<CardItem data={el}/>))
	return (
		<div>
			<div className={wrapper.wrapper}>
				<ColoredCustomTitle text={"категории товаров"}/>
				<div className={styles.cards}>
					{Items}
				</div>
			</div>
		</div>
	);
};

export default PromotionalGoods;