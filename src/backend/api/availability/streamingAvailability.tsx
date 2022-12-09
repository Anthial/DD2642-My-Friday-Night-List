import { STREAMING_AVAILABILITY_API_KEY } from "../imdb/apiConfig";
import { handleResponse } from "../imdb/IMDB";

function fetchAvailability(id: string, country :string) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": STREAMING_AVAILABILITY_API_KEY,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };
  const url = `https://streaming-availability.p.rapidapi.com/get/basic?country=${country}&imdb_id=${id}&output_language=en`;
return fetch(url, options).then(handleResponse);
}
export { fetchAvailability };
