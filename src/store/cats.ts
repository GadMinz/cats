import { create } from "zustand";
import { ICat, ICatResp } from "../types.ts";
import {getCats, getCatsCount} from "../api/cats.ts";
import { getRandomNumber } from "../functions/getRandomNumber.ts";

interface ICatsStore {
  cats: ICat[];
  count: number;
  isLoading: boolean;
  fetchCats: (limit: number, skip: number) => void;
}

export const useCatsStore = create<ICatsStore>((set) => ({
  cats: [],
  count: 0,
  isLoading: false,
  fetchCats: async (limit: number = 10, skip: number = 0) => {
    set({ isLoading: true });
    try {
      const [cats, catsCount] = await Promise.all([getCats(limit, skip), getCatsCount()])
      set({count: catsCount.data.count})
      const fixCatsData: ICat[] = [];
      cats.data.forEach((item: ICatResp) => {
        fixCatsData.push({
          id: item._id,
          img: `https://cataas.com/cat/${item._id}`,
          tags: [...item.tags],
          price: getRandomNumber(1, 10000),
        });
      });
      set({ cats: fixCatsData });
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
