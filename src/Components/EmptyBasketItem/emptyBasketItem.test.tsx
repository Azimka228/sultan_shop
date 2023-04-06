import {render, screen} from "@testing-library/react";
import {EmptyBasketItem} from "./emptyBasketItem";

test("Empty basket should render correct value", () => {
render(<EmptyBasketItem/>)
	const Text = screen.getByText(/Корзина пуста/i);
	expect(Text).toBeInTheDocument();
})
