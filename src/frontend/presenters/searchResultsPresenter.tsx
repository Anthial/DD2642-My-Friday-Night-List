import { useEffect, useState } from "react";
import { searchImdb } from "../../backend/model/imdb";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTitleAtom, searchValueState } from "../../backend/model/atoms";
import { SearchResult, Title } from "../../backend/model/title";

import SearchResultsView from "../views/searchResultsView";
import Spinner from "../views/spinnerView";
import { loggedInUserAtom } from "../../backend/model/user";

export default function SearchResults() {
	const user = useRecoilValue(loggedInUserAtom);

	const searchValue = useRecoilValue(searchValueState);
	const [titles, setTitles] = useState(null as SearchResult[] | null);

	const setSelectedTitle = useSetRecoilState(selectedTitleAtom);
	
	useEffect(() => {
		setTitles(null);
		searchImdb(searchValue, false).then(t => setTitles(t)).catch((e: Error) => window.alert("Search failed: " + e.message));
	}, [searchValue]);

	function onUserModifiedList(title: SearchResult) {
		
	}	

	if(titles) {
		return <SearchResultsView titles={titles} isUserLoggedIn={!!user} onSelectTitle={t => setSelectedTitle(t.id)} onModifyList={onUserModifiedList}/>;
	}

	return <Spinner/>;
}