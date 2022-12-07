import { firebaseConfig } from "./firebaseConfig";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function logAndInit() {
	console.log("Initialized Firebase");
	return initializeApp(firebaseConfig);
}

export const app = logAndInit();
export const database = getDatabase(app);