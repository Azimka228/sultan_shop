import React, {ChangeEvent, FC, FormEvent, useEffect} from "react";
import {ProductDataType} from "../../Store/Slices/productListSlice";
import {v4 as generateId} from "uuid";
import styles from "./index.module.scss"
import {uploadImg} from "../../Utills/uploadImg";
import uploadImgLogo from "./uploadImg.png"
import {itemVolumeLiquidType, itemWeightType} from "../../Store/Slices/productListFilterSlice";

type  AddAdminDataItemPropsType = {
	onSubmit: (e: ProductDataType) => void
	data?: ProductDataType
}
type ItemTypeSizeType = itemWeightType | itemVolumeLiquidType

const itemTypeSize = ["кг", "г", "мг", "мл", "л"] as Array<ItemTypeSizeType>

const initialState:InitialStateType = {
	title: "",
	typeSize: "кг",
	size: 0,
	manufacturer: "",
	url: "",
	description: "",
	brand: "",
	price: 0,
	itemType: ""
}

type InitialStateType = {
	title: string,
	typeSize: ItemTypeSizeType,
	size: number,
	manufacturer: string,
	url: string,
	description: string,
	brand: string,
	price:number,
	itemType: string
}



export const AdminDataItemForm: FC<AddAdminDataItemPropsType> = ({onSubmit, data}) => {
	useEffect(() => {
		if (data) {
			const currentItemType = data.itemType.join(", ")
			const newObj: typeof initialState = {
				title: data.title,
				typeSize: data.typeSize,
				size: data.size,
				manufacturer: data.manufacturer,
				url: data.url,
				description: data.description,
				brand: data.brand,
				price: data.price,
				itemType: currentItemType
			}

			setForm(newObj)
		}

	}, [data])

	const [form, setForm] = React.useState<InitialStateType>({
		title: "",
		typeSize: "кг",
		size: 0,
		manufacturer: "",
		url: "",
		description: "",
		brand: "",
		price: 0,
		itemType: ""
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

		switch (event.target.id) {
			case "url" : {
				uploadImg(event, (value) =>
					setForm({
						...form,
						url: value,
					}))
				break;
			}
			case "price":
			case "size": {
				setForm({
					...form,
					[event.target.id]: (parseInt(event.target.value, 10)),
				});
				break;
			}
			default: {
				setForm({
					...form,
					[event.target.id]: event.target.value,
				});
				break;
			}
		}
	}
	const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		switch (event.target.id) {
			case "typeSize": {
				setForm({
					...form,
					[event.target.id as keyof InitialStateType]: event.target.value,
				});
				break;
			}
			default: {
				setForm({
					...form,
					[event.target.id]: event.target.value,
				});
				break;
			}
		}
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		const currentItemType = form.itemType.split(",").map(el => el.trim().replace(/ +/g, " "))
		e.preventDefault()
		if (data) {
			onSubmit({
				id: data.id,
				itemType: currentItemType,
				url: form.url,
				title: form.title,
				typeSize: form.typeSize,
				size: Number(parseInt(String(form.size), 10)),
				barcode: data.barcode,
				manufacturer: form.manufacturer,
				brand: form.brand,
				description: form.description,
				price: form.price,
				currencyType: "₸",
			})
		} else {
			const randomBarcode = Math.ceil(Math.random() * 10000000)
			onSubmit({
				id: generateId(),
				itemType: currentItemType,
				url: form.url,
				title: form.title,
				typeSize: form.typeSize,
				size: Number(parseInt(String(form.size), 10)),
				barcode: "460404" + `${randomBarcode}`,
				manufacturer: form.manufacturer,
				brand: form.brand,
				description: form.description,
				price: form.price,
				currencyType: "₸",
			})
		}

		setForm(initialState)
	}

	const buttonText = data ? "Подтвердить" : "+"
	const itemTypeSizeSelectOptions = itemTypeSize.map((el, index) => {
		let defaultItemSelected
		defaultItemSelected = !!(data && data.typeSize === el);
	return	<option value={el} selected={defaultItemSelected}>{el}</option>
	})
	return (
		<form onSubmit={handleSubmit} className={styles.main}>

			<label htmlFor="itemType">
				itemType:
				<input
					type="text"
					id="itemType"
					placeholder="Слова разделяются по запятой..."
					value={form.itemType}
					onChange={handleChange}
					required
				/>
			</label>
			<label htmlFor="title">
				title:
				<input
					type="text"
					id="title"
					placeholder="any title..."
					value={form.title}
					onChange={handleChange}
					required
				/>
			</label>
			<label>
				Item Size:
				<select name="typeSize" id="typeSize" onChange={handleChangeSelect}>
					{itemTypeSizeSelectOptions}
				</select>
			</label>
			<label htmlFor="size">
				size:
				<input
					type="number"
					min={0}
					id="size"
					value={form.size}
					onChange={handleChange}
					required
				/>
			</label>
			<label htmlFor="manufacturer">
				manufacturer:
				<input
					type="text"
					id="manufacturer"
					placeholder="any text..."
					value={form.manufacturer}
					onChange={handleChange}
					required
				/>
			</label>
			<label htmlFor="brand">
				brand:
				<input
					type="text"
					id="brand"
					placeholder="any text..."
					value={form.brand}
					onChange={handleChange}
					required
				/>
			</label>
			<label htmlFor="description">
				description:
				<input
					type="text"
					id="description"
					placeholder="any text..."
					value={form.description}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor="description">
				price:
				<input
					type="number"
					min={0}
					id="price"
					placeholder="any text..."
					value={form.price}
					onChange={handleChange}
				/>
			</label>
			<div className={styles.currentImg}>
				{form.url.length > 1 ?? data ?
					<img src={form.url} alt="img"/> :
					"Current Img"
				}
			</div>
			<label htmlFor="url" className={styles.inputFileLabel}>
				<img src={uploadImgLogo} alt="uploadImgLogo"/>
				Choose a photo...
				<input
					type="file"
					id="url"
					className={styles.inputFile}
					onChange={(e) => handleChange(e)}
				/>
			</label>
			<button className={styles.submit}>{buttonText}</button>
		</form>
	);
};

export default AdminDataItemForm;