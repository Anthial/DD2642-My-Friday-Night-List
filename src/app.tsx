import { useState, useEffect } from 'react'
import { HashRouter, Route, Routes } from "react-router-dom"

import Header from "./frontend/presenters/headerPresenter"
import DetailsViewPresenter from "./frontend/presenters/detailsViewPresenter"
import TriviaViewPresenter from "./frontend/presenters/triviaViewPresenter"
import PersonalList from "./frontend/presenters/personalListPresenter"
import SearchResults from './frontend/presenters/searchResultsPresenter'
import LoginViewPresenter from "./frontend/presenters/loginPresenter"
import RegisterViewPresenter from "./frontend/presenters/registerPresenter"
import EpisodeViewPresenter from './frontend/presenters/episodeViewPresenter'
import LogoutPresenter from "./frontend/presenters/logoutPresenter"

import { addLoginObserver, removeLoginObserver, loggedInUserAtom, UserData } from "./backend/model/user";
import { useRecoilState } from 'recoil';
import { ApiError, ApiErrorReason } from './backend/api/imdb/imdb'
import { addImdbErrorObserver, removeImdbErrorObserver } from './backend/model/imdb'
import ErrorBanner from './frontend/views/errorBanner'
import { addStreamingAvailabilityErrorObserver, removeStreamingAvailabilityErrorObserver } from './backend/model/streamingAvailability'

function App() {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserAtom);
  const [imdbApiLimitReached, setImdbApiLimitReached] = useState(false);
  const [availApiLimitReached, setAvailApiLimitReached] = useState(false);
  const [invalidKeys, setInvalidKeys] = useState(false);

  useEffect(() => {
    const observer = (data: UserData | null) => {
      setLoggedInUser(data);
    }

    addLoginObserver(observer);
    return () => removeLoginObserver(observer);
  }, []);

  useEffect(() => {
    const imdbObserver = (error: ApiError) => {
      console.log(error);
      if(error.reason == ApiErrorReason.LimitReached) {
        setImdbApiLimitReached(true);
      }
      else if(error.reason == ApiErrorReason.InvalidKey) {
        setInvalidKeys(true);
      }
      else {
        window.alert("IMDB API error - " + error.message);
      }
    }

    addImdbErrorObserver(imdbObserver);
    return () => removeImdbErrorObserver(imdbObserver);
  }, []);

  useEffect(() => {
    const availObserver = (error: ApiError) => {
      if(error.reason == ApiErrorReason.LimitReached) {
        setAvailApiLimitReached(true);
      }
      else if(error.reason == ApiErrorReason.InvalidKey) {
        setInvalidKeys(true);
      }
      else if (error.reason === ApiErrorReason.BadRequest){
        console.log("Error 404: There was a request that could not be fulfilled.")
      }
      else {
        window.alert("Streaming Availability API error - " + error.message);
      }
    }

    addStreamingAvailabilityErrorObserver(availObserver);
    return () => removeStreamingAvailabilityErrorObserver(availObserver);
  }, []);

  const showBanner = imdbApiLimitReached || availApiLimitReached || invalidKeys;
  const apiList = 
    (imdbApiLimitReached && availApiLimitReached) ? "IMDB and the Streaming Availability API" :
    imdbApiLimitReached ? "IMDB" :
    availApiLimitReached ? "The Streaming Availability API" : "";
  const bannerMessage = 
    invalidKeys ? "Invalid API keys. Make sure to set up the project correctly." :
    `The daily limit has been reached for ${apiList}. The app will not continue to work correctly.`;

  return (
    <HashRouter>
      <div id="app" className="flex flex-col w-full h-full">
        <Header></Header>
        {showBanner ? <ErrorBanner message={bannerMessage}/> : false}
        {loggedInUser ?
        <Routes>
          <Route path="" element={<PersonalList/>}></Route>
          <Route path="details" element={<DetailsViewPresenter></DetailsViewPresenter>}></Route>
          <Route path="episodes" element={<EpisodeViewPresenter></EpisodeViewPresenter>}></Route>
          <Route path="trivia" element={<TriviaViewPresenter></TriviaViewPresenter>}></Route>
          <Route path="list" element={<PersonalList></PersonalList>}></Route>
          <Route
            path="search"
            element={<SearchResults></SearchResults>}
          ></Route>
          <Route path="logout" element={<LogoutPresenter></LogoutPresenter>}></Route>
        </Routes>
        : 
        <Routes>
          <Route path="" element={<LoginViewPresenter />}></Route>
          <Route path="register" element={<RegisterViewPresenter />}></Route>
        </Routes>}
      </div>
    </HashRouter>
  );
}

export default App;
