import React, { useState } from "react";
import styles from "./Calculator.module.css";
import Button from "../Button/Button";

//all buttons from top-left to bottom-right
const buttonLabels = [
  //C/AC is handled separately
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
];

const Calculator = () => {
  const [prevValue, setPrevValue] = useState(0);
  const [operator, setOperator] = useState("");
  const [tempValue, setTempValue] = useState(0);

  const handleClick = (e) => {
    switch (e.target.value) {
      case "C":
        setTempValue(0);
        setOperator("");
        break;
      case "AC":
        setPrevValue(0);
        setOperator("");
        setTempValue(0);
        break;
      case "+/-":
        setTempValue(-tempValue);
        break;
      case "%":
        if (!operator) {
          setPrevValue(0);
          setOperator("");
          setTempValue(tempValue / 100);
        } else {
          setPrevValue(0);
          setOperator("");
          setTempValue(
            /* eslint-disable-next-line no-eval */
            eval(`${prevValue} ${operator} ${(tempValue * prevValue) / 100}`)
          );
        }
        break;
      case "/":
      case "*":
      case "-":
      case "+":
        if (!operator) {
          setPrevValue(tempValue);
          setTempValue(0);
        }
        setOperator(e.target.value);
        break;
      case ".":
        if (tempValue.toString().includes(".")) break;
        setTempValue(`${tempValue}.`);
        break;
      case "=":
        if (!operator) break;
        /* eslint-disable-next-line no-eval */
        setPrevValue(eval(`${prevValue} ${operator} ${tempValue}`));
        setOperator("");
        /* eslint-disable-next-line no-eval */
        setTempValue(eval(`${prevValue} ${operator} ${tempValue}`));
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        /* eslint-disable-next-line no-eval */
        setTempValue(eval(`${tempValue || ""}${e.target.value}`));
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles["temp-value"]}>
        {tempValue || prevValue}
        {operator === "." && "."}
      </div>
      {
        <Button
          key={tempValue || operator ? "C" : "AC"}
          label={tempValue || operator ? "C" : "AC"}
          handleClick={handleClick}
        />
      }
      {buttonLabels.map((buttonLabel) => (
        <Button
          key={buttonLabel}
          label={buttonLabel}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Calculator;
