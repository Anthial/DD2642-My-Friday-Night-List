import { useEffect, useState } from "react";
import { searchImdb } from "../../backend/model/imdb";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTitleAtom, searchValueState } from "../../backend/model/atoms";
import { Title } from "../../backend/model/title";

import SearchResultsView from "../views/searchResultsView";

export default function SearchResults() {
	const [titles, setTitles] = useState(null as Title[] | null);
	const searchValue = useRecoilValue(searchValueState);
	const setSelectedTitle = useSetRecoilState(selectedTitleAtom);

	useEffect(() => {
		setTitles(null);
		searchImdb(searchValue, true).then(t => setTitles(t));
	}, [searchValue]);

	return <SearchResultsView loading={!titles} titles={titles || []} onSelectTitle={t => setSelectedTitle(t)}></SearchResultsView>;
}