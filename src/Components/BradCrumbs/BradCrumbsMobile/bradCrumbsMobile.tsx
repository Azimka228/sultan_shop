import React, {FC} from "react";
import {BradCrumbsPathType} from "../bradCrumbs";
import {Link} from "react-router-dom";
import bradCrumbsLogo from "../../../assets/bradCrumbsArrow.svg";
import styles from './index.module.scss'

type BradCrumbsMobilePropsType = {
	data: BradCrumbsPathType
}

const BradCrumbsMobile:FC<BradCrumbsMobilePropsType> = ({data}) => {
	return (
		<div className={styles.main}>
			<Link to={data.to}>
				<div><img src={bradCrumbsLogo} alt="bradCrumbsLogo"/></div>
				{data.title}
			</Link>
		</div>
	);
};

export default BradCrumbsMobile;