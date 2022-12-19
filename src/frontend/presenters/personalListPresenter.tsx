import PersonalListView from "../views/personalListView";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedSeasonState,
  selectedRegionState,
  selectedTitleAtom,
  selectedTitle,
} from "../../backend/model/atoms";
import regions from "../../backend/data/countryCodes";
import Spinner from "../views/spinnerView";
import { useState, useEffect } from "react";
import { getTitleById } from "../../backend/model/imdb";
import { Title, TitleId, TitleType } from "../../backend/model/title";
import { loggedInUserAtom } from "../../backend/model/user";
import { getAvailabilityById } from "../../backend/model/streamingAvailability";

function PersonalList() {
  const [userData, setMyList] = useRecoilState(loggedInUserAtom);
  const [concatObject, setConcatObject] = useState<any>([]);
  const [region, setRegion] = useRecoilState(selectedRegionState);
  const [expandedState, setExpandedState] = useState<any>({});
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const myList = userData?.watchlist;
    const fetchData = async (id: string) => {
      let response = await getTitleById(id).catch(error => console.error(error));
      let networks = await getAvailabilityById(id, region).catch(
        (error) => console.log(error)
      );
      if (!networks) {
        networks = { streamingInfo: {}, imdbID: id, region: region };
      }
      if(!response){
        response =  {
          id: crypto.randomUUID(),
          type: TitleType.Movie,
  
          name: "Could not load",
          imageUrl: "https://via.placeholder.com/150",
  
          seasons: [],
          year: 0,
            
          plot: "Could not load.",
          stars: []} as Title}
      return [response as Title, networks];
    };
    if (myList) {
      const newExpandedState = expandedState;
      setIsFetching(true);
      Promise.all(
        myList.map((titleId) => {
          if (!newExpandedState[titleId]) {
            newExpandedState[titleId] = false;
          }
          return fetchData(titleId).then(handleContent);
        })
      ).then((values) => {
        setExpandedState(newExpandedState);
        setConcatObject(values);
        setIsFetching(false);
      });
    }
  }, [region, userData]);
  function handleContent(handle: any) {
    return { ...handle[1], ...handle[0] };
  }
  function removeTitleFromList(titleId: string) {
    if (userData) {
      let newWatchList = [...userData.watchlist];

      newWatchList = newWatchList.filter((id) => id !== titleId);
      setMyList({ ...userData, watchlist: newWatchList });
    }
  }
  const [, setSeason] = useRecoilState(selectedSeasonState);
  function saveSelectedSeason(seasonId: string) {
    setSeason(seasonId);
  }
  const setSelectedTitleId = useSetRecoilState(selectedTitleAtom);
  const setSelectedTitle = useSetRecoilState(selectedTitle);
  function saveSelectedTitle(id: TitleId) {
    setSelectedTitle({} as Title);
    setSelectedTitleId(id);
    getTitleById(id)
      .then((title) => setSelectedTitle(title))
      .catch(() => setSelectedTitle({} as Title));
  }

  function saveSelectedRegion(regionName: string) {
    const findRegionObject = regions.find(({ name }) => name === regionName);
    if (findRegionObject != null) {
      setRegion(findRegionObject["alpha-2"].toLowerCase());
    } else {
      console.error("Region could not be set");
    }
  }
  const findRegionObject = regions.find(
    (obj) => obj["alpha-2"].toLowerCase() == region
  );

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <PersonalListView
      tvShow={concatObject}
      saveSelectedSeason={saveSelectedSeason}
      saveSelectedRegion={saveSelectedRegion}
      regions={regions}
      region={findRegionObject ? findRegionObject.name : ""}
      saveSelectedTitle={saveSelectedTitle}
      removeTitle={removeTitleFromList}
      expandedState={expandedState}
      toggleExpanded={(id: TitleId) => {
        const newExpandedState = { ...expandedState };
        newExpandedState[id] = !newExpandedState[id];
        setExpandedState(newExpandedState);
      }}
    />
  );
}

export default PersonalList;
