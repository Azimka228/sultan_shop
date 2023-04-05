import {burgerMenuSlice, InitialBurgerMenuStateType, setIsOpen} from "./burgerMenuSlice";

test("should burgerMenuSlice status is open changed to true", () => {
	const previousState: InitialBurgerMenuStateType = {
		isOpen: false
	}

	expect(burgerMenuSlice(previousState, setIsOpen({value: true}))).toEqual({isOpen: true})
})

test("should burgerMenuSlice status is open changed to false", () => {
	const previousState: InitialBurgerMenuStateType = {
		isOpen: true
	}

	expect(burgerMenuSlice(previousState, setIsOpen({value: false}))).toEqual({isOpen: false})
})