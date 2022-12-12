import PersonalListView from "../views/personalListView";
import { Stargate } from "../../backend/model/dummyStargate";
import availability from "../../backend/model/streamingAvailabilityDummyStargate";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedSeasonState, selectedRegionState } from "../../backend/model/atoms";
import regions from "../../backend/data/ISO-3166-Alpha-2-country-codes"

function PersonalList(props: any) {
  function concatenateApis() {
    let concatObject = { ...Stargate, ...availability };
    return concatObject;
  }
const [, setSeason] = useRecoilState(selectedSeasonState)
function saveSelectedSeason(seasonId: string){
  setSeason(seasonId);
}
const [, setRegion] = useRecoilState(selectedRegionState);
function saveSelectedRegion(regionName: string){
  const findRegionObject = regions.find(({name}) => name === regionName);
// console.log(findRegionObject["alpha-2"].toLowerCase());
  setRegion(findRegionObject["alpha-2"].toLowerCase());
}

  return <PersonalListView tvShow={[concatenateApis(), concatenateApis()]} 
  saveSelectedSeason={saveSelectedSeason}
  saveSelectedRegion={saveSelectedRegion}/>;
}

export default PersonalList;
