import {IMDB_API_KEY} from "./apiConfig"


function handleResponse(response: Response){
    if (response.status !== 200){
        throw new Error("Could not access data, status: " + response.status);
    }
    return response.json();

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