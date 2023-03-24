import React, {FC, ReactElement, useState} from "react";
import openListLogo from '../../assets/openedList.svg'
import closedListLogo from '../../assets/closedList.svg'
import styles from './index.module.scss'

type CollapsibleDivPropsType = {
	title: string
	children: ReactElement
}

const CollapsibleDiv: FC<CollapsibleDivPropsType> = ({title, children}) => {
	const [isOpened, setIsOpened] = useState(false)
	const isOpenedImg = isOpened ?  openListLogo : closedListLogo
	const handleChangeIsOpened = () => {
		setIsOpened(!isOpened)
	}
	return (
		<div className={styles.main}>
			<div className={styles.title} onClick={handleChangeIsOpened}>{title} <img src={isOpenedImg} alt="isOpenedImg"/></div>
			{isOpened && children}
		</div>
	);
};

export default CollapsibleDiv;