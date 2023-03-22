import React, {FC} from "react";
import styles from './index.module.scss'

type DefaultCustomTitlePropsType = {
	text: string
}

export const DefaultCustomTitle: FC<DefaultCustomTitlePropsType> = ({text}) => {
	return (
		<div className={styles.main}>
			{text}
		</div>
	);
};

