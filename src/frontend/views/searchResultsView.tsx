import { SearchResult, Title, TitleType } from "../../backend/model/title";
import { IconDeviceTv, IconMovie, IconDots, IconHeartPlus } from '@tabler/icons';
import { Link } from "react-router-dom";

function Spinner() {
	return (
		<img src="spinner.svg" width="128" height="128"></img>
	)
}

export interface SearchResultsProps {
	loading: boolean,
	titles: SearchResult[],

	onSelectTitle: (title: SearchResult) => void
};

function SearchEntry(title: SearchResult, onSelectTitle: (t: SearchResult) => void) {
	return (
		<div key={title.id} className="basis-[20%] min-w-[16rem] h-96 shrink-1 grow-1 m-6 flex justify-center">
			<div style={{backgroundImage: `url(${title.imageUrl})`}} 
				className="group overflow-hidden bg-cover basis-64 h-96 rounded-lg overflow-hidden relative">
				<div className="w-64 h-64 bg-gradient-to-t from-black/90 to-transparent absolute bottom-0"></div>
				<span className="text-center absolute bottom-0 w-full origin-bottom -translate-y-4 transition-transform duration-100 group-hover:-translate-y-14 pointer-events-none">
					<span className="font-bold">{title.name}</span>
				</span>
				<div className="h-6 absolute -bottom-6 flex w-full justify-center transition-transform duration-100 group-hover:-translate-y-10">
					<Link to="/search" className="hover:scale-110"><IconHeartPlus className="inline align-middle mr-1"></IconHeartPlus></Link>
					<Link to="/details" onClick={() => onSelectTitle(title)} className="hover:scale-110"><IconDots className="inline align-middle mr-1"></IconDots></Link>
				</div>
			</div>
		</div>
	);
}

export default function SearchResultsView(props: SearchResultsProps) {
	return (
		<div id="search-results-view" className="w-full shrink-0 grow flex justify-center items-center px-[5%] py-12 flex-wrap">
			{props.titles.map((title) => SearchEntry(title, props.onSelectTitle))}
			{props.loading && <Spinner></Spinner>}
		</div>
	);
}