import { Title, TitleId, TitleType } from "./title";
import { imdbPlaceholderData } from "../api/imdb/placeholderData";
import { getTitleFromFirebase, updateTitleInFirebase } from "../firebase/cache";
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

					seasons: result.tvSeriesInfo.seasons,
					year: result.year,

					plot: result.plot,
					stars: result.starList.map((star: { name: string }) => star.name)
				};

				updateTitleInFirebase(title);
				return title;
			});
		});
	}
}

export function searchImdb(query: string, usePlaceholderData: boolean): Promise<any> {
	// TODO cache in firebase
	query = query.trim();
	query = query.toLowerCase();
	
	if(usePlaceholderData) {
		const results = imdbPlaceholderData.filter((title) => title.name.toLowerCase().includes(query));
		return Promise.resolve(results);
	}
	else {
		if (query === ""){return Promise.resolve(null);} //lol no 
		return fetchSearchResults(query)
	}
}

export function getEpisodesByIDSeason(id: string, season: string): Promise<any> {
	return fetchEpisodes(id, season);
}

export function getTriviaByID(id: string): Promise<any> {
	return fetchTrivia(id);
}