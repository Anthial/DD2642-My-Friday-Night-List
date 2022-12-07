import { atom, useRecoilState } from "recoil";
import { fetchSearchResults } from "../api/imdb/IMDB";
const myList = atom({
  key: "myList", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
