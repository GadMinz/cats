import React from "react";
import s from "./UI.module.scss";

interface IInputProps {
  text: string;
  handleClick: () => void;
}
const Button: React.FC<IInputProps> = ({ text, handleClick }) => {
  return (
    <button className={s.button} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
