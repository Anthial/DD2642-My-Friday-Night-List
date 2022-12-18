import { TitleId } from "./title";
import { atom } from "recoil";
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

import { auth } from "../firebase/app";
import * as firebaseFunctions from "../firebase/accounts";
import { FirebaseError } from "@firebase/util";
import { onAuthStateChanged, signOut } from "@firebase/auth";

window.loginUserWithPassword = loginUserWithPassword;

/* This is information provided by the user when creating or logging in to an account */
export interface UserAccount {
	email: string,
	password: string,

	nickname?: string
}

/* This is everything the application needs to know about the user when logged in */
export interface UserData {
	userId: string,

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

function checkPassword(accountInfo: UserAccount) {
	if(accountInfo.password.length < 6) {
		throw new Error("Password needs to be at least 6 characters long");	
	}
	return accountInfo;
}

export function createUser(accountInfo: UserAccount) {
	const sanitizedAccountInfo = checkPassword(accountInfo);

	if(!sanitizedAccountInfo.nickname) { 
		sanitizedAccountInfo.nickname = sanitizedAccountInfo.email.split("@")[0];
	}

	return firebaseFunctions.createUser(sanitizedAccountInfo)
		.catch((error: FirebaseError) => {
			const errorMessage = error.code.split("/")[1];

			switch(errorMessage) {
				case "email-already-in-use":
					throw new Error("Email is already in use");
				case "invalid-email":
					throw new Error("Invalid email entered");
				case "weak-password":
					throw new Error("Password is too weak");
			}

			throw new Error("Firebase error: " + errorMessage);
		});
}

export function loginUserWithPassword(accountInfo: UserAccount) {
	const sanitizedAccountInfo = checkPassword(accountInfo);

	return firebaseFunctions.loginUser(sanitizedAccountInfo)
		.catch((error: FirebaseError) => {
			const errorMessage = error.code.split("/")[1];

			switch(errorMessage) {
				case "wrong-password":
					throw new Error("Invalid password entered");
				case "user-not-found":
					throw new Error("Invalid email entered");
			}

			throw new Error("Firebase error: " + errorMessage);
		});
}

export function logoutUser() {
	signOut(auth).then(() => {
		console.log("Logged out");
	}).catch((error: FirebaseError) => {console.log(error)})
}

type UserLoginObserver = (newUser: UserData | null) => void;
let userLoginObservers: UserLoginObserver[] = [];

export function addLoginObserver(observer: UserLoginObserver) {
	userLoginObservers.push(observer);
}

export function removeLoginObserver(observer: UserLoginObserver) {
	userLoginObservers = userLoginObservers.filter(o => o !== observer);
}

auth.onAuthStateChanged(user => {
	if(user) {
		try {
			firebaseFunctions.fetchUser(user.uid)
				.then((data: UserData) => userLoginObservers.map(observer => observer(data)));
		}
		catch {
			/* Ignore any errors, the user database has probably not been created yet */
		}
	}
	else {
		userLoginObservers.map(observer => observer(null));
	}
});