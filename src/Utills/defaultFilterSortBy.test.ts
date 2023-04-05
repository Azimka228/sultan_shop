import {defaultFilterSortBy} from "./defaultFilterSortBy";

test("Default Filter SortBy should return correct value", () => {
	expect(defaultFilterSortBy("дешевые")).toBe("price-asc")
	expect(defaultFilterSortBy("дорогие")).toBe("price-desc")
	expect(defaultFilterSortBy("по названию A-Z")).toBe("title-asc")
	expect(defaultFilterSortBy("по названию Z-A")).toBe("title-desc")
	expect(defaultFilterSortBy("something")).toBe("price-asc")
})
