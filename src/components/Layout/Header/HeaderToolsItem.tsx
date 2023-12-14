import React from "react";
import s from "./Header.module.scss";
import GlobalSvgSelector from "../../../assets/icons/GlobalSvgSelector.tsx";
interface HeaderToolsItemProps {
  icon: string;
  count?: number;
}
const Header: React.FC<HeaderToolsItemProps> = ({ icon, count }) => {
  return (
    <div className={s.header__tools_item}>
      <GlobalSvgSelector id={icon} />
      {!!count && <span className={s.header__tools_item_count}>{count}</span>}
    </div>
  );
};

export default Header;
