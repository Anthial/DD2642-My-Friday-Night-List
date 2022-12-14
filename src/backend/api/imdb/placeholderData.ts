import { Title, TitleType } from "../../model/title";

/* https://www.imdb.com/chart/top/ and https://www.imdb.com/chart/toptv/  */
export const imdbPlaceholderData: Title[] = [
	{
		id: "tt0111161",
		name: "The Shawshank Redemption",
		imageUrl: "placeholder/tt0111161.jpg",

		type: TitleType.Movie,
		seasons: [],

		year: 2000,
		plot: "...",
		stars: []
	},
	{
		id: "tt0068646",
		name: "The Godfather",
		imageUrl: "placeholder/tt0068646.jpg",

		type: TitleType.Movie,
		seasons: [],

		year: 2000,
		plot: "...",
		stars: []
	},
	{
		id: "tt0468569",
		name: "The Dark Knight",
		imageUrl: "placeholder/tt0468569.jpg",

		type: TitleType.Movie,
		seasons: [],

		year: 2000,
		plot: "...",
		stars: []
	},
	{
		id: "tt5491994",
		name: "Planet Earth II",
		imageUrl: "placeholder/tt5491994.jpg",

		type: TitleType.TVShow,
		seasons: ["1", "2", "3", "4", "5", "6"],

		year: 2000,
		plot: "...",
		stars: []
	},
	{
		id: "tt0903747",
		name: "Breaking Bad",
		imageUrl: "placeholder/tt0903747.jpg",

		type: TitleType.TVShow,
		seasons: ["1", "2", "3", "4"],

		year: 2000,
		plot: "...",
		stars: []
	},
	{
		id: "tt0795176",
		name: "Planet Earth",
		imageUrl: "placeholder/tt0795176.jpg",

		type: TitleType.TVShow,
		seasons: ["1", "2", "3"],

		year: 2000,
		plot: "...",
		stars: []
	}
];