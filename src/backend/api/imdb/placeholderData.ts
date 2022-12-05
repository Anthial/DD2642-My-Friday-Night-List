import { Title, TitleType } from "../../model/title";

/* https://www.imdb.com/chart/top/ and https://www.imdb.com/chart/toptv/  */
export const imdbPlaceholderData: Title[] = [
	{
		id: "tt0111161",
		name: "The Shawshank Redemption",
		imageUrl: "public/placeholder/tt0111161.jpg",

		type: TitleType.Movie,
		episodes: 0
	},
	{
		id: "tt0068646",
		name: "The Godfather",
		imageUrl: "public/placeholder/tt0068646.jpg",

		type: TitleType.Movie,
		episodes: 0
	},
	{
		id: "tt0468569",
		name: "The Dark Knight",
		imageUrl: "public/placeholder/tt0468569.jpg",

		type: TitleType.Movie,
		episodes: 0
	},
	{
		id: "tt5491994",
		name: "Planet Earth II",
		imageUrl: "public/placeholder/tt5491994.jpg",

		type: TitleType.TVShow,
		episodes: 6
	},
	{
		id: "tt0903747",
		name: "Breaking Bad",
		imageUrl: "public/placeholder/tt0903747.jpg",

		type: TitleType.TVShow,
		episodes: 4
	},
	{
		id: "tt0795176",
		name: "Planet Earth",
		imageUrl: "public/placeholder/tt0795176.jpg",

		type: TitleType.TVShow,
		episodes: 3
	}
];