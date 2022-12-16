import Header from "../views/header"

import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { searchValueState } from "../../backend/model/atoms";
import { imdbSearchRatelimitedAtom } from "../../backend/model/imdb";

import { useLocation } from "react-router-dom";

function HeaderPresenter(props:any){
    const [query, setQuery] = useState("");
    const currentPage = useLocation();
    const searchRatelimited = useRecoilValue(imdbSearchRatelimitedAtom);
    const [globalSearchValue, setGlobalSearchValue] = useRecoilState(searchValueState);
    
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
    
    return (
        <Header search={searchValue} canSearch={canUseSearchButton} setQuery={setQuery} value={query}></Header>
    )
}



export default HeaderPresenter