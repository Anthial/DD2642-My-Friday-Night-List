import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedTitleAtom } from "../../atoms";
import { searchImdb } from "../../backend/api/imdb/functions";
import { Title } from "../../backend/model/title";
import SearchResultsView from "../views/searchResultsView";

export default function SearchResults() {
	const [titles, setTitles] = useState([] as Title[]);

	/* TODO: Replace with real API call */
	useEffect(() => {
		setTimeout(() => { searchImdb("", true).then((t) => {setTitles(t)}) }, 500);
	}, []);

	const setSelectedTitle = useSetRecoilState(selectedTitleAtom);
	return <SearchResultsView loading={titles.length == 0} titles={titles} onSelectTitle={(t: Title) => setSelectedTitle(t)}></SearchResultsView>;
}