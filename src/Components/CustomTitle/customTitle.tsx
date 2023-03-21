import React, {FC} from "react";
import styles from './index.module.scss'

type CustomTitlePropsType = {
	text: string
}

export const CustomTitle:FC<CustomTitlePropsType> = ({text}) => {
	const [firstWord,secondWord] = text.split(' ')
	return (
		<div className={styles.main}>
			<span>{firstWord} </span>
			<span>{secondWord}</span>
		</div>
	);
};

