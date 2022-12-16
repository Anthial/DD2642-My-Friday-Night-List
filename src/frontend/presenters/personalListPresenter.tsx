import PersonalListView from "../views/personalListView";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedSeasonState,
  selectedRegionState,
  myListState,
  selectedTitleAtom,
  selectedTitle,
} from "../../backend/model/atoms";
import regions from "../../backend/data/ISO-3166-Alpha-2-country-codes";
import Spinner from "../views/spinnerView";
import { useState, useEffect } from "react";
import { getTitleById } from "../../backend/model/imdb";
import { Title, TitleId, TitleType } from "../../backend/model/title";
import { loggedInUserAtom } from "../../backend/model/user";
import { getAvailabilityById } from "../../backend/model/streamingAvailability";

function PersonalList(props: any) {
  // const [myList, setMyList] = useRecoilState(myListState);
  const [userData, setMyList] = useRecoilState(loggedInUserAtom);
  const [imdbResponse, setIMDBResponse] = useState<Title | null>(null);
  const [concatObject, setConcatObject] = useState<any>([]);
  const [region, setRegion] = useRecoilState(selectedRegionState);
  // console.log(region);
  function handleContent(handle: any) {
    // console.log(handle);
    return { ...handle[1], ...handle[0] };
  }
  // gladiator tt0172495
  //tt0118480 stargate
  useEffect(() => {
    // const myList = ["tt0111161", "tt0118480"];
    const myList = userData?.watchlist
    console.log(myList)

    const fetchData = async (id: string) => {
      const response = await getTitleById(id, false);
      let networks = await getAvailabilityById(id, region, false).catch((error) => console.log(error));
      if (!networks){
        networks = {streamingInfo:{},imdbID: id, region: region}
      }
      return [response, networks];
    };
    if (myList) {
      Promise.all(
        myList.map((titleId) => fetchData(titleId).then(handleContent))
      ).then((values) => setConcatObject(values));
      // console.log(concatObject);
    }
  }, [region, userData]);

  // const imdbData = fetchTitle(dummyFirebaseMyList[0]).then(handle);
  // console.log(imdbData);

  const [, setSeason] = useRecoilState(selectedSeasonState);
  function saveSelectedSeason(seasonId: string) {
    setSeason(seasonId);
  }
  const setSelectedTitleId = useSetRecoilState(selectedTitleAtom);
	const setSelectedTitle = useSetRecoilState(selectedTitle);
  function saveSelectedTitle(id: TitleId){
    setSelectedTitle({} as Title);
		setSelectedTitleId(id);
    getTitleById(id, false).then((title) => setSelectedTitle(title)).catch((e: Error) => setSelectedTitle({} as Title))
  }
  
  function saveSelectedRegion(regionName: string) {
    const findRegionObject = regions.find(({ name }) => name === regionName);
    // console.log(findRegionObject["alpha-2"].toLowerCase());
    if (findRegionObject != null) {
      setRegion(findRegionObject["alpha-2"].toLowerCase());
    } else {
      console.error("Region could not be set");
    }
  }
  //console.log("Loaded presenter...");
  const findRegionObject = regions.find((obj) => obj["alpha-2"].toLowerCase() == region);
  // console.log(findRegionObject)

  return (
    <PersonalListView
      // tvShow={[test, concatenateApis()]}
      tvShow={concatObject}
      saveSelectedSeason={saveSelectedSeason}
      saveSelectedRegion={saveSelectedRegion}
      regions={regions}
      region={findRegionObject.name}
      saveSelectedTitle={saveSelectedTitle}
    />
    //<Spinner/>
  );
}

export default PersonalList;
