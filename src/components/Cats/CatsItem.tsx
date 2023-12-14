import React, { useEffect, useState } from "react";
import s from "./Cats.module.scss";
import { ICat } from "../../types.ts";
import GlobalSvgSelector from "../../assets/icons/GlobalSvgSelector.tsx";
import { useFavoritesStore } from "../../store/favorites.ts";
import { useCartStore } from "../../store/cart.ts";
import { useModalStore } from "../../store/modal.ts";

interface CatsItemProps {
  cat: ICat;
}
const CatsItem: React.FC<CatsItemProps> = ({ cat }) => {
  const { id, img, tags, price } = cat;
  const [favorites, addFavoritres, deleteFavorites] = useFavoritesStore(
    (state) => [state.cats, state.addFavorites, state.deleteFavorites],
  );
  const [cart, addCart, deleteCart] = useCartStore((state) => [
    state.cats,
    state.addCart,
    state.deleteCart,
  ]);
  const openModal = useModalStore((state) => state.openModal);
  const [isFavorites, setIsFavorites] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const handleClick = () => {
    openModal('cat',{img, tags})
  };
  const favoritesHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorites) {
      deleteFavorites(id);
    } else {
      addFavoritres(cat);
    }
  };
  const cartHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCart) {
      deleteCart(id);
    } else {
      addCart(cat);
    }
  };
  useEffect(() => {
    if (favorites.some((item) => item.id === id)) {
      setIsFavorites(true);
      return;
    }
    setIsFavorites(false);
  }, [favorites]);
  useEffect(() => {
    if (cart.some((item) => item.id === id)) {
      setIsCart(true);
      return;
    }
    setIsCart(false);
  }, [cart]);
  return (
    <div className={s.cats__item} onClick={handleClick}>
      <img src={img} alt="" loading="lazy" />
      <span className={s.price}>{price} $</span>
      <button
        className={`${s.like} ${isFavorites && s.active}`}
        onClick={favoritesHandler}
      >
        <GlobalSvgSelector id="like" />
      </button>
      <button
        className={`${s.cart} ${isCart && s.active}`}
        onClick={cartHandler}
      >
        <GlobalSvgSelector id="cart" />
      </button>
    </div>
  );
};

export default CatsItem;
