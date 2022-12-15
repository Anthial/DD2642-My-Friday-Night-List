
import PersonalListView from "../views/personalListView";
import { Stargate } from "../../backend/model/dummyStargate";
import { test } from "../../backend/model/testCondRendering";
import availability from "../../backend/model/streamingAvailabilityDummyStargate";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedSeasonState,
  selectedRegionState,
  myListState,
} from "../../backend/model/atoms";
import regions from "../../backend/data/ISO-3166-Alpha-2-country-codes";
import Spinner from "../views/spinnerView";
import {useState, useEffect} from "react";
import { getTitleById } from "../../backend/model/imdb";
import { Title } from "../../backend/model/title";

function PersonalList(props: any) {
  const [myList, setMyList] = useRecoilState(myListState);
  const [imdbResponse, setIMDBResponse] = useState([] as Title[]);
  const setSelectedSeason = useSetRecoilState(selectedSeasonState);
  useEffect(() => {
    setSelectedSeason("");
    const fetchData = async (id:string) => {
      const response = await getTitleById(id, false);
      //const availability = await 
      setIMDBResponse([...imdbResponse, response])
    }
    if(myList){
      myList.map((title:Title) => fetchData(title.id))
    }    
  },[])

  function concatenateApis() {
    let concatObject = { ...imdbResponse, ...availability };
    return concatObject;
  }
  const [, setSeason] = useRecoilState(selectedSeasonState);
  function saveSelectedSeason(seasonId: string) {
    setSeason(seasonId);
  }
  const [, setRegion] = useRecoilState(selectedRegionState);
  function saveSelectedRegion(regionName: string) {
    const findRegionObject = regions.find(({ name }) => name === regionName);
    // console.log(findRegionObject["alpha-2"].toLowerCase());
    if (findRegionObject != null) {
      setRegion(findRegionObject["alpha-2"].toLowerCase());
    } else {
      console.error("Region could not be set");
    }
  }

  return (
    <PersonalListView
      tvShow={[test, concatenateApis()]}
      saveSelectedSeason={saveSelectedSeason}
      saveSelectedRegion={saveSelectedRegion}
      regions={regions}
    />
    //<Spinner/>
  );
}

export default PersonalList;
