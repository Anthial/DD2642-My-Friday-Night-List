import { Title, TitleId } from "../../model/title";
import { imdbPlaceholderData } from "./placeholderData";


export function getTitleById(id: TitleId, usePlaceholderData: boolean): Promise<Title | undefined> {
	if(usePlaceholderData) {
		const result = imdbPlaceholderData.find((title) => title.id === id);
		return Promise.resolve(result);
	}
	else {
		throw "IMDb API not implemented yet";
	}
}

export function searchImdb(query: string, usePlaceholderData: boolean): Promise<Title[]> {
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