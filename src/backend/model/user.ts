import { TitleId } from "./title";
import { atom } from "recoil";
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

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
	default: null as UserData | null,

	effects: [
		({onSet}) => {
			onSet((newUser, oldUser) => {
				if(newUser && oldUser) {
					firebaseFunctions.syncUser(newUser);
				}
			});
		},
	],
});

const asciiNumbers = Array.from(Array(10).keys()).map(c => c + 48);
const asciiUppercase = Array.from(Array(26).keys()).map(c => c + 65);
const asciiLowercase = asciiUppercase.map(c => c + 32);
const asciiSpecial = ['-'.charCodeAt(0), '_'.charCodeAt(0), '.'.charCodeAt(0)];

/* A-Z, 0-9, -, _, . */
const usernameAllowedCharacters = 
	[...asciiNumbers, ...asciiUppercase, ...asciiLowercase, ...asciiSpecial]
	.map(c => String.fromCharCode(c));

function checkAccountInfo(accountInfo: UserAccount) {
	const sanitizedInfo = {...accountInfo}; 
	sanitizedInfo.username = accountInfo.username.trim();

	if(![...sanitizedInfo.username].every(charInUsername => usernameAllowedCharacters.some(c => charInUsername === c))) {
		throw new Error("Username contains illegal characters (only A-Z, a-z, 0-9, -, _, . are allowed)");
	}

	if(accountInfo.password.length < 6) {
		throw new Error("Password needs to be at least 6 characters long");	
	}

	return sanitizedInfo;
}

export function createUser(accountInfo: UserAccount, nickname?: string) {
	const sanitizedAccountInfo = checkAccountInfo(accountInfo);
	const nicknameOrUsername = nickname ? nickname : sanitizedAccountInfo.username;

	return firebaseFunctions.isUsernameTaken(sanitizedAccountInfo.username).then((isTaken) => {
		if(isTaken) {
			throw new Error("Username is already taken");
		}

		return firebaseFunctions.createUser(sanitizedAccountInfo, nicknameOrUsername).then((encryptionKey) => {
			const user: UserData = {
				username: sanitizedAccountInfo.username,
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

export function loginUserWithCookie() {
	const username = getCookie("username");
	const encryptionKey = getCookie("key");

	if(username && encryptionKey) {
		return firebaseFunctions.loginUser({ username: username, password: "" }, encryptionKey).then((userData) => {
			/* Refresh cookies */
			setCookie("username", username, { expires: 365 });
			setCookie("key", encryptionKey, { expires: 365 });

			return userData;
		});
	}

	return Promise.reject(new Error("No cookie found"));
}

export function loginUserWithPassword(accountInfo: UserAccount) {
	const sanitizedAccountInfo = checkAccountInfo(accountInfo);

	return firebaseFunctions.loginUser(sanitizedAccountInfo).then((userData) => {
		setCookie("username", userData.username, { expires: 365 });
		setCookie("key", userData.encryptionKey, { expires: 365 });

		return userData;
	});
}

export function logoutUser() {
	removeCookie("username");
	removeCookie("key");
}