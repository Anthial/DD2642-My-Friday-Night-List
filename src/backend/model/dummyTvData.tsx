const dummyTvSeries1 = {
  id: 6969,
  img: "https://images.unsplash.com/photo-1665036055593-c739c119a0dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
  title: "The Greatest Fake TV Show Ever",
  numOfSeasons: 2,
  origin: "Canada",
  seasonEpisodes: {
    season1: {
      episode1: "The Start",
      episode2: "The Continuation",
      episode3: "The Middle",
      episode4: "The Beginning of the End",
      episode5: "The End",
    },
    season2: {
      episode1: "The New Start",
      episode2: "The Second Continuation",
      episode3: "The Second Middle",
      episode4: "The Start of the End",
      episode5: "The Final End",
    },
  },
  watchHere: {
    netflix: "www.netflix.com",
    prime: "primevideo.com",
    viaPlay: "www.viaplay.se",
  },
};
const dummyTvSeries2 = {
  id: 9999,
  img: "https://images.unsplash.com/photo-1665036055593-c739c119a0dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
  title: "The Second Greatest Fake TV Show Ever",
  numOfSeasons: 1,
  origin: "USA",
  seasonEpisodes: {
    season1: {
      episode1: "The Start",
      episode2: "The Continuation",
      episode3: "The Middle",
      episode4: "The Beginning of the End",
      episode5: "The End",
    },
  },
  watchHere: {
    netflix: "www.netflix.com",
    prime: "primevideo.com",
    viaPlay: "www.viaplay.se",
  },
};
export default [dummyTvSeries1, dummyTvSeries2];
