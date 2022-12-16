import { useEffect, useState } from "react";
import { searchImdb, getTitleById, imdbSearchRatelimitedAtom } from "../../backend/model/imdb";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTitleAtom, searchValueState, selectedTitle, selectedSeasonState } from "../../backend/model/atoms";
import { SearchResult, Title, TitleId } from "../../backend/model/title";

import SearchResultsView from "../views/searchResultsView";
import Spinner from "../views/spinnerView";
import { loggedInUserAtom } from "../../backend/model/user";

interface SearchResults {
	titles: SearchResult[],
	query: string
}

const entriesPerPage = 8;

const emptyResults: SearchResults = {
	titles: [],
	query: ""
}

export default function SearchResults() {
	const [results, setResults] = useState(emptyResults);
	const [page, setPage] = useState(0);

	const [user, setUser] = useRecoilState(loggedInUserAtom);
	const [searchValue, setSearchValue] = useRecoilState(searchValueState);
	const [imdbRatelimited, setImdbRatelimited] = useRecoilState(imdbSearchRatelimitedAtom);
	
	const setSelectedTitleId = useSetRecoilState(selectedTitleAtom);
	const setSelectedTitle = useSetRecoilState(selectedTitle);
	const setSelectedSeason = useSetRecoilState(selectedSeasonState);
	
	useEffect(() => {
		/* We need this check if the user reloads the page when we run in development mode (because React will render components twice) */
		if(!imdbRatelimited && searchValue !== results.query) {
			/* Deep copy the current search value, in case it changes before the promise is finished */
			const searchValueCopy = `${searchValue}`;

			setImdbRatelimited(true);
			setResults(emptyResults);
			setPage(0);

			searchImdb(searchValue, false)
				.then(t => setResults({
					titles: t,
					query: searchValueCopy
				}))
				.catch((e: Error) => window.alert("Search failed: " + e.message))
				.finally(() => setTimeout(() => setImdbRatelimited(false), 1000));
		}
	}, [searchValue]);

	function onSelectTitle(id: TitleId){
		setSelectedTitle({} as Title);
		setSelectedTitleId(id);
		setSelectedSeason("");

		getTitleById(id, false).then((title) => setSelectedTitle(title)).catch((e: Error) => setSelectedTitle({} as Title));
	}

	function onUserModifiedList(title: SearchResult) {
		if(user) {
			let newWatchList = [...user.watchlist];

			if(newWatchList.includes(title.id)) {
				newWatchList = newWatchList.filter(id => id !== title.id);
			}
			else {
				newWatchList.push(title.id);
			}

			setUser({...user, watchlist: newWatchList});
		}
	}	

	if(results.query !== "") {
		const start = page * entriesPerPage;
		const end = start + entriesPerPage;
		const pages = Math.ceil(results.titles.length / entriesPerPage);
		
		return <SearchResultsView 
			titles={results.titles.slice(start, end)} 
			
			isUserLoggedIn={!!user}
			userWatchlist={user ? user.watchlist : []}

			page={page}
			maxPage={pages}
			
			onSelectTitle={t => onSelectTitle(t.id)} 
			onModifyList={onUserModifiedList}
			onNavigatePage={o => setPage(page + o)}/>;
	}

	return <Spinner/>;
}