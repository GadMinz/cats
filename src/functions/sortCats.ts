import { ICat } from "../types.ts";

type TDateName = "favoritesAt" | "cartAt";
export const sortCats = (items: ICat[], sort: string, dateName: TDateName = "favoritesAt"):ICat[] => {
  const newItems = [...items]
  switch (sort) {
    case "price":
      return newItems.sort((prevCat, cat) => prevCat.price - cat.price);
    case "-price":
      return newItems.sort((prevCat, cat) => cat.price - prevCat.price);
    case "date":
      return newItems.sort(
        (prevCat, cat) =>
          Number(cat[dateName]?.getTime()) -
          Number(prevCat[dateName]?.getTime()),
      );
    case "-date":
      return newItems.sort(
        (prevCat, cat) =>
          Number(prevCat[dateName]?.getTime()) -
          Number(cat[dateName]?.getTime()),
      );
    default:
      return items;
  }
};
