/* This file defines application state with Recoil atoms */
import { atom } from "recoil";
import { Title } from "./backend/model/title";

export const selectedTitleAtom = atom({
	key: "selectedTitle",
	default: null as Title | null
});