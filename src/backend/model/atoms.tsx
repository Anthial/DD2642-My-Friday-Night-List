/* This file defines application state with Recoil atoms */
import { atom } from "recoil";
import { TitleId, Title } from "./title";


const localStorageEffect = (key: string) => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue: any, _: any, isReset: any) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};


export const selectedTitleAtom = atom({
  key: "selectedTitleId",
  default: "" as TitleId,
  effects: [
    localStorageEffect("selectedTitleId"),
  ],
});

export const selectedTitle = atom({
  key: "selectedTitle",
  default: {} as Title,
  effects: [
    localStorageEffect("selectedTitle"),
  ],
});

export const myListState = atom({
  key: "myList", // unique ID (with respect to other atoms/selectors)
  default: [] as Title[] | null, // default value (aka initial value)
  effects: [localStorageEffect("myList"),
],
});
export const selectedSeasonState = atom({
  key: "selectedSeason",
  default: "",
  effects: [
    localStorageEffect("selectedSeason"),
  ],
});
export const selectedRegionState = atom({
  key: "selectedRegion",
  default: "us",
  effects: [
    localStorageEffect("selectedRegion"),
  ],
});

export  const searchValueState = atom({
  key: "searchValueQuery",
  default: "",
  effects: [
    localStorageEffect("selectedValueQuery"),
  ],
});
