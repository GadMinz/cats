import React from "react";
import s from "./Select.module.scss";
import { ISelectItem } from "../../types.ts";
interface ISelectItemProps {
  item: ISelectItem;
  onSelect: (item: ISelectItem) => void;
  isActive?: boolean;
}

const SelectItem: React.FC<ISelectItemProps> = ({
  item,
  onSelect,
  isActive,
}) => {
  return (
    <li
      onClick={() => onSelect(item)}
      className={`${s.select_list_item} ${isActive ? s.active : ""}`}
    >
      {item.title}
    </li>
  );
};

export default SelectItem;
