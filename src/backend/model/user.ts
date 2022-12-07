import { TitleId } from "./title";

export type UserId = number;

/* This is information provided by the user when creating or logging in to an account */
export interface UserAccount {
	username: string,
	password: string
}

/* This is everything the application needs to know about the user when logged in */
export interface UserData {
	id: UserId,

	username: string,
	/* TODO: Where does the user set this? */
	name: string,

	watchlist: TitleId[]
}