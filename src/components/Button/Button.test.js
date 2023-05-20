import { fireEvent, render } from "@testing-library/react";
import Button from "./Button";

test("label is rendered", () => {
  const label = "test label";
  const { container } = render(<Button label={label} />);
  const button = container.getElementsByClassName("button")[0];
  expect(button).toHaveTextContent(label);
  expect(button).toHaveValue(label);
});

test("handleClick is executed on click", () => {
  const handleClick = jest.fn();
  const { container } = render(<Button handleClick={handleClick} />);
  const button = container.getElementsByClassName("button")[0];
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
