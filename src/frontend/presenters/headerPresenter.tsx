import Header from "../views/header"
import r, { useEffect } from "react"
import { useRecoilValue, useRecoilState } from "recoil"
import { searchValueState } from "../../backend/model/atoms";

function HeaderPresenter(props:any){

    

    const [query, setQuery] = useRecoilState(searchValueState);
    
    function searchValue(){
        console.log(query)
        window.location.href = window.location.href.split("#")[0] + "#/search";
    }
    
    return (
        <Header search={searchValue} setQuery={setQuery} value={query}></Header>
    )
}



export default HeaderPresenter