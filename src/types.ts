export interface ICat {
  id: string;
  img: string;
  tags: string[];
  price: number;
  favoritesAt?: Date,
  cartAt?: Date,
}
export interface ICatResp {
  _id: string;
  mimetype: string;
  size: number;
  tags: string[];
}

export type TSort = "price" | "-price" | "date" | "-date";

export interface ISelectItem {
  id: string;
  title: string;
}

export interface IFilters {
  price: IFilterPrice
}
export interface IFilterPrice {
  min: number;
  max: number
}

