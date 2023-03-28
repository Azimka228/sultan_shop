import React, {FC, useState} from "react";
import FilterByPrice from "../FilterByNumber/filterByPrice";
import {FilterByString} from "../FilterByString/filterByString";
import deleteIcon from "../../assets/delete.svg";
import {DataType} from "../../Utills/getDataSearchByString";
import {useMediaQuery} from "usehooks-ts";
import styles from "./index.module.scss"
import closeLogo from './close.svg'
import openLogo from './open.svg'

type SelectionByParametrsPropsType = {
	FilterByPriceData: { max: number, min: number }
	onChangeFilterByPrice: (max: number, min: number) => void
	FilterByStringData: Array<DataType>
	onChangeFilterByString: (e: Array<string>) => void
	onSubmitParametrs: () => void
	onResetResetParametrs: () => void
}

export const SelectionByParametrs: FC<SelectionByParametrsPropsType> = (
	{
		FilterByPriceData,
		onChangeFilterByPrice,
		FilterByStringData,
		onChangeFilterByString,
		onSubmitParametrs,
		onResetResetParametrs
	}
) => {
	const isTablet = useMediaQuery("(max-width: 768px)")

	const [isOpenedPanel, setIsOpenedPanel] = useState(true)
	const panelButtonLogo = isOpenedPanel? closeLogo: openLogo

	const handleChangeStatePanel = () => {
		setIsOpenedPanel(!isOpenedPanel)
	}
	return (
		<div>
			<div className={styles.filterPanel__title}>
				<p>ПОДБОР ПО ПАРАМЕТРАМ</p>
				{isTablet && <button onClick={handleChangeStatePanel}>
     <img src={panelButtonLogo} alt="panelButtonLogo"/>
				</button>}
			</div>
			{isOpenedPanel &&
    <>
     <div className={styles.filterPanel__priceTitle}>Цена <b>₸</b></div>
     <FilterByPrice
      initialValue={{max: FilterByPriceData.max, min: FilterByPriceData.min}}
      onChangeCallback={onChangeFilterByPrice}
     />
     <FilterByString
      onChangeCallback={onChangeFilterByString}
      data={FilterByStringData}
      title={"Производитель"}
      itemsAmountByStart={4}/>
     <div className={styles.filterPanel__btns}>
      <button
       onClick={onSubmitParametrs}
       className={styles.filterPanel__submit}
      >Показать
      </button>
      <button
       onClick={onResetResetParametrs}
       className={styles.filterPanel__reset}
      >
       <img
        src={deleteIcon}
        alt="deleteIcon"
       />
      </button>
     </div>
    </>
			}
		</div>
	)
}


