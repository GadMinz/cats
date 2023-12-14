import { create } from "zustand";
import {ICat, IFilterPrice, IFilters} from "../types.ts";

interface IFavoritesStore {
  cats: ICat[];
  count: number;
  sort: string;
  addFavorites: (cat: ICat) => void;
  deleteFavorites: (id: string) => void;
  updateFavoritesInfo: () => void;
  setSort: (sort: string) => void;
  filter: IFilters
  setFilterPrice: (minMax: IFilterPrice) => void;
}

export const useFavoritesStore = create<IFavoritesStore>((set, get) => ({
  cats: [],
  count: 0,
  sort: "-date",
  filter: {
    price: { min: 0, max: 0 },
  },
  addFavorites: (cat) => {
    const { cats } = get();
    const newCat: ICat = { ...cat, favoritesAt: new Date() };
    set({ cats: [...cats, newCat] });
    get().updateFavoritesInfo();
  },
  deleteFavorites: (id: string) => {
    const newCats = get().cats.filter((cat) => id !== cat.id);
    set({ cats: newCats });
    get().updateFavoritesInfo();
  },
  updateFavoritesInfo: () => {
    const { cats } = get();
    set({ count: cats.length });
  },
  setSort: (sort) => {
    set({ sort: sort });
  },
  setFilterPrice: (minMax: IFilterPrice) => {
    set({ filter: { ...get().filter, price: minMax } });
  },
}));
