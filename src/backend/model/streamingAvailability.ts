import { fetchAvailability } from "../api/availability/streamingAvailability";
import { cacheAvailabilityInFirebase, getAvailabilityFromFirebase } from "../firebase/cache";
import { Availability } from "./availability";
import streamingAvailabilityDummyStargate from "./streamingAvailabilityDummyStargate";
import { TitleId } from "./title";

export function getAvailabilityById(id: TitleId, region: string, usePlaceHolderData: boolean): Promise<Availability> {
    if (usePlaceHolderData) {
        const result = {...streamingAvailabilityDummyStargate, region: "us"};
        if (result) {
            return Promise.resolve(result);
        }
        return Promise.reject(new Error("Not found in placeholder data"));
    } else {
        //Check if Firebase has title cached, if not fetch data from API and cache the data
        return getAvailabilityFromFirebase(id, region).catch(( )=> {
            return fetchAvailability(id, region).then(result =>{
                const availability = {
                    imdbID: result.imdbID,
                    streamingInfo: result.streamingInfo,
                    region: Object.keys(Object.keys(result.streamingInfo)[0])[0]
                }
                cacheAvailabilityInFirebase(availability);
                return availability;
            })
        })
    }
}
