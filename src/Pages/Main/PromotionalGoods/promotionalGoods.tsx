import React, {useEffect, useState} from "react";
import wrapper from "../../../Styles/wrapper.module.scss";
import {CustomTitle} from "../../../Components/CustomTitle/customTitle";
import styles from "./index.module.scss"
import data from "../../../db.json"
import {PromotionalGoodsItem} from "./Item/PromotionalGoodsItem";

const PromotionalGoods = () => {
	const [currentdata, setCurrentData] = useState<any>()

	useEffect(() => {
		setCurrentData(data.items)
	}, [])

	const Items =currentdata?.map((el:any) => (<PromotionalGoodsItem data={el}/>))
	return (
		<div>
			<div className={wrapper.wrapper}>
				<CustomTitle text={"категории товаров"}/>
				<div className={styles.cards}>
					{Items}
				</div>
			</div>
		</div>
	);
};

export default PromotionalGoods;