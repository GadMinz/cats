import { create } from "zustand";
import { ICat, IFilterPrice, IFilters } from "../types.ts";

interface ICartStore {
  cats: ICat[];
  count: number;
  totalPrice: number;
  discount: number;
  sort: string;
  addCart: (cat: ICat) => void;
  deleteCart: (id: string) => void;
  updateCartInfo: () => void;
  setSort: (sort: string) => void;
  filter: IFilters;
  setFilterPrice: (minMax: IFilterPrice) => void;
}
function calculateDiscount(price: number): number {
  const maxDiscount = 0.2; // Максимальная скидка 20%
  const maxPrice = 100000; // Цена для максимальной скидки
  if (price >= maxPrice) {
    return maxDiscount;
  }
  let discount: number = (price / maxPrice) * maxDiscount;
  discount = Math.floor(discount * 100) / 100;
  return +discount.toFixed(2);
}
export const useCartStore = create<ICartStore>((set, get) => ({
  cats: [],
  count: 0,
  totalPrice: 0,
  discount: 0,
  sort: "-date",
  filter: {
    price: {
      min: 0,
      max: 0,
    },
  },
  addCart: (cat) => {
    const { cats } = get();
    const newCat: ICat = { ...cat, cartAt: new Date() };
    set({
      cats: [...cats, newCat],
    });
    get().updateCartInfo();
  },
  deleteCart: (id: string) => {
    const { cats } = get();
    const newCats = cats.filter((cat) => id !== cat.id);
    set({ cats: newCats });
    get().updateCartInfo();
  },
  updateCartInfo: () => {
    const { cats } = get();
    const newTotalPrice = cats.reduce((total, cat) => cat.price + total, 0);
    set({
      count: cats.length,
      totalPrice: newTotalPrice,
      discount: calculateDiscount(newTotalPrice),
    });
  },
  setSort: (sort) => {
    set({ sort: sort });
  },
  setFilterPrice: (minMax: IFilterPrice) => {
    set({ filter: { ...get().filter, price: minMax } });
  },
}));
