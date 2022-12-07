import { Title, TitleId } from "../model/title";
import { database } from "./app";
import { get, ref, remove, set  } from "firebase/database";

interface CachedImdbTitle {
	title: Title,
	cacheTime: number
}

/* API responses are cached for two days */
function isExpiredCacheEntry(cacheTime: number) {
	const secondsInDay = 86400;

	/* Date.UTC() returns time in milliseconds so we convert it to seconds */
	return Math.floor(Date.now() / 1000) - cacheTime > secondsInDay * 2;
}

export function getTitleFromFirebase(id: TitleId): Promise<Title> {
	const titleRef = ref(database, "cache/imdb/title/" + id);

	return get(titleRef).then((data) => {
		const cacheEntry = data.val() as CachedImdbTitle;

		if(cacheEntry) {
			if(isExpiredCacheEntry(cacheEntry.cacheTime)) {
				remove(titleRef);
				throw new Error("Cached data is too old, removing");
			}

			return cacheEntry.title;
		}

		throw new Error("Not found in Firebase cache");
	});
}

export function updateTitleInFirebase(title: Title) {
	const titleRef = ref(database, "cache/imdb/title/" + title.id);
	set(titleRef, { title: title, cacheTime: Math.floor(Date.now() / 1000) });
}