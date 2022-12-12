import { database } from "./app";
import { get, ref, remove, set  } from "firebase/database";

import { SHA256, AES, enc } from "crypto-js";

import { UserAccount, UserData } from "../model/user";
import { TitleId } from "../model/title";

interface EncryptedUserData {
	/* https://en.wikipedia.org/wiki/Salt_(cryptography) */
	salt: string,
	/* This decrypts to true only if the user has entered the right password */
	ok: string,

	name: string,
	watchlist: string
}

export function isUsernameTaken(username: string) {
	const userRef = ref(database, "user/" + username);

	return get(userRef).then((data) => {
		return data.exists();
	});
}

function encryptObject<T>(obj: T, cryptoKey: string) {
	return AES.encrypt(JSON.stringify(obj), cryptoKey).toString();
}

function decryptObject<T>(encryptedObj: string, cryptoKey: string) {
	try {
		const object = JSON.parse(AES.decrypt(encryptedObj, cryptoKey).toString(enc.Utf8));
		
		if(object) {
			return object as T;
		}

		return null;
	}
	catch {
		return null;
	}
}

/* Returns: Decryption key or error */
export function createUser(accountInfo: UserAccount, name: string) {
	const userRef = ref(database, "user/" + accountInfo.username);
	
	const randomSaltArray = new Uint8Array(16);
	crypto.getRandomValues(randomSaltArray);

	const randomSalt = randomSaltArray.reduce((s, c) => s + c.toString(16), "");
	const cryptoKey = SHA256(accountInfo.password + randomSalt).toString();

	console.log("cryptoKey: " + cryptoKey);
	
	const encryptedData: EncryptedUserData = {
		salt: randomSalt,
		ok: encryptObject(true, cryptoKey),

		name: encryptObject(name, cryptoKey),
		watchlist: encryptObject([] as TitleId[], cryptoKey)
	};

	return set(userRef, encryptedData).then(() => {
		return cryptoKey;
	});
}

/* Returns: UserData or error */
export function loginUser(accountInfo: UserAccount) {
	const userRef = ref(database, "user/" + accountInfo.username);
	
	return get(userRef).then((data): UserData => {
		if(!data.exists()) {
			throw new Error("User with name " + accountInfo.username + " does not exist");
		}

		const encryptedData = data.val() as EncryptedUserData;
		const cryptoKey = SHA256(accountInfo.password + encryptedData.salt).toString();

		if(!decryptObject<boolean>(encryptedData.ok, cryptoKey)) {
			throw new Error("Wrong password");
		}

		const name = decryptObject<string>(encryptedData.name, cryptoKey);
		const watchlist = decryptObject<TitleId[]>(encryptedData.name, cryptoKey);

		if(!name || !watchlist) {
			throw new Error("Invalid user data");
		}

		return {
			username: accountInfo.username,
			cryptoKey: cryptoKey,

			name: name,
			watchlist: watchlist
		}
	});
}