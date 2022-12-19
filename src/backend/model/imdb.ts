import { SearchResult, Title, TitleId, TitleType } from "./title";
import { cacheSearchInFirebase, cacheTitleInFirebase, getTitleFromFirebase, searchImdbInFirebase } from "../firebase/cache";
import { fetchSearchResults, fetchTitle, fetchEpisodes, fetchTrivia, ApiError } from "../api/imdb/imdb";
import { atom } from "recoil";
import { isValidResult } from "./util";

export type ImdbErrorObserver = (error: ApiError) => void;
let imdbErrorObservers: ImdbErrorObserver[] = [];

export function addImdbErrorObserver(observer: ImdbErrorObserver) {
	imdbErrorObservers.push(observer);
}

export function removeImdbErrorObserver(observer: ImdbErrorObserver) {
	imdbErrorObservers = imdbErrorObservers.filter(o => o !== observer);
}

export function getTitleById(id: TitleId): Promise<Title> {
	// First check if Firebase has this title cached, if not use the IMDb API and cache the data in Firebase
	return getTitleFromFirebase(id).catch(() => {			
		return fetchTitle(id).then(result => { 
			if(!isValidResult(result, ["id", "title", "image", "year", "countries", "plot"])) {
				throw new Error("Invalid result object (API limit reached?)");
			}

			const title = {
				id: result.id,
				type: result.tvSeriesInfo ? TitleType.TVShow : TitleType.Movie,

				name: result.title,
				imageUrl: result.image,

				seasons: result.tvSeriesInfo ? result.tvSeriesInfo.seasons : [],
				year: result.year,

				country: result.countries,

				plot: result.plot,
				stars: result.starList ? result.starList.map((star: { name: string }) => star.name) : []
			};

			cacheTitleInFirebase(title);
			return title;
		})
		.catch((e: Error) => {
			if(e instanceof ApiError) {
				imdbErrorObservers.map(o => o(e));
			}

			throw e;
		});
	});
}

export const imdbSearchRatelimitedAtom = atom({
	key: "imdbSearchRatelimited",
	default: false
});

export function searchImdb(query: string): Promise<SearchResult[]> {
	query = query.trim();
	query = query.toLowerCase();

	if(query.length < 3) {
		return Promise.reject(new Error("Search too short, you need to use at least 3 characters"));
	}
	
	return searchImdbInFirebase(query).catch(() => {
		return fetchSearchResults(query).then(result => {
			if(!isValidResult(result, ["results"])) {
				throw new Error("Invalid results object (API limit reached?)");
			}

			const results = result.results.map((t: any) => {
				if(!isValidResult(t, ["id", "title", "image"])) {
					throw new Error("Invalid result object (API limit reached?)");
				}

				return {
					id: t.id,

					name: t.title,
					imageUrl: t.image
				};
			});

			cacheSearchInFirebase(query, results);
			return results;
		})
		.catch((e: Error) => {
			if(e instanceof ApiError) {
				imdbErrorObservers.map(o => o(e));
			}

			throw e;
		});
	});
}

export function getEpisodesByIDSeason(id: string, season: string): Promise<any> {
	return fetchEpisodes(id, season).catch((e: Error) => {
		if(e instanceof ApiError) {
			imdbErrorObservers.map(o => o(e));
		}

		throw e;
	});
}

export function getTriviaByID(id: string): Promise<any> {
	return fetchTrivia(id).catch((e: Error) => {
		if(e instanceof ApiError) {
			imdbErrorObservers.map(o => o(e));
		}

		throw e;
	});
}