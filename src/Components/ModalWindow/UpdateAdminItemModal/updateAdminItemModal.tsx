import React, {FC, useEffect} from "react";
import styles from "./index.module.scss"
import ReactDOM from "react-dom";
import closeLogo from "../close.svg"
import {ProductDataType} from "../../../Store/slices/productListSlice";
import AdminDataItemForm from "../../AdminCRUD/AdminDataItemForm";
import {DefaultCustomTitle} from "../../DefaultCustomTitle/defaultCustomTitle";
import {modalRoot} from "../../../index";

type ModalWindowPropsType = {
	isOpen: boolean
	toggle: (e: boolean) => void;
	data: ProductDataType
	onModalSubmit: (e:ProductDataType) => void

}


export const UpdateAdminItemModal: FC<ModalWindowPropsType> = ({isOpen, toggle,data,onModalSubmit}) => {

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = ""
		}
	}, [isOpen])

	const handleCloseModal = () => {
		toggle(false)
	}
	const handleStopProg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation()
	}
	const handleModalSubmit = (e:ProductDataType) => {
		onModalSubmit(e)
	}

	if (!isOpen) return null
	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={handleCloseModal}>
			<div className={styles.box} onClick={handleStopProg}>
				<div className={styles.closeBTN}>
					<button onClick={handleCloseModal}><img src={closeLogo} alt="closeLogo"/></button>
				</div>
				<DefaultCustomTitle text={"Update Item"}/>
				<AdminDataItemForm onSubmit={handleModalSubmit} data={data}/>
			</div>
		</div>,
		modalRoot
	);

};

