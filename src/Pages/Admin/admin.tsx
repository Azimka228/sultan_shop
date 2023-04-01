import React, {useState} from "react";
import {useLocalStorage} from "usehooks-ts";
import wrapper from "../../Styles/wrapper.module.scss";
import {ProductDataType} from "../../Store/Slices/productListSlice";
import {DefaultCustomTitle} from "../../Components/DefaultCustomTitle/defaultCustomTitle";
import styles from "./index.module.scss"
import AdminDataItemForm from "../../Components/AdminCRUD/AdminDataItemForm";
import {CardItem} from "../../Components/CardItem/cardItem";
import {DeleteAllAdminItemModal} from "../../Components/ModalWindow/DeleteAllAdminItemModal/deleteAllAdminItemModal";

const Admin = () => {
	const [cardItems, setCardItems] = useLocalStorage<Array<ProductDataType>>("cardItems", [])


	const handleAddNewCardItem = (e: ProductDataType) => {
		setCardItems([...cardItems, e])
	}
	const handleUpdateItem = (item: ProductDataType) => {
		console.log("item",item)
		const newArray = cardItems.map((cardItem) => {
			if (cardItem.id === item.id) {
				return item
			}
			return cardItem
		})
		setCardItems(newArray)
	}
	const handleDeleteCardItem = (e: ProductDataType) => {
		const newArray = cardItems.filter((cardItem) => cardItem.id !== e.id)
		setCardItems(newArray)
	}
	const handleDeleteAllCardItems = () => {
		const newArray:Array<any> = []
		setCardItems(newArray)
	}
	const MappedItems = cardItems.map(el => <CardItem
		data={el}
		key={el.id}
		updateForAdmin
		onItemUpdate={handleUpdateItem}
		onItemDelete={handleDeleteCardItem}
	/>)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const handleChangeModalStatus = () => {
		setIsOpenModal(!isOpenModal)
	}
	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				<div className={styles.title}>
					<DefaultCustomTitle text={"Admin panel"}/>
					<DeleteAllAdminItemModal isOpen={isOpenModal} onModalSubmit={handleDeleteAllCardItems} toggle={handleChangeModalStatus}/>
					<button onClick={handleChangeModalStatus} disabled={cardItems.length < 1}>Удалить все предметы</button>
				</div>

				<div className={styles.content}>
					<AdminDataItemForm onSubmit={handleAddNewCardItem}/>
					{cardItems.length > 0 ?
						<div className={styles.items}>
							{MappedItems}
						</div>
						:
						<div className={styles.noItems}>Нету предметов</div>
					}


				</div>
			</div>
		</div>
	)
};

export default Admin;