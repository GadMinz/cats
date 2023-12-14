import React, { useEffect, useState } from "react";
import s from "./Cart.module.scss";
import { useCartStore } from "../../store/cart.ts";
import Cats from "../../components/Cats/Cats.tsx";
import Select from "../../components/Select/Select.tsx";
import { ISelectItem } from "../../types.ts";
import { sortCats } from "../../functions/sortCats.ts";
import MinMax from "../../components/MinMax/MinMax.tsx";
import {filterPrice} from "../../functions/filterCats.ts";

const sortCart: ISelectItem[] = [
  { id: "-date", title: "date(desc)" },
  { id: "date", title: "date(asc)" },
  { id: "price", title: "price(asc)" },
  { id: "-price", title: "price(desc)" },
];

const Cart: React.FC = () => {
  const [cats, totalPrice, discount, sort, setSort, filter, setFilterPrice] =
    useCartStore((state) => [
      state.cats,
      state.totalPrice,
      state.discount,
      state.sort,
      state.setSort,
      state.filter,
      state.setFilterPrice,
    ]);
  const [filteredCats, setFilteredCats] = useState(cats);

  useEffect(() => {
    setFilteredCats(sortCats(filterPrice(cats, filter.price.min, filter.price.max), sort, "cartAt"));
  }, [cats, sort, filter.price]);
  const render = () => {
    if (cats.length === 0) {
      return <div style={{ textAlign: "center" }}>Cart is empty</div>;
    }
    return (
      <div className={s.cart}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            gap: "20px",
          }}
        >
          <MinMax onSubmit={setFilterPrice} />
          <Select items={sortCart} onSelect={setSort} />
        </div>
        <Cats cats={filteredCats} />
        <div className={s.cart_price}>
          <div>Total:&nbsp;</div>
          {discount > 0 && (
            <div className={s.cart_price_new}>
              {Math.ceil(totalPrice - totalPrice * discount)}$
            </div>
          )}
          <div
            className={`${s.cart_price_total} ${
              discount > 0 ? s.cart_price_old : ""
            }`}
          >
            {totalPrice}$
          </div>
        </div>
      </div>
    );
  };
  return render();
};

export default Cart;
