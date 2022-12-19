import { firebaseConfig } from "./firebaseConfig";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth'


function logAndInit() {
	console.log("Initialized Firebase");
	return initializeApp(firebaseConfig);
}

export const app = logAndInit();
export const database = getDatabase(app);
export const auth = getAuth(app);