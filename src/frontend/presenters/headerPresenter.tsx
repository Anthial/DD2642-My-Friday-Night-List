import Header from "../views/header"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { searchValueState } from "../../backend/model/atoms";

function HeaderPresenter(props:any){

    const [query, setQuery] = useState("");
    const [, setGlobalSearchValue] = useRecoilState(searchValueState);
    
    function searchValue(){
        const value = query.trim();
        
        if(value !== "") {
            setGlobalSearchValue(value);
            window.location.href = window.location.href.split("#")[0] + "#/search";
        }
    }
    
    return (
        <Header search={searchValue} setQuery={setQuery} value={query}></Header>
    )
}



export default HeaderPresenter