import { ICat } from "../types.ts";

export const filterPrice = (
  items: ICat[],
  min: number = 0,
  max: number = 0,
) => {
  if (max === 0) {
    max = Infinity;
  }
  if (max < 0 || max < min) return items;
  return items.filter((cat) => cat.price >= min && cat.price <= max);
};
