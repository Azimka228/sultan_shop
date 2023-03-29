import React, {FC, useState} from "react";
import {Link} from "react-router-dom";
import styles from "./index.module.scss"
import cartImg from "../../assets/cart.svg"
import deleteLogo from "../../assets/delete.svg"
import updateLogo from "../../assets/update.png"
import {useAppDispatch} from "../../Store/Hooks/useAppDispatch";
import {setBasketItem} from "../../Store/Slices/basketSlice";
import {ItemSize} from "../ItemSize/itemSize";
import {ProductDataType} from "../../Store/Slices/productListFilterSlice";
import {UpdateAdminItemModal} from "../ModalWindow/UpdateAdminItemModal/updateAdminItemModal";
import {DeleteAdminItemModal} from "../ModalWindow/DeleteAdminItemModal/deleteAdminItemModal";

type PromotionalGoodsItemPropsType = {
	data: ProductDataType
	updateForAdmin?: boolean
	onItemUpdate?: (e: ProductDataType) => void
	onItemDelete?: (e: ProductDataType) => void
}

export const CardItem: FC<PromotionalGoodsItemPropsType> = ({data, updateForAdmin, onItemUpdate, onItemDelete}) => {
	const dispatch = useAppDispatch()

	const handleAddToCart = (item: ProductDataType) => {
		dispatch(setBasketItem({item: {...item, count: 1},}))
	}
	const typeCare = data.itemType.join(", ")

	const [isOpenModalUpdateItem, setIsOpenModalUpdateItem] = useState(false)
	const [isOpenModalDeleteItem, setIsOpenModalDeleteItem] = useState(false)

	const handleChangeUpdateItemStatusModal = () => {
		setIsOpenModalUpdateItem(!isOpenModalUpdateItem)
	}
	const handleChangeDeleteItemStatusModal = () => {
		setIsOpenModalDeleteItem(!isOpenModalDeleteItem)
	}

	const handleSubmitUpdateItem = (e: ProductDataType) => {
		setIsOpenModalUpdateItem(false)
		if (onItemUpdate) {
			onItemUpdate(e)
		}
	}
	const handleSubmitDeleteItem = () => {
		setIsOpenModalDeleteItem(false)
		if (onItemDelete) {
			onItemDelete(data)
		}
	}

	return (
		<div className={styles.main}>
			{updateForAdmin &&
    <div className={styles.mark}>
     <UpdateAdminItemModal isOpen={isOpenModalUpdateItem} toggle={handleChangeUpdateItemStatusModal} data={data}
                           onModalSubmit={handleSubmitUpdateItem}/>

     <DeleteAdminItemModal isOpen={isOpenModalDeleteItem} toggle={handleChangeDeleteItemStatusModal}
                           onModalSubmit={handleSubmitDeleteItem}/>
     <button className={styles.mark__update} onClick={handleChangeUpdateItemStatusModal}>
      <img src={updateLogo} alt="updateLogo"/>
     </button>
     <button className={styles.mark__delete} onClick={handleChangeDeleteItemStatusModal}>
      <img src={deleteLogo} alt="deleteLogo"/>
     </button>
    </div>
			}
			<div className={styles.logo}><img src={data.url} alt="img"/></div>
			<ItemSize size={data.size} typeSize={data.typeSize}/>
			<div className={styles.title}><Link to={`/catalog/${data.barcode}`}><span>{data.brand} </span>{data.title}
			</Link></div>
			<div className={styles.barcode}>Штрихкод: <b>{data.barcode}</b></div>
			<div className={styles.manufacturer}>Производитель: <b>{data.manufacturer}</b></div>
			<div className={styles.brand}>Бренд: <b>{data.brand}</b></div>
			<div>Тип ухода: <b>{typeCare}</b></div>
			<div className={styles.cashout}>
				<div><b>{data.price} {data.currencyType}</b></div>
				{!updateForAdmin &&
     <button onClick={() => handleAddToCart(data)}>В КОРЗИНУ <img src={cartImg} alt="cart"/></button>}
			</div>
		</div>
	);
};
