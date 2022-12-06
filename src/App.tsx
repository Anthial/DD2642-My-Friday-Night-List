import { useState } from 'react'
import {HashRouter, Route, Routes} from "react-router-dom"
import { RecoilRoot } from 'recoil'
import reactLogo from './assets/react.svg'
import CherryworksButton from './cljstest/cherry.jsx'
import Header from "./frontend/header"
import DetailsViewPresenter from "./frontend/presenters/detailsViewPresenter";
import TriviaViewPresenter from "./frontend/presenters/triviaViewPresenter";
import PersonalList from "./frontend/presenters/personalListPresenter";
import SearchResults from './frontend/presenters/searchResultsPresenter';

function App() {
  const [count, setCount] = useState(0);
  return (
    <HashRouter>
    <div id="app">
      <Header></Header>
      
        <Routes>
          <Route path="account" element={<DetailsViewPresenter></DetailsViewPresenter>}></Route> {/** Change from account to details in the future*/}
          <Route path="account/trivia" element={<TriviaViewPresenter></TriviaViewPresenter>}></Route>
          <Route path="mylist" element={<PersonalList></PersonalList>}></Route>
          <Route path="search" element={<SearchResults></SearchResults>}></Route>
        </Routes>
      
      {/*<CherryworksButton x={count}></CherryworksButton>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      */}
    </div>
    </HashRouter>
  )
}

export default App;
