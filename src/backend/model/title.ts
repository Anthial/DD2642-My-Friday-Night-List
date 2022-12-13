/* IMDb uses a unique string as identifer for a title */
export type TitleId = string;
export type EpisodeId = string;

export enum TitleType {
	Movie,
	TVShow
}

export interface Episode {
	id: EpisodeId,

	season: number,
	episode: number
}

export interface Title {
    id: TitleId,
    type: TitleType,

    name: string,
    imageUrl: string,

    seasons: string[],
    year: number,

    plot: string,
    stars: string[]
}