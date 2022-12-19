import { fetchAvailability } from "../api/availability/streamingAvailability";
import { ApiError } from "../api/imdb/imdb";
import { cacheAvailabilityInFirebase, getAvailabilityFromFirebase } from "../firebase/cache";
import { Availability } from "./availability";
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

export function getAvailabilityById(id: TitleId, region: string): Promise<Availability> {
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
    });
}
