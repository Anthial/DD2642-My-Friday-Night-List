import { useEffect, useState } from "react";
import { searchImdb, getTitleById } from "../../backend/model/imdb";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTitleAtom, searchValueState, selectedTitle, selectedSeasonState } from "../../backend/model/atoms";
import { SearchResult, Title, TitleId } from "../../backend/model/title";

import SearchResultsView from "../views/searchResultsView";
import Spinner from "../views/spinnerView";
import { loggedInUserAtom } from "../../backend/model/user";

const entriesPerPage = 8;

export default function SearchResults() {
	const [titles, setTitles] = useState(null as SearchResult[] | null);
	const [page, setPage] = useState(0);

	const [user, setUser] = useRecoilState(loggedInUserAtom);
	const searchValue = useRecoilValue(searchValueState);
	
	const setSelectedTitleId = useSetRecoilState(selectedTitleAtom);
	const setSelectedTitle = useSetRecoilState(selectedTitle);
	const setSelectedSeason = useSetRecoilState(selectedSeasonState);
	
	useEffect(() => {
		setTitles(null);
		setPage(0);

		searchImdb(searchValue, false).then(t => setTitles(t)).catch((e: Error) => window.alert("Search failed: " + e.message));
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

	if(titles) {
		const start = page * entriesPerPage;
		const end = start + entriesPerPage;
		const pages = Math.ceil(titles.length / entriesPerPage);
		
		return <SearchResultsView 
			titles={titles.slice(start, end)} 
			
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