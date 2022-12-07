import { Title, TitleId } from "../../model/title";
import { imdbPlaceholderData } from "./placeholderData";
import { getTitleFromFirebase, updateTitleInFirebase } from "../../firebase/cache";

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
		return getTitleFromFirebase(id).catch((reason) => {
			// TODO: Call imdb api here 
			// updateTitleInFirebase(result);
			
			throw "IMDb API not implemented yet";
		});
	}
}

export function searchImdb(query: string, usePlaceholderData: boolean): Promise<Title[]> {
	// TODO cache in firebase
	query = query.trim();
	query = query.toLowerCase();
	
	if(usePlaceholderData) {
		const results = imdbPlaceholderData.filter((title) => title.name.toLowerCase().includes(query));
		return Promise.resolve(results);
	}
	else {
		throw "IMDb API not implemented yet";
	}
}