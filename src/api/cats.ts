import axios from "axios";
import {ICat} from "../types.ts";

const baseUrl = "https://cataas.com/";

export const getCats = async (limit: number = 10, skip: number = 0) => {
  return await axios.get(`${baseUrl}api/cats?limit=${limit}&skip=${skip}`);
};
export const getCatsCount = async () => {
  return await axios.get(`${baseUrl}api/count`);
};

export const getTags = async () => {
  const { data } = await getCats(30, 0);
  const uniqueTags:Set<string> = new Set();
  data.forEach((item:ICat) => {
    item.tags.forEach((tag:string) => {
      uniqueTags.add(tag);
    });
  });

  return Array.from(uniqueTags);
};

export const getCatTagSays = (tag: string, text: string) => {
  return `${baseUrl}cat/${tag}/says/${text}`;
};
