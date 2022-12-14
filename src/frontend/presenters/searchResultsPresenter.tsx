import { useEffect, useState } from "react";
import { searchImdb } from "../../backend/model/imdb";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTitleAtom, searchValueState } from "../../backend/model/atoms";
import { SearchResult, Title } from "../../backend/model/title";

import SearchResultsView from "../views/searchResultsView";
import Spinner from "../views/spinnerView";
import { loggedInUserAtom } from "../../backend/model/user";

const entriesPerPage = 8;

export default function SearchResults() {
	const user = useRecoilValue(loggedInUserAtom);

	const searchValue = useRecoilValue(searchValueState);
	const [titles, setTitles] = useState(null as SearchResult[] | null);
	const [page, setPage] = useState(0);

	const setSelectedTitle = useSetRecoilState(selectedTitleAtom);
	
	useEffect(() => {
		setTitles(null);
		setPage(0);

		searchImdb(searchValue, false).then(t => setTitles(t)).catch((e: Error) => window.alert("Search failed: " + e.message));
	}, [searchValue]);

	function onUserModifiedList(title: SearchResult) {
		
	}	

	if(titles) {
		const start = page * entriesPerPage;
		const end = start + entriesPerPage;
		const pages = Math.ceil(titles.length / entriesPerPage);
		
		return <SearchResultsView 
			titles={titles.slice(start, end)} 
			isUserLoggedIn={!!user}

			page={page}
			maxPage={pages}
			
			onSelectTitle={t => setSelectedTitle(t.id)} 
			onModifyList={onUserModifiedList}
			onNavigatePage={o => setPage(page + o)}/>;
	}

	return <Spinner/>;
}