import {IMDB_API_KEY} from "./apiConfig"

export enum ApiErrorReason {
    Unknown,
    LimitReached,
    InvalidKey
}

export class ApiError extends Error {
    reason: ApiErrorReason = ApiErrorReason.Unknown;

    constructor(message: string, reason: ApiErrorReason) {
        super(message);
        this.reason = reason;
    }
}

function handleResponse(response: Response){
    let errorReason = ApiErrorReason.Unknown;

    if (response.status !== 200){
        /* Forbidden */
        if(response.status === 403) {
            errorReason = ApiErrorReason.InvalidKey;
        }
        /* Too Many Requests */
        if(response.status === 429) {
            errorReason = ApiErrorReason.LimitReached;
        }

        throw new ApiError("Could not access data, status: " + response.status, errorReason);
    }

    return response.json().then((responseObj: any) => {    
        if(responseObj && responseObj.errorMessage) {
            if(responseObj.errorMessage.includes("Maximum usage")) {
                errorReason = ApiErrorReason.LimitReached;
            }
            
            if(responseObj.errorMessage.includes("Invalid API Key")) {
                errorReason = ApiErrorReason.InvalidKey;
            }
            
            throw new ApiError("Could not access data, error message: " + responseObj.errorMessage, errorReason);
        }

        return responseObj;
    });
}

function fetchSearchResults(query: string){
    const escapedQuery = new URLSearchParams(query).toString();
    const allowedTypes = "feature,tv_movie,tv_series,tv_special,documentary";
    const url = `https://imdb-api.com/en/API/AdvancedSearch/${IMDB_API_KEY}?title=${escapedQuery}&title_type=${allowedTypes}&sort=moviemeter,asc`;

    return fetch(url, {"method": "GET"}).then(handleResponse);
}

function fetchEpisodes(id:string, season: string){
    const url = `https://imdb-api.com/en/API/SeasonEpisodes/${IMDB_API_KEY}/${id}/${season}`;
    return fetch(url, {"method": "GET"}).then(handleResponse);
}

function fetchTrivia(id:string){
    const url = `https://imdb-api.com/en/API/FAQ/${IMDB_API_KEY}/${id}`;
    return fetch(url, {"method": "GET"}).then(handleResponse);
}

function fetchTitle(id:string){
    const url = `https://imdb-api.com/en/API/Title/${IMDB_API_KEY}/${id}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,`
    return fetch(url, {"method": "GET"}).then(handleResponse);
}

export {fetchSearchResults, fetchEpisodes, fetchTrivia, fetchTitle, handleResponse}