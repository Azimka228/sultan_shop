import React from "react";
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../Store/hooks/useAppSelector";
import wrapper from "../../Styles/wrapper.module.scss";
import breadCrumbs from "../../Styles/breadCrumbs.module.scss";
import {AppLinks} from "../../Routes/links";

const СardProduct = () => {
	let { barcode } = useParams()
	const productsList = useAppSelector((state) => state.productList.productsList)
	const currentItem = productsList?.find((el) => (el.barcode === barcode))

	const handleDisablePageNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
	}
	return (
		<div>
			<div className={wrapper.wrapper}>
				<div className={breadCrumbs.navigate}>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.home}>Главная</Link>
					</div>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.catalog}>Каталог</Link>
					</div>
					<div className={breadCrumbs.navigate__item}>
						<Link to={AppLinks.catalog + `/${barcode}`} onClick={handleDisablePageNavigation}
												className={breadCrumbs.navigate__item_disabled}>{currentItem?.title}</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default СardProduct;