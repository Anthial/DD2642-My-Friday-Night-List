import { useEffect, useState } from "react";
import { canSearchImdb, searchImdb } from "../../backend/model/imdb";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTitleAtom, searchValueState } from "../../backend/model/atoms";
import { SearchResult, Title } from "../../backend/model/title";

import SearchResultsView from "../views/searchResultsView";

export default function SearchResults() {
	const [titles, setTitles] = useState(null as SearchResult[] | null);
	const searchValue = useRecoilValue(searchValueState);
	const setSelectedTitle = useSetRecoilState(selectedTitleAtom);

	useEffect(() => {
		if(canSearchImdb()) {
			setTitles(null);
			searchImdb(searchValue, false).then(t => setTitles(t)).catch((e: Error) => window.alert("Search failed: " + e.message));
		}
		else {
			/* Ignore for now if the user is searching too often */
		}
	}, [searchValue]);

	return <SearchResultsView loading={!titles} titles={titles || []} onSelectTitle={t => setSelectedTitle(t.id)}></SearchResultsView>;
}