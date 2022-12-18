import { database, auth } from "./app";
import { get, ref, remove, set  } from "firebase/database";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import { UserAccount, UserData } from "../model/user";
import { TitleId } from "../model/title";

export function createUser(accountInfo: UserAccount) {
	return createUserWithEmailAndPassword(auth, accountInfo.email, accountInfo.password)
		.then(response => {
			const userRef = ref(database, "user/" + response.user.uid);
			const userData = {
				nickname: accountInfo.nickname,
				/* This is necessary for Firebase to sync an empty array */
				watchlist: JSON.stringify([])
			};

			return set(userRef, userData);
		});
}

export function loginUser(accountInfo: UserAccount) {
	return signInWithEmailAndPassword(auth, accountInfo.email, accountInfo.password);
}

export function fetchUser(id: string) {
	const userRef = ref(database, "user/" + id);
	
	return get(userRef).then(response => {
		if(response.exists()) {
			const data = response.val();

			return {
				userId: id, 
				nickname: data.nickname,
				watchlist: JSON.parse(data.watchlist)
			} as UserData;
		}

		throw new Error("User with id " + id + " does not exist");
	});
}

export function syncUser(newData: UserData) {
	const nicknameRef = ref(database, "user/" + newData.userId + "/nickname");
	const watchlistRef = ref(database, "user/" + newData.userId + "/watchlist");

	const nicknamePromise = set(nicknameRef, newData.nickname);
	const watchlistPromise = set(watchlistRef, JSON.stringify(newData.watchlist));

	return Promise.all([nicknamePromise, watchlistPromise]);
}