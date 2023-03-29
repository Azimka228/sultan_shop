export const defaultFilterSortBy = (value: string) => {
	switch (value) {
		case "дешевые" : {
			return "price-asc"
		}
		case "дорогие" : {
			return "price-desc"
		}
		case "по названию A-Z" : {
			return "title-asc"
		}
		case "по названию Z-A" : {
			return "title-desc"
		}
		default: {
			return "price-asc"
		}
	}

}