import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import CherryworksButton from "./cljstest/cherry.jsx";
import Header from "./frontend/header";
import DetailsViewPresenter from "./frontend/presenters/detailsViewPresenter.jsx";
import TriviaViewPresenter from "./frontend/presenters/triviaViewPresenter.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import PersonalList from "./frontend/presenters/personalListPresenter";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  const [count, setCount] = useState(0);
  return (
    <RecoilRoot>
      <HashRouter>
        <div>
          <Header></Header>

          <Routes>
            <Route
              path="account"
              element={<DetailsViewPresenter></DetailsViewPresenter>}
            ></Route>{" "}
            {/** Change from account to details in the future*/}
            <Route
              path="account/trivia"
              element={<TriviaViewPresenter></TriviaViewPresenter>}
            ></Route>
            <Route
              path="mylist"
              element={<PersonalList></PersonalList>}
            ></Route>
          </Routes>

          {/*<CherryworksButton x={count}></CherryworksButton>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      */}
        </div>
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;
