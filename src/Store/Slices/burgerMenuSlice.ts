import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialBurgerMenuStateType = {
	isOpen: false
}

export type InitialBurgerMenuStateType = {
	isOpen: boolean
}

const slice = createSlice({
	name: "burgerMenu",
	initialState: initialState,
	reducers: {
		setIsOpen(state, action: PayloadAction<{ value: boolean }>) {
			state.isOpen = action.payload.value
		},

	}
})

export const burgerMenuSlice = slice.reducer
export const {setIsOpen} = slice.actions
