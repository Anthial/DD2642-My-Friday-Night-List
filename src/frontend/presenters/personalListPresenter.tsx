import PersonalListView from "../views/personalListView";
import { Stargate } from "../../backend/model/dummyStargate";
import availability from "../../backend/model/streamingAvailabilityDummyStargate";

function PersonalList(props: any) {
  function concatenateApis() {
    let concatObject = { ...Stargate, ...availability };
    return concatObject;
  }
  return <PersonalListView tvShow={[concatenateApis(), concatenateApis()]} />;
}

export default PersonalList;
