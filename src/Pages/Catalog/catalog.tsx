import React from "react";
import {useAppSelector} from "../../Store/hooks/useAppSelector";
import wrapper from "../../Styles/wrapper.module.scss";
import styles from "./index.module.scss"
import {Link} from "react-router-dom";
import {AppLinks} from "../../Routes/links";
import {DefaultCustomTitle} from "../../Components/DefaultCustomTitle/defaultCustomTitle";
import {CardItem} from "../../Components/CardItem/cardItem";
import FilterByPrice from "../../Components/FilterByNumber/filterByPrice";
import {FilterByString} from "../../Components/FilterByString/filterByString";
import {getDataSearchByString} from "../../Utills/getDataSearchByString";

const Catalog = () => {
	const items = useAppSelector((state) => state.productList.productsList)
	const itemTypesFiltred = new Set()
	items.forEach((el) => (itemTypesFiltred.add(el.itemType)))
	let itemTypesFiltredArr = (Array.from(itemTypesFiltred)) as string[]

	const handleDisablePageNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
	}
	const productCardItems = items.map(el => (<CardItem data={el}/>))
	const typeCardItems = itemTypesFiltredArr.map((el) => (<div className={styles.typeCards__item}>{el}</div>))

	const itemsByManufacturer = getDataSearchByString(items,'manufacturer')
	const itemsByBrand = getDataSearchByString(items,'brand')
	return (
		<div className={styles.main}>
			<div className={wrapper.wrapper}>
				<div className={styles.navigate}>
					<div className={styles.navigate__item}>
						<Link to={AppLinks.home}>Главная</Link>
					</div>
					<div className={styles.navigate__item}>
						<Link to={AppLinks.catalog} onClick={handleDisablePageNavigation}
												className={styles.navigate__item_disabled}>Каталог</Link>
					</div>
				</div>
				<div className={styles.header}>
					<DefaultCustomTitle text={"Косметика и гигиена"}/>
					<div>Сортировка</div>
				</div>
				<div className={styles.typeCards}>
					{typeCardItems}
				</div>
				<div className={styles.catalogGroup}>
					<div className={styles.filterPanel}>
						<div>ПОДБОР ПО ПАРАМЕТРАМ</div>
						<div>Цена <b>₸</b></div>
						<FilterByPrice/>
						<FilterByString data={itemsByManufacturer} title={"Производитель"}/>
						<FilterByString data={itemsByBrand} title={"Бренд"}/>
					</div>
					<div>
						<div className={styles.cards}>
							{productCardItems}
						</div>
						<div>pagination</div>
						<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis
							iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed
							pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim,
							malesuada.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Catalog;