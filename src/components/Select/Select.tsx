import React, { useEffect, useState } from "react";
import s from "./Select.module.scss";
import SelectItem from "./SelectItem.tsx";
import { ISelectItem } from "../../types.ts";

interface ISelectProps {
  items: ISelectItem[];
  onSelect: (id: string) => void;
}

const Select: React.FC<ISelectProps> = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(items[0]);
  useEffect(() => {
    if (items.length === 0) {
      setActiveItem({ id: "", title: "" });
    }
    setActiveItem(items[0]);
  }, [items]);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClick = (item: ISelectItem) => {
    setActiveItem(item || items[0]);
    toggleOpen();
    onSelect(item.id);
  };
  return (
    <div className={s.select}>
      <div className={s.select_active_item} onClick={toggleOpen}>
        {activeItem?.title}
      </div>
      {isOpen && (
        <ul className={s.select_list}>
          {items.map((item) => (
            <SelectItem
              item={item}
              key={item.id}
              onSelect={handleClick}
              isActive={item.id === activeItem.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
