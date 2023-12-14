import React from "react";
import logo from "../../../assets/img/logo.svg";
import s from "./Header.module.scss";
import HeaderToolsItem from "./HeaderToolsItem.tsx";
import { Link } from "react-router-dom";
import { useCartStore } from "../../../store/cart.ts";
import { useFavoritesStore } from "../../../store/favorites.ts";

const HeaderTools = [
  { id: "favorites", icon: "like", link: "/favorites" },
  { id: "cart", icon: "cart", link: "/cart" },
];
const Header: React.FC = () => {
  const countCart = useCartStore((state) => state.count);
  const countFavorites = useFavoritesStore((state) => state.count);
  const getCount = (id: string) => {
    switch (id) {
      case "cart":
        return countCart;
      case "favorites":
        return countFavorites;
      default:
        return 0;
    }
  };
  return (
    <header className={s.header}>
      <Link to="/" className={s.header__logo}>
        <img src={logo} alt="" />
      </Link>
      <Link to='/special' className={s.header__special}>Special</Link>
      <div className={s.header__tools}>
        {HeaderTools.map((item) => (
          <Link to={item.link} key={item.id}>
            <HeaderToolsItem icon={item.icon} count={getCount(item.id)} />
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
