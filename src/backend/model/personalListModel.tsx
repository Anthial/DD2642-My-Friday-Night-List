import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fetchTitle } from "../api/imdb/IMDB";
import {fetchAvailability } from "../api/availability/streamingAvailability"
import { Stargate } from "../../backend/model/dummyStargate";
import availability from "../../backend/model/streamingAvailabilityDummyStargate";
import react from "react"

const dummyFirebaseMyList = ["tt0118480", "tt0118480"]
 
const myListState = atom({
  key: "myList", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
export const selectedSeasonState = atom({
  key: 'selectedSeason',
  default: "",
}) 
export const regionState = atom({
  key: "selectedRegion",
  default: "us"
})


function concatenateApiData(imdb: object, streamingAvailability: object) {
  return { ...imdb, ...streamingAvailability };
}

function handle (handle:any) {
  console.log(handle);
  return handle
}
const imdbData = fetchTitle(dummyFirebaseMyList[0]).then(handle)
console.log(imdbData)
// const region = useRecoilValue(regionState)
const availabilityData = fetchAvailability(dummyFirebaseMyList[0], "us").then(handle)
console.log(availabilityData)

const MyListCreator=()=>{
  //use the useSetRecoilState hook to update the myListState atom
  const setMyList = useSetRecoilState(myListState);
  
 
  const showToAdd = concatenateApiData(Stargate,availability);
  const addShow = ()=>{

  }

}

