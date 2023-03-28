import React, {FC, useEffect} from "react";
import styles from "./index.module.scss"
import ReactDOM from "react-dom";
import closeLogo from "../close.svg"
import {DefaultCustomTitle} from "../../DefaultCustomTitle/defaultCustomTitle";
import {modalRoot} from "../../../index";

type ModalWindowPropsType = {
	isOpen: boolean
	toggle: (e: boolean) => void;
	onModalSubmit: () => void
}

export const DeleteAdminItemModal: FC<ModalWindowPropsType> = ({isOpen, toggle,onModalSubmit}) => {

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
	const handleModalSubmit = () => {
		toggle(false)
		document.body.style.overflow = ""
		onModalSubmit()
	}

	if (!isOpen) return null
	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={handleCloseModal}>
			<div className={styles.box} onClick={handleStopProg}>
				<div className={styles.closeBTN}>
					<button onClick={handleCloseModal}><img src={closeLogo} alt="closeLogo"/></button>
				</div>
				<DefaultCustomTitle text={"Удалить предмет?"}/>
				<div className={styles.confirm}>
					<button onClick={handleModalSubmit}>Ок</button>
					<button onClick={handleCloseModal}>Отмена</button>
				</div>

			</div>
		</div>,
		modalRoot
	);

};

