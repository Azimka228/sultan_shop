export const defaultSortBy = (value: string) => {
	switch (value) {
		case "price-asc" : {
			return "дешевые" as const
		}
		case "price-desc" : {
			return "дорогие" as const
		}
		case "title-asc" : {
			return "по названию A-Z" as const
		}
		case "title-desc" : {
			return "по названию Z-A" as const
		}
		default : {
			return "дешевые" as const
		}
	}

}
