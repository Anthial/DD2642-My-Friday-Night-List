import {Header, NotLoggedInHeader} from "../views/header"

import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { searchValueState } from "../../backend/model/atoms";
import { imdbSearchRatelimitedAtom } from "../../backend/model/imdb";

import { useLocation } from "react-router-dom";
import { loggedInUserAtom } from "../../backend/model/user";

function HeaderPresenter(){
    const [query, setQuery] = useState("");
    const currentPage = useLocation();
    const searchRatelimited = useRecoilValue(imdbSearchRatelimitedAtom);
    const [globalSearchValue, setGlobalSearchValue] = useRecoilState(searchValueState);
    const user = useRecoilValue(loggedInUserAtom);
    
    function searchValue(){
        const value = query.trim();
        
        if(value !== "" && !searchRatelimited) {
            setGlobalSearchValue(value);
            window.location.href = window.location.href.split("#")[0] + "#/search";
        }
    }

    let allowedQuery = query.trim() != "";
    if(currentPage.pathname === "/search") {
        allowedQuery = allowedQuery && query.trim() !== globalSearchValue;
    }

    const canUseSearchButton = !searchRatelimited && allowedQuery;
    return ((user && Object.keys(user).length !== 0) ? 
        <Header search={searchValue} canSearch={canUseSearchButton} setQuery={setQuery} value={query} user={user}></Header>
        : <NotLoggedInHeader></NotLoggedInHeader>
    )
}



export default HeaderPresenter