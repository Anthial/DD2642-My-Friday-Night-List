import { SearchResult, TitleId } from "../../backend/model/title";
import { IconDots, IconHeartPlus, IconArrowLeft, IconArrowRight, IconHeartMinus } from '@tabler/icons';
import { Link } from "react-router-dom";

export interface SearchResultsProps {
	titles: SearchResult[],
	
	isUserLoggedIn: boolean,
	userWatchlist: TitleId[],

	page: number,
	maxPage: number,

	onModifyList: (title: SearchResult) => void,
	onSelectTitle: (title: SearchResult) => void
	onNavigatePage: (offset: number) => void
};

function SearchEntry(props: SearchResultsProps, title: SearchResult) {
	const addToDivStyle = props.isUserLoggedIn ? "" : "pointer-events-none";
	
	return (
		<div key={title.id} className="min-w-[16rem] h-96 mx-12 my-6 flex justify-center">
			<div style={{backgroundImage: `url(${title.imageUrl})`}} 
				className={`${addToDivStyle} group overflow-hidden bg-cover basis-64 h-96 rounded-lg overflow-hidden relative`}>
				<div className="w-64 h-64 bg-gradient-to-t from-black/90 to-transparent absolute bottom-0"></div>
				<span className="text-center absolute bottom-0 w-full origin-bottom -translate-y-4 transition-transform duration-100 group-hover:-translate-y-14 pointer-events-none">
					<span className="font-bold pl-1 pr-1">{title.name}</span>
				</span>
				<div className="h-6 absolute -bottom-6 flex w-full justify-center transition-transform duration-100 group-hover:-translate-y-10">
					<Link to="/search" onClick={e => props.onModifyList(title)} className="hover:scale-110 active:scale-90">
						{!props.userWatchlist.includes(title.id) && <IconHeartPlus className="inline align-middle mr-1"></IconHeartPlus>}
						{props.userWatchlist.includes(title.id) && <IconHeartMinus className="inline align-middle mr-1"></IconHeartMinus>}
					</Link>
					<Link to="/details" onClick={e => props.onSelectTitle(title)} className="hover:scale-110 active:scale-90">
						<IconDots className="inline align-middle mr-1"></IconDots>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function SearchResultsView(props: SearchResultsProps) {
	const leftEnabled = props.page > 0;
	const rightEnabled = props.page < props.maxPage - 1;

	const leftStyle = leftEnabled ? "hover:bg-black/30 hover:cursor-pointer" : "opacity-60 pointer-events-none";
	const rightStyle = rightEnabled ? "hover:bg-black/30 hover:cursor-pointer" : "opacity-60 pointer-events-none";

	return (
		<div id="search-results-view" className="w-full shrink-0 grow flex justify-center items-center px-[5%] py-12 flex-col select-none">
			<div className="w-full grow flex justify-center items-center flex-wrap">
				{props.titles.map(title => SearchEntry(props, title))}
			</div>
			<div className="w-full h-6"></div>
			{props.maxPage > 1 && <div className="flex bg-[#006466] w-32 h-10 rounded-md overflow-hidden">
				<div className={`${leftStyle} flex shrink-0 grow-0 basis-10 h-10 justify-center items-center`} onClick={e => props.onNavigatePage(-1)}>
					<IconArrowLeft className="inline w-8 h-8"></IconArrowLeft>
				</div>
				<span className="shrink grow font-bold text-center leading-10 align-middle pointer-events-none">
					{`${props.page+1}/${props.maxPage}`}
				</span>
				<div className={`${rightStyle} flex shrink-0 grow-0 basis-10 h-10 justify-center items-center`} onClick={e => props.onNavigatePage(1)}>
					<IconArrowRight className="inline w-8 h-8"></IconArrowRight>
				</div>
			</div>}
		</div>
	);
}