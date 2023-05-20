import { fireEvent, render, screen } from "@testing-library/react";
import Calculator from "./Calculator";

test("renders 0 for temp value", () => {
  const { container } = render(<Calculator />);
  expect(container.getElementsByClassName("temp-value")[0]).toHaveTextContent(
    "0"
  );
});

test("renders 19 buttons", () => {
  const { container } = render(<Calculator />);
  expect(container.getElementsByClassName("button").length).toEqual(19);
});

[
  "AC",
  "+/-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
].forEach((buttonLabel, index) =>
  test(`renders ${buttonLabel} button at position ${index}`, () => {
    const { container } = render(<Calculator />);
    expect(container.getElementsByClassName("button")[index]).toHaveTextContent(
      buttonLabel
    );
  })
);

test("renders C button when any temp value", () => {
  const { container } = render(<Calculator />);
  const button1 = screen.getByText("1");
  fireEvent.click(button1);
  expect(container.getElementsByClassName("button")[0]).toHaveTextContent("C");
});

test("renders AC button when the temp value is cleared", () => {
  const { container } = render(<Calculator />);
  const button1 = screen.getByText("1");
  fireEvent.click(button1);
  const buttonC = screen.getByText("C");
  fireEvent.click(buttonC);
  expect(container.getElementsByClassName("button")[0]).toHaveTextContent("AC");
});

test("renders correct temp value", () => {
  const { container } = render(<Calculator />);
  const button1 = screen.getByText("1");
  fireEvent.click(button1);
  expect(container.getElementsByClassName("temp-value")[0]).toHaveTextContent(
    "1"
  );
});

test("performs addition correctly", () => {
  const { container } = render(<Calculator />);
  const button1 = screen.getByText("1");
  fireEvent.click(button1);
  const buttonPlus = screen.getByText("+");
  fireEvent.click(buttonPlus);
  const button2 = screen.getByText("2");
  fireEvent.click(button2);
  const buttonEquals = screen.getByText("=");
  fireEvent.click(buttonEquals);
  expect(container.getElementsByClassName("temp-value")[0]).toHaveTextContent(
    "3"
  );
});

test("performs subtraction correctly", () => {
  const { container } = render(<Calculator />);
  const button1 = screen.getByText("1");
  fireEvent.click(button1);
  const buttonMinus = screen.getByText("-");
  fireEvent.click(buttonMinus);
  const button2 = screen.getByText("2");
  fireEvent.click(button2);
  const buttonEquals = screen.getByText("=");
  fireEvent.click(buttonEquals);
  expect(container.getElementsByClassName("temp-value")[0]).toHaveTextContent(
    "-1"
  );
});

test("performs multiplication correctly", () => {
  const { container } = render(<Calculator />);
  const button2 = screen.getByText("2");
  fireEvent.click(button2);
  const buttonStar = screen.getByText("*");
  fireEvent.click(buttonStar);
  const button4 = screen.getByText("4");
  fireEvent.click(button4);
  const buttonEquals = screen.getByText("=");
  fireEvent.click(buttonEquals);
  expect(container.getElementsByClassName("temp-value")[0]).toHaveTextContent(
    "8"
  );
});

test("performs division correctly", () => {
  const { container } = render(<Calculator />);
  const button2 = screen.getByText("2");
  fireEvent.click(button2);
  const buttonSlash = screen.getByText("/");
  fireEvent.click(buttonSlash);
  const button4 = screen.getByText("4");
  fireEvent.click(button4);
  const buttonEquals = screen.getByText("=");
  fireEvent.click(buttonEquals);
  expect(container.getElementsByClassName("temp-value")[0]).toHaveTextContent(
    "0.5"
  );
});

test("performs sign switch correctly", () => {
  const { container } = render(<Calculator />);
  const button1 = screen.getByText("1");
  fireEvent.click(button1);
  const buttonPlusMinus = screen.getByText("+/-");
  fireEvent.click(buttonPlusMinus);
  expect(container.getElementsByClassName("temp-value")[0]).toHaveTextContent(
    "-1"
  );
});

test("performs percentage calculation correctly in isolation", () => {
  const { container } = render(<Calculator />);
  const button1 = screen.getByText("1");
  fireEvent.click(button1);
  const buttonPercent = screen.getByText("%");
  fireEvent.click(buttonPercent);
  expect(container.getElementsByClassName("temp-value")[0]).toHaveTextContent(
    "0.01"
  );
});

test("performs percentage calculation correctly in an expression", () => {
  const { container } = render(<Calculator />);
  const button1 = screen.getByText("1");
  fireEvent.click(button1);
  const button0 = screen.getByText("0");
  fireEvent.click(button0);
  fireEvent.click(button0);
  const buttonPlus = screen.getByText("+");
  fireEvent.click(buttonPlus);
  const button5 = screen.getByText("5");
  fireEvent.click(button5);
  const buttonPercent = screen.getByText("%");
  fireEvent.click(buttonPercent);
  expect(container.getElementsByClassName("temp-value")[0]).toHaveTextContent(
    "105"
  );
});

test("performs decimal point calculation correctly", () => {
  const { container } = render(<Calculator />);
  const button1 = screen.getByText("1");
  fireEvent.click(button1);
  const buttonDecimal = screen.getByText(".");
  fireEvent.click(buttonDecimal);
  const button2 = screen.getByText("2");
  fireEvent.click(button2);
  const buttonPlus = screen.getByText("+");
  fireEvent.click(buttonPlus);
  const button3 = screen.getByText("3");
  fireEvent.click(button3);
  fireEvent.click(buttonDecimal);
  const button4 = screen.getByText("4");
  fireEvent.click(button4);
  const buttonEquals = screen.getByText("=");
  fireEvent.click(buttonEquals);
  expect(container.getElementsByClassName("temp-value")[0]).toHaveTextContent(
    "4.6"
  );
});
