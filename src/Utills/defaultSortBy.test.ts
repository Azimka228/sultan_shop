import {defaultSortBy} from "./defaultSortBy";

test("Default SortBy should return correct value", () => {
	expect(defaultSortBy("price-asc")).toBe("дешевые")
	expect(defaultSortBy("price-desc")).toBe("дорогие")
	expect(defaultSortBy("title-asc")).toBe("по названию A-Z")
	expect(defaultSortBy("title-desc")).toBe("по названию Z-A")
	expect(defaultSortBy("dsadsadsadsa")).toBe("дешевые")
})
