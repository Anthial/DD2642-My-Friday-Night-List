/* This file defines application state with Recoil atoms */
import { atom } from "recoil";
import { Title } from "./title";

export const selectedTitleAtom = atom({
  key: "selectedTitle",
  default: null as Title | null,
});
export const myListState = atom({
  key: "myList", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
export const selectedSeasonState = atom({
  key: "selectedSeason",
  default: "",
});
export const selectedRegionState = atom({
  key: "selectedRegion",
  default: "us",
});

export  const searchValueState = atom({
  key: "searchValueQuery",
  default: "",
});
