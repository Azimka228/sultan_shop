import React, {FC, useEffect} from "react";
import styles from "./index.module.scss"
import ReactDOM from "react-dom";
import succsesLogo from "./succses.svg"
import closeLogo from "../close.svg"
import {modalRoot} from "../../../index";
import {DefaultCustomTitle} from "../../DefaultCustomTitle/defaultCustomTitle";

type ModalWindowPropsType = {
	isOpen: boolean
	toggle: (e: boolean) => void;
}

export const SuccsesPurchaseModal: FC<ModalWindowPropsType> = ({isOpen, toggle}) => {

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

	if (!isOpen) return null
	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={handleCloseModal}>
			<div className={styles.box} onClick={handleStopProg}>
				<div className={styles.closeBTN}>
					<button onClick={handleCloseModal}><img src={closeLogo} alt="closeLogo"/></button>
				</div>
				<div className={styles.logo}>
					<img src={succsesLogo} alt="succsesLogo"/>
				</div>

				<div className={styles.title}><DefaultCustomTitle text={"Спасибо за заказ"}/></div>
				<div className={styles.description}>Наш менеджер свяжется с вами в ближайшее время</div>
			</div>
		</div>,
		modalRoot
	);

};

