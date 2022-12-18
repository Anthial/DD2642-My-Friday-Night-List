import { fetchAvailability } from "../api/availability/streamingAvailability";
import { ApiError } from "../api/imdb/IMDB";
import { cacheAvailabilityInFirebase, getAvailabilityFromFirebase } from "../firebase/cache";
import { Availability } from "./availability";
import streamingAvailabilityDummyStargate from "./streamingAvailabilityDummyStargate";
import { TitleId } from "./title";
import { isValidResult } from "./util";

export type StreamingAvailabilityErrorObserver = (error: ApiError) => void;
let streamingAvailabilityErrorObservers: StreamingAvailabilityErrorObserver[] = [];

export function addStreamingAvailabilityErrorObserver(observer: StreamingAvailabilityErrorObserver) {
	streamingAvailabilityErrorObservers.push(observer);
}

export function removeStreamingAvailabilityErrorObserver(observer: StreamingAvailabilityErrorObserver) {
	streamingAvailabilityErrorObservers = streamingAvailabilityErrorObservers.filter(o => o !== observer);
}

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
				if(!isValidResult(result, ["imdbID", "streamingInfo"])) {
					throw new Error("Invalid result object (API limit reached?)");
				}

                console.log(region);

                const availability = {
                    imdbID: result.imdbID,
                    streamingInfo: result.streamingInfo,
                    region: region
                }
                cacheAvailabilityInFirebase(availability);
                return availability;
            })
            .catch((e: Error) => {
                if(e instanceof ApiError) {
                    streamingAvailabilityErrorObservers.map(o => o(e));
                }

                throw e;
            })
        })
    }
}
