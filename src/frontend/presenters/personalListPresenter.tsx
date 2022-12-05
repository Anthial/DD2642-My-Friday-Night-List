import PersonalListView from "../views/personalListView";
import myTvShows from "../../backend/model/dummyTvData";
import { Stargate } from "../../backend/model/dummyStargate";
import { dummyMainContent } from "../../backend/model/dummyStargate";
import availability from "../../backend/model/streamingAvailabilityDummyStargate";

function PersonalList(props: any) {
  function concatenateApis() {
    let myShows = [];
  }
  // console.log(props);
  // console.log(stargate);
  return (
    <PersonalListView
      tvShow={[Stargate, Stargate]}
      availability={availability.streamingInfo}
    />
  );
}

export default PersonalList;
