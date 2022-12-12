import { TitleId } from "./title";
import { atom } from "recoil";
import { getCookie, setCookie } from 'typescript-cookie';

import * as firebaseFunctions from "../firebase/accounts";

/* This is information provided by the user when creating or logging in to an account */
export interface UserAccount {
	username: string,
	password: string
}

/* This is everything the application needs to know about the user when logged in */
export interface UserData {
	username: string,
	encryptionKey: string,
	
	nickname: string,
	watchlist: TitleId[]
}

export const loggedInUserAtom = atom({
	key: "loggedInUser",
	default: null as UserData | null
});

function createUser(accountInfo: UserAccount, nickname?: string) {
	const nicknameOrUsername = nickname ? nickname : accountInfo.username;

	return firebaseFunctions.isUsernameTaken(accountInfo.username).then((isTaken) => {
		if(isTaken) {
			throw new Error("Username is already taken");
		}

		return firebaseFunctions.createUser(accountInfo, nicknameOrUsername).then((encryptionKey) => {
			const user: UserData = {
				username: accountInfo.username,
				encryptionKey: encryptionKey,
				
				nickname: nicknameOrUsername,
				watchlist: []
			};

			setCookie("username", user.username, { expires: 365 });
			setCookie("key", user.encryptionKey, { expires: 365 });
			
			return user;
		});
	})
}

function loginUserWithCookie() {
	const username = getCookie("username");
	const encryptionKey = getCookie("username");

	if(username && encryptionKey) {
		return firebaseFunctions.loginUser({ username: username, password: "" }, encryptionKey).then((userData) => {
			/* Refresh cookies */
			setCookie("username", username, { expires: 365 });
			setCookie("key", encryptionKey, { expires: 365 });

			return userData;
		});
	}

	return Promise.reject();
}

function loginUserWithPassword(accountInfo: UserAccount) {
	return firebaseFunctions.loginUser(accountInfo).then((userData) => {
		setCookie("username", userData.username, { expires: 365 });
		setCookie("key", userData.encryptionKey, { expires: 365 });

		return userData;
	});
}