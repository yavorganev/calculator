import React from "react";
import styles from "./Button.module.css";

const Button = ({ label, handleClick }) => {
  const className = [styles.button, styles[`button-${label}`]].join(" ");

  return (
    <button className={className} onClick={handleClick} value={label}>
      {label}
    </button>
  );
};

export default Button;
