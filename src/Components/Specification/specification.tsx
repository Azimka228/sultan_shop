import React, {FC} from "react";
import styles from "./index.module.scss";

type SpecificationPropsType = {
	data: Array<SpecificationItem>
}
export type SpecificationItem = {
	title: string
	text: string
}

const Specification: FC<SpecificationPropsType> = ({data}) => {
	const Items = data.map(el => <p key={el.title}>{el.title}: <span>{el.text}</span></p>)
	return (
		<div className={styles.specification}>
			{Items}
		</div>
	);
};

export default Specification;