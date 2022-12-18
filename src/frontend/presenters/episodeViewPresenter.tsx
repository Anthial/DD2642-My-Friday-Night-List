import EpisodeView from "../views/episodeView.jsx";
import {
  getEpisodesByIDSeason
} from "../../backend/model/imdb";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectedSeasonState, selectedTitle } from "../../backend/model/atoms.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Spinner from "../views/spinnerView.js";
import { loggedInUserAtom } from "../../backend/model/user.js";

function episodeViewPresenter(props: any) {
  const user = useRecoilValue(loggedInUserAtom);
  const [title, setTitle] = useState(null);
  const [year, setYear] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const values = useRecoilValue(selectedTitle);
  const id = values ? values.id : "";
  const season = useRecoilValue(selectedSeasonState);
  let navigate = useNavigate();

  useEffect(() => {
    if (!user){
      navigate("/")
     }
    const fetchData = async () => {
      const response = await getEpisodesByIDSeason(id, season);
      console.log(response);
      setTitle(response.title);
      setYear(response.year);
      setEpisodes(response.episodes);
    };
    if (season && id){
      fetchData();
    }
  }, [season, id]);


  return ((!(Object.keys(values).length === 0) && episodes) ? 
    <div>
      <EpisodeView
        title={title ? title : values ? values.name : ""}
        year={year ? year : values ? values.year : ""}
        episodes={episodes ? episodes : null}
      ></EpisodeView>
    </div>
    :
    <Spinner/>
  );
}

export default episodeViewPresenter;
