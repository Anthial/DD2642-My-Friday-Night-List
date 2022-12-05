import PersonalListView from "../views/personalListView";
import myTvShows from "../../backend/model/dummyTvData";
import episodes from "../../backend/model/stargateEpisodes";

function PersonalList(props: any) {
  // console.log(props);
  // console.log(TvSeries);
  console.log(episodes);
  return <PersonalListView tvShow={myTvShows} episodes={episodes} />;
}

export default PersonalList;
