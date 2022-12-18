import { fetchAvailability } from "../api/availability/streamingAvailability";
import { cacheAvailabilityInFirebase, getAvailabilityFromFirebase } from "../firebase/cache";
import { Availability } from "./availability";
import { TitleId } from "./title";
import { isValidResult } from "./util";

export function getAvailabilityById(id: TitleId, region: string): Promise<Availability> {
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
    });
}
