import PersonalListView from "../views/personalListView";
import { Stargate } from "../../backend/model/dummyStargate";
import { test } from "../../backend/model/testCondRendering";
import availability from "../../backend/model/streamingAvailabilityDummyStargate";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedSeasonState,
  selectedRegionState,
  myListState,
} from "../../backend/model/atoms";
import regions from "../../backend/data/ISO-3166-Alpha-2-country-codes";
import Spinner from "../views/spinnerView";
import { useState, useEffect } from "react";
import { getTitleById } from "../../backend/model/imdb";
import { Title, TitleType } from "../../backend/model/title";
import { fetchAvailability } from "../../backend/api/availability/streamingAvailability";
import { loggedInUserAtom } from "../../backend/model/user";

function PersonalList(props: any) {
  const [myList, setMyList] = useRecoilState( myListState);
  // const [myList, setMyList] = useRecoilState(loggedInUserAtom);
  const [imdbResponse, setIMDBResponse] = useState<Title | null>(null);
  const [concatObject, setConcatObject] = useState<any>([]);
  const [titleList, setTitleList] = useState<any>([]);
  const region = useRecoilValue(selectedRegionState);

  function handleContent(handle: any) {
    
    return {...handle[0], ...handle[1]}
  }


  useEffect(() => {
    const mylist = [{id: "tt0118480", type: 1, name: "test", year:"1999", plot: "Stuff happens", stars: ["teststar", "teststars"], seasons: [],  imageUrl: "spinner.svg"}, 
    {id: "tt0172495", type: 2, name: "test2", year:"1999", plot: "Stuff happens", stars: ["teststar3", "teststars4"], seasons: ["1", "2"],  imageUrl: "spinner.svg"}]
    const fetchData = async (id: string) => {
      const response = await getTitleById(id, false);
      //const networks = await fetchAvailability(id, region);
      //const availability = "none"
      //setIMDBResponse(response);
      //console.log(response);
      
      return Promise.all([response, availability]);
    };
    if (mylist) {
      Promise.all(mylist.map((title: any) => fetchData(title.id).then(handleContent))).then((values) => (setConcatObject(values)));
    }
  }, []);

 

// const imdbData = fetchTitle(dummyFirebaseMyList[0]).then(handle);
// console.log(imdbData);


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
      // tvShow={[test, concatenateApis()]}
      tvShow={concatObject}
      saveSelectedSeason={saveSelectedSeason}
      saveSelectedRegion={saveSelectedRegion}
      regions={regions}
    />
    //<Spinner/>
  );
}

export default PersonalList;
