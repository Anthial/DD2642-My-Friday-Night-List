import { SearchResult, Title, TitleId, TitleType } from "./title";
import { imdbPlaceholderData } from "../api/imdb/placeholderData";
import { cacheSearchInFirebase, cacheTitleInFirebase, getTitleFromFirebase, searchImdbInFirebase } from "../firebase/cache";
import { fetchSearchResults, fetchTitle, fetchEpisodes, fetchTrivia } from "../api/imdb/IMDB";

export function getTitleById(id: TitleId, usePlaceholderData: boolean): Promise<Title> {
	if(usePlaceholderData) {
		const result = imdbPlaceholderData.find((title) => title.id === id);
		
		if(result) {
			return Promise.resolve(result);
		}
		
		return Promise.reject(new Error("Not found in placeholder data"));
	}
	else {
		// First check if Firebase has this title cached, if not use the IMDb API and cache the data in Firebase
		return getTitleFromFirebase(id).catch(() => {			
			return fetchTitle(id).then(result => { 
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
			});
		});
	}
}

/* The time the user has to wait before searching again */
const searchTimeout = 2;

/* If there is a search API call waiting */
let searchPromiseWaiting = false;
/* The time the user is allowed to search again if searchPromiseWaiting == false */
let nextSearchTime = 0;

export function canSearchImdb() {
	return !searchPromiseWaiting && Date.now() >= nextSearchTime;
}

export function searchImdb(query: string, usePlaceholderData: boolean): Promise<SearchResult[]> {
	query = query.trim();
	query = query.toLowerCase();

	if(!canSearchImdb()) {
		return Promise.reject(new Error("Rate limited"));
	}

	if(query.length < 3) {
		return Promise.reject(new Error("Search too short, you need to use at least 3 characters"));
	}
	
	if(usePlaceholderData) {
		const results = imdbPlaceholderData
			.filter((title) => title.name.toLowerCase().includes(query))
			.map(t => t as SearchResult);

		return Promise.resolve(results).finally();
	}
	else {
		searchPromiseWaiting = true;

		return searchImdbInFirebase(query).catch(() => {
			return fetchSearchResults(query)
				.then(result => {
					const results = result.results.map((t: any) => {
						return {
							id: t.id,

							name: t.title,
							imageUrl: t.image
						};
					});

					cacheSearchInFirebase(query, results);
					return results;
				})
		})
		.finally(() => {
			searchPromiseWaiting = false;
			nextSearchTime = Date.now() + searchTimeout * 1000;
		});
	}
}

export function getEpisodesByIDSeason(id: string, season: string): Promise<any> {
	return fetchEpisodes(id, season);
}

export function getTriviaByID(id: string): Promise<any> {
	return fetchTrivia(id);
}