import React, {FC} from "react";
import styles from "./index.module.scss"
import arrowLeftLogo from "../../assets/arrowLeft.svg";
import arrowRightLogo from "../../assets/arrowRight.svg";

type PaginationPropsType = {
	currentPage: number
	countPerPage: number
	totalCountItems: number
	onSetPage: (value: number) => void
}

const Pagination: FC<PaginationPropsType> = ({currentPage, countPerPage, totalCountItems, onSetPage}) => {
	const countItems = Math.ceil(totalCountItems / countPerPage)
	const Pages = Array(countItems).fill(0).map((e, i) => i + 1)

	const handleSetPage = (page:number) => {
		onSetPage(page)
	}
	const handleSetPrevPage = () => {
		if ((currentPage - 1) < 1) return
		onSetPage(currentPage - 1)
	}
	const handleSetNextPage = () => {
		if ((currentPage + 1) > countItems) return
		onSetPage(currentPage + 1)
	}

	const mappedPages = Pages.map(el => {
		if (el === currentPage) return <div className={styles.pagination__item_selected}>{el}</div>
		return <div onClick={()=>handleSetPage(el)}>{el}</div>
	})

	return (
		<div className={styles.pagination}>
			<button className={styles.pagination__arrowLeft} onClick={handleSetPrevPage}><img src={arrowLeftLogo} alt="arrowLeftLogo"/></button>
			<div className={styles.pagination__items}>
				{mappedPages}
			</div>
			<button className={styles.pagination__arrowRight} onClick={handleSetNextPage}><img src={arrowRightLogo} alt="arrowRightLogo"/></button>
		</div>
	);
};

export default Pagination;