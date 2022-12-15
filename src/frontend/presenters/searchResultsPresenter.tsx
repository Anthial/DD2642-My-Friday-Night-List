import { useEffect, useState } from "react";
import { canSearchImdb, searchImdb, getTitleById } from "../../backend/model/imdb";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTitleAtom, searchValueState, selectedTitle, selectedSeasonState } from "../../backend/model/atoms";
import { SearchResult, Title, TitleId } from "../../backend/model/title";

import SearchResultsView from "../views/searchResultsView";

export default function SearchResults() {
	const [titles, setTitles] = useState(null as SearchResult[] | null);
	const searchValue = useRecoilValue(searchValueState);
	const setSelectedTitleId = useSetRecoilState(selectedTitleAtom);
	const setSelectedTitle = useSetRecoilState(selectedTitle);
	const setSelectedSeason = useSetRecoilState(selectedSeasonState);

	useEffect(() => {
		setTitles(null);
		setSelectedSeason("");
		searchImdb(searchValue, false).then(t => setTitles(t)).catch((e: Error) => window.alert("Search failed: " + e.message));
	}, [searchValue]);

	function setTitle(id: TitleId){
		setSelectedTitle({} as Title)
		setSelectedTitleId(id);
		getTitleById(id, false).then((title) => setSelectedTitle(title)).catch((e: Error) => setSelectedTitle({} as Title));
	}


	return <SearchResultsView loading={!titles} titles={titles || []} onSelectTitle={t => setTitle(t.id)}></SearchResultsView>;
}