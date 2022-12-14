import Header from "../views/header"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { searchValueState } from "../../backend/model/atoms";
import { canSearchImdb } from "../../backend/model/imdb";

function HeaderPresenter(props:any){

    const [query, setQuery] = useState("");
    const [, setGlobalSearchValue] = useRecoilState(searchValueState);
    
    function searchValue(){
        const value = query.trim();
        
        if(value !== "" && canSearchImdb()) {
            setGlobalSearchValue(value);
            window.location.href = window.location.href.split("#")[0] + "#/search";
        }
        else {
            /* TODO: show error if user went over rate limit */
        }
    }
    
    return (
        <Header search={searchValue} setQuery={setQuery} value={query}></Header>
    )
}



export default HeaderPresenter