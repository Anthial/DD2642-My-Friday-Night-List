import { fetchTitle } from "../api/imdb/imdb";
import { fetchAvailability } from "../api/availability/streamingAvailability";
import { Stargate } from "./dummyStargate";
import availability from "./streamingAvailabilityDummyStargate";
import react from "react";

const dummyFirebaseMyList = ["tt0118480", "tt0118480"];



function concatenateApiData(imdb: object, streamingAvailability: object) {
  return { ...imdb, ...streamingAvailability };
}

function handle(handle: any) {
  console.log(handle);
  return handle;
}

// const imdbData = fetchTitle(dummyFirebaseMyList[0]).then(handle);
// console.log(imdbData);
// // const region = useRecoilValue(regionState)
// const availabilityData = fetchAvailability(dummyFirebaseMyList[0], "us").then(handle);
// console.log(availabilityData);
