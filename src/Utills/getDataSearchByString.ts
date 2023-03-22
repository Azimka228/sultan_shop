export type DataType = Record<string, string|number>

export const getDataSearchByString = (data:Array<DataType>, getDataBy: string) => {
	const result: any = {}

	data.forEach((el) => {
		if (result[el[getDataBy]] !== undefined) {
			result[el[getDataBy]] += 1
		} else {
			result[el[getDataBy]] = 1
		}
	});

	return result
}