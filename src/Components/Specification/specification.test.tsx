import {render, screen} from "@testing-library/react";
import Specification, {SpecificationItem} from "./specification";

const currentItemSpecification: Array<SpecificationItem> = [
	{title: "Производитель", text: "static"},
	{title: "Бренд", text: "static"},
	{title: "Артикул", text: "static"},
	{title: "Штрихкод", text: "static"},
	{title: "Вес коробки", text: "static"},
	{title: "Тип ухода", text: "static"},
]

test("Specification should render correct value", () => {
	render(<Specification data={currentItemSpecification}/>)

	expect(screen.getByText(/Производитель/i)).toBeInTheDocument()
	expect(screen.getByText(/Производитель/i)).toMatchSnapshot()
})