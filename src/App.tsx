import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CherryworksButton from './cljstest/cherry.jsx'
import Header from "./frontend/header"
import DetailsViewPresenter from "./frontend/presenters/detailsViewPresenter.jsx"
import TriviaViewPresenter from "./frontend/presenters/triviaViewPresenter.jsx"
import {HashRouter, Route, Routes} from "react-router-dom"


function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
    <div>
      <Header></Header>
      
        <Routes>
          <Route path="search" element={<DetailsViewPresenter></DetailsViewPresenter>}></Route>
          <Route path="account" element={<TriviaViewPresenter></TriviaViewPresenter>}></Route>
        </Routes>
      
      {/*<CherryworksButton x={count}></CherryworksButton>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      */}
    </div>
    </HashRouter>
  )
}

export default App
