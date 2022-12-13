import {IMDB_API_KEY, TENOR_API_KEY} from "./apiConfig"


function handleResponse(response: any){
    if (response.status !== 200){
        throw new Error("Could not access data, status: " + response.status);
    }
    return response.json();

}

function readJSON(json: any){
    console.log(json);
    return json;
}

function fetchSearchResults(query: string){
    const url =  `https://imdb-api.com/en/API/SearchSeries/${IMDB_API_KEY}/${query}`;
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

function fetchTestTenor(query:string){
    const url = `https://g.tenor.com/v1/search?q=${query}&key=${TENOR_API_KEY}`
    return fetch(url, {"method": "GET"}).then(handleResponse);
}

export {fetchSearchResults, fetchEpisodes, fetchTrivia, fetchTestTenor, fetchTitle, handleResponse}