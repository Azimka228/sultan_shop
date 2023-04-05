import {render, screen} from "@testing-library/react";
import {EmptyBasketItem} from "./emptyBasketItem";

test("Default SortBy should return correct value", () => {
render(<EmptyBasketItem/>)
	const Text = screen.getByText(/Корзина пуста/i);
	expect(Text).toBeInTheDocument();
})
