import { TitleId } from "./title";

export interface Availability {
    imdbID: TitleId,
    streamingInfo: any
    region: string
}