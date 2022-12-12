import { TitleId } from "./title";
import { atom } from "recoil";

/* This is information provided by the user when creating or logging in to an account */
export interface UserAccount {
	username: string,
	password: string
}

/* This is everything the application needs to know about the user when logged in */
export interface UserData {
	username: string,
	cryptoKey: string,
	
	name: string,
	watchlist: TitleId[]
}

/* TODO: this should be saved in a cookie so the user isn't logged out on refresh */
export const loggedInUserAtom = atom({
	key: "loggedInUser",
	default: null as UserData | null
});