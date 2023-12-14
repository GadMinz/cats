import React, { useState } from "react";
import s from "./MinMax.module.scss";
import { IFilterPrice } from "../../types.ts";
import Input from "../UI/Input.tsx";
import Button from "../UI/Button.tsx";

interface IMinMaxProps {
  onSubmit: (minMax: IFilterPrice) => void;
}
const MinMax: React.FC<IMinMaxProps> = ({ onSubmit }) => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const handleClick = () => {
    onSubmit({ min: Number(min), max: Number(max) });
  };
  return (
    <div className={s.minmax}>
      <Input type="number" placeholder="Min" value={min} onChange={setMin} />
      <Input type="number" placeholder="Max" value={max} onChange={setMax} />
      <Button text="Apply" handleClick={handleClick} />
    </div>
  );
};

export default MinMax;
