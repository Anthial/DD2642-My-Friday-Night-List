import { UserAccount, UserData } from "../../model/user";

export const userAccountPlaceholders: UserAccount[] = [
	{ 
		username: "aurora97",
		password: "password1"
	},
	{
		username: "olander.elise",
		password: "CHhMCi6MLKZ3Jkc41qaJShM9fKhrc6qk"
	},
	{
		username: "eken",
		password: "654321"
	},
	{
		username: "emelia_634985",
		password: "abcabc123"
	}
]

/* https://fejk.se/ */
export const userDataPlaceholders: UserData[] = [
	{
		id: 1000,

		username: "aurora97",
		name: "Aurora Wirén",

		watchlist: ["tt0468569", "tt0903747"]
	},
	{
		id: 2000,

		username: "olander.elise",
		name: "Elsie Olander",

		watchlist: ["tt0797603", "tt0068646", "tt0111161"]
	},
	{
		id: 3000,

		username: "eken",
		name: "Hans-Åke Ek",

		watchlist: ["tt0111161", "tt0068646", "tt0468569", "tt5491994", "tt0903747", "tt0795176"]
	},
	{
		id: 4000,

		username: "emelia_634985",
		name: "Emelia Lundahl",

		watchlist: []
	}
]