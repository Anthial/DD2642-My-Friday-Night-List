import PersonalListView from "../views/personalListView";
import { Stargate } from "../../backend/model/dummyStargate";
import availability from "../../backend/model/streamingAvailabilityDummyStargate";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedSeasonState } from "../../backend/model/personalListModel";

function PersonalList(props: any) {
  function concatenateApis() {
    let concatObject = { ...Stargate, ...availability };
    return concatObject;
  }
const [, setSeason] = useRecoilState(selectedSeasonState)
function saveSelectedSeason(seasonId: string){
  setSeason(seasonId);
}

  return <PersonalListView tvShow={[concatenateApis(), concatenateApis()]} 
  saveSelectedSeason={saveSelectedSeason}/>;
}

export default PersonalList;
