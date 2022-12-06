import { Title, TitleType } from "../../backend/model/title";

function Spinner() {
	return (
		<img src="spinner.svg" width="128" height="128"></img>
	)
}

export interface SearchResultsProps {
	loading: boolean,
	titles: Title[]
};

export default function SearchResultsView(props: SearchResultsProps) {
	return (
		<div id="search-results-view" className="w-full shrink-0 grow flex justify-center items-center px-[5%] py-12 flex-wrap">
			{
				props.titles.map((title) => {
					return (
						<div key={title.id} 
							className="basis-[20%] min-w-[16rem] h-80 shrink-1 grow-1 m-6 flex justify-center">
							<div style={{backgroundImage: `url(${title.imageUrl})`}} 
								className="group overflow-hidden bg-cover basis-64 h-80 shrink-0 grow-0 rounded-lg flex flex-col hover:cursor-pointer">
								<div className="w-full h-12 mt-auto bg-[#312244] translate-y-12 group-hover:translate-y-0 transition-transform duration-100">
									<div>{title.name}</div>
									<div>{title.type == TitleType.Movie ? "Movie" : "TV Show"}</div>
								</div>
							</div>
						</div>
					);
				})
			}
			{props.loading && <Spinner></Spinner>}
		</div>
	);
}