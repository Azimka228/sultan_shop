export type DataType = Record<string, string|number| Array<string>>

export const getDataSearchByString = (data:Array<DataType>, getDataBy: string) => {
	const result: any = {}

	data.forEach((el) => {
		if (Array.isArray(el[getDataBy])) return
		// @ts-ignore
		if (result[el[getDataBy]] !== undefined) {
			// @ts-ignore
			result[el[getDataBy]] += 1
		} else {
			// @ts-ignore
			result[el[getDataBy]] = 1
		}
	});

	return result
}