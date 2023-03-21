import React, {FC, useState} from "react";
import searchIcon from './search.svg'
import styles from './index.module.scss'

type CustomInputPropsType = {
	width: number,
	InputSubmit: (inputValue: string) => void
}

export const CustomInput:FC<CustomInputPropsType> = ({
																																																						width,
																																																						InputSubmit
																																																					}) => {
	const [inputValue, setInputValue] = useState<string>('')
	const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}
	const handleInputSubmit = () => {
		if (inputValue.length > 0) {
			InputSubmit(inputValue)
		}
	}
	return (
		<div style={{width: `${width}px`}} className={styles.main}>
			<input type="text" placeholder="Поиск..." value={inputValue} onChange={handleInputValueChange}/>
			<button onClick={handleInputSubmit}><img src={searchIcon} alt="searchIcon"/></button>
		</div>
	);
};

