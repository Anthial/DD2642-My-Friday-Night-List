import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { searchImdb } from "../../backend/api/imdb/functions";
import { Title } from "../../backend/model/title";
import SearchResultsView from "../views/searchResultsView";

export default function SearchResults() {
	const [titles, setTitles] = useState([] as Title[]);

	useEffect(() => {
		setTimeout(() => { searchImdb("", true).then((t) => {setTitles(t)}) }, 500);
	}, []);

	return <SearchResultsView loading={titles.length == 0} titles={titles}></SearchResultsView>;
}