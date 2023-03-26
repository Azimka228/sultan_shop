import React from "react";
import {useLocalStorage} from "usehooks-ts";
import wrapper from "../../Styles/wrapper.module.scss";
import {ProductDataType} from "../../Store/slices/productListSlice";
import {DefaultCustomTitle} from "../../Components/DefaultCustomTitle/defaultCustomTitle";
import styles from "./index.module.scss"
import AdminDataItemForm from "../../Components/adminCRUD/AdminDataItemForm";
import {CardItem} from "../../Components/CardItem/cardItem";

const Admin = () => {
	const [cardItems, setCardItems] = useLocalStorage<Array<ProductDataType>>("cardItems", [])

	const handleAddNewCardItem = (e: ProductDataType) => {
		setCardItems([...cardItems, e])
	}
	const handleUpdateItem = (item: ProductDataType) => {
		const newArray = cardItems.map((cardItem) => {
			if (cardItem.id === item.id) {
				return item
			}
			return cardItem
		})
		setCardItems(newArray)
	}
	const MappedItems = cardItems.map( el => <CardItem data={el} key={el.id} updateForAdmin onItemUpdate={handleUpdateItem}/>)
	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				<DefaultCustomTitle text={"Admin panel"}/>
				<div className={styles.content}>
					<AdminDataItemForm onSubmit={handleAddNewCardItem}/>
					<div className={styles.items}>
						{MappedItems}
					</div>
				</div>
			</div>
		</div>
	)
};

export default Admin;