import React from "react";
import s from "./UI.module.scss";

interface IInputProps {
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}
const Input: React.FC<IInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
}) => {
  return (
    <input
      className={s.input}
      type={type}
      placeholder={placeholder}
      min={0}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
