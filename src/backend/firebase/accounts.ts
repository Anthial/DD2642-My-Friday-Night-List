import { database, auth } from "./app";
import { get, ref, remove, set  } from "firebase/database";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import { SHA256, AES, enc } from "crypto-js";

import { UserAccount, UserData } from "../model/user";
import { TitleId } from "../model/title";

interface EncryptedUserData {
	/* https://en.wikipedia.org/wiki/Salt_(cryptography) */
	salt: string,
	/* This decrypts to true only if the user has entered the right password */
	ok: string,

	nickname: string,
	watchlist: string
}

export function isUsernameTaken(username: string) {
	const userRef = ref(database, "user/" + username);

	return get(userRef).then((data) => {
		return data.exists();
	});
}

function encryptObject<T>(obj: T, encryptionKey: string) {
	return AES.encrypt(JSON.stringify(obj), encryptionKey).toString();
}

function decryptObject<T>(encryptedObj: string, encryptionKey: string) {
	try {
		const object = JSON.parse(AES.decrypt(encryptedObj, encryptionKey).toString(enc.Utf8));
		
		if(object) {
			return object as T;
		}

		return null;
	}
	catch {
		return null;
	}
}

export function createUser(accountInfo: UserAccount, nickname:string) {
	createUserWithEmailAndPassword(auth, accountInfo.email, accountInfo.password).then((response) => {console.log(response);})
}


/* Promise returns: Decryption key or error */
export function createUserOld(accountInfo: UserAccount, nickname: string) {
	const userRef = ref(database, "user/" + accountInfo.email);
	
	const randomSaltArray = new Uint8Array(16);
	crypto.getRandomValues(randomSaltArray);

	const randomSalt = randomSaltArray.reduce((s, c) => s + c.toString(16), "");
	const encryptionKey = SHA256(accountInfo.password + randomSalt).toString();
	
	const encryptedData: EncryptedUserData = {
		salt: randomSalt,
		ok: encryptObject(true, encryptionKey),

		nickname: encryptObject(nickname, encryptionKey),
		watchlist: encryptObject([] as TitleId[], encryptionKey)
	};

	return set(userRef, encryptedData).then(() => {
		return encryptionKey;
	});
}

/* Promise returns: UserData or error */
export function loginUser(accountInfo: UserAccount, encryptionKey?: string) {
	const userRef = ref(database, "user/" + accountInfo.email);
	
	return get(userRef).then((data): UserData => {
		if(!data.exists()) {
			throw new Error("User with name " + accountInfo.email + " does not exist");
		}

		const encryptedData = data.val() as EncryptedUserData;
		const generatedEncryptionKey = encryptionKey ? encryptionKey : SHA256(accountInfo.password + encryptedData.salt).toString();

		if(!decryptObject<boolean>(encryptedData.ok, generatedEncryptionKey)) {
			throw new Error("Wrong password");
		}

		const nickname = decryptObject<string>(encryptedData.nickname, generatedEncryptionKey);
		const watchlist = decryptObject<TitleId[]>(encryptedData.watchlist, generatedEncryptionKey);

		if(!nickname || !watchlist) {
			throw new Error("Invalid user data");
		}

		return {
			email: accountInfo.email,
			encryptionKey: generatedEncryptionKey,

			nickname: nickname,
			watchlist: watchlist
		}
	});
}

/* Promise returns after name and watchlist sync is complete */
export function syncUser(newData: UserData) {
	const nicknameRef = ref(database, "user/" + newData.email + "/nickname");
	const watchlistRef = ref(database, "user/" + newData.email + "/watchlist");

	const nicknameValue = encryptObject(newData.nickname, newData.encryptionKey);
	const watchlistValue = encryptObject(newData.watchlist, newData.encryptionKey);

	const nicknamePromise = set(nicknameRef, nicknameValue);
	const watchlistPromise = set(watchlistRef, watchlistValue);

	return Promise.all([nicknamePromise, watchlistPromise]);
}