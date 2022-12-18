import { Link } from "react-router-dom";
import { IconChevronsUp, IconX } from "@tabler/icons";
import { IconChevronsDown } from "@tabler/icons";

function PersonalListView(props: any) {
  // console.log(props.tvShow);

  return (
    <div className="flex flex-col ">
      <h1 className="flex justify-center underline decoration-solid decoration-4 underline-offset-4  mt-4 mb-4">
        My list
      </h1>
      {props.tvShow.length !== 0 ? (
        <div className="mb-10 flex flex-col ">
          <div className="flex flex-row box-border  self-stretch lg:px-[35%] md:px-[25%] px-[20%] w-full">
            <select
              name="selected-country"
              id="country-select"
              className="hover:shadow-lg bg-[#312244] hover:bg-[#251a33] rounded-lg border-transparent hover:border-[#646cff] outline-[0px] hover:outline hover:outline-[1px] outline-[#646cff]
          text-center min-w-full p-1 text-ellipsis  "
              onChange={(event) => props.saveSelectedRegion(event.target.value)}
              value={props.region}
            >
              <option className="" disabled value="">
                - - - Select watch region - - -
              </option>
              {generateRegions(props)}
            </select>
          </div>
          <div className="mb-2 mx-4 flex lg:flex-row flex-col justify-around flex-wrap">
            {props.tvShow.map((tvshow: any) =>
              renderMainContent(tvshow, props)
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center  text-center w-full lg:px-[25%] md:px-[20%] px-[10%]">
          Add movies and series from search to get your personal watchlist! Now
          with links to where you can watch them for a selected region!
        </div>
      )}
    </div>
  );
}

function renderSeasons(
  season: any,
  saveSelectedSeason: any,
  saveSelectedTitle: any,
  id: string
) {
  return (
    <div key={season} className="mt-2  whitespace-pre mx-2">
      <Link
        to="/episodes"
        className=" bg-[#4d194d] py-0 px-1.5 hover:shadow-lg hover:bg-[#251a33] rounded-lg border-transparent hover:border-[#646cff] outline-[0px] hover:outline hover:outline-[1px] outline-[#646cff]"
        onClick={() => {
          saveSelectedTitle(id);
          saveSelectedSeason(season);
        }}
      >
        Season {season}
      </Link>
    </div>
  );
}
function renderLinks(links: any) {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const region: string = Object.keys(links[1])[0];
  return (
    <a
      key={links[0]}
      className="border bg-[#4d194d] border-[#4d194d] px-2 rounded-lg hover:border-[#646cff] mx-2 text-white hover:bg-[#251a33]"
      href={links[1][region].link}
      target="_blank" rel="noreferrer"
    >
      {capitalizeFirstLetter(links[0])}
    </a>
  );
}

function generateRegions(props: any) {
  return props.regions.map((regions: any) => {
    return (
      <option key={regions.name} value={regions.name}>
        {regions.name}
      </option>
    );
  });
}

function renderMainContent(tvShow: any, props: any) {
  function expandACB() {
    props.toggleExpanded(tvShow.id);
  }

  function expandedContentACB(
    seasons: any,
    saveSelectedSeason: any,
    saveSelectedTitle: any,
    id: string
  ) {
    if (props.expandedState[tvShow.id]) {
      return (
        <div className="flex flex-wrap w-full justify-center bg-[#006466] rounded-b-lg p-3">
          {seasons.map((season: string) =>
            renderSeasons(season, saveSelectedSeason, saveSelectedTitle, id)
          )}
        </div>
      );
    }
    return <div></div>;
  }
  function generateStreamingLinksCB(streamingInfo: object) {
    // console.log(Object.entries(streamingInfo)); //gives me an array containing the keys for the streaming objects
    return <div>{Object.entries(streamingInfo).map(renderLinks)}</div>;
  }

  const roundedStyle = props.expandedState[tvShow.id]
    ? "rounded-t-lg"
    : "rounded-lg";

  return (
    <div
      key={tvShow.id}
      className="flex flex-col text-lg mt-5 lg:w-[33%] justify-start items-center p-1"
    >
      <div className={`flex w-full bg-[#006466] ${roundedStyle} p-3`}>
        {/* image */}
        <div className="mr-3">
          <Link
            to="/details"
            className="mb-2"
            onClick={() => props.saveSelectedTitle(tvShow.id)}
          >
            <img
              src={tvShow.imageUrl}
              className="w-[150px] h-[150px] object-cover rounded-lg "
            ></img>
          </Link>
        </div>
        {/* title, origin, watch at, buttons */}
        <div className="flex flex-row items-center h-full w-full justify-start">
          {/* title, origin, watch at */}
          <div className="flex flex-col w-full">
            {/* title and origin text for show */}
            <div className="flex lg:flex-row flex-col hover:border-b hover:pb-0 pb-[1px] border-solid border-[#b7e4c7] hover:cursor-pointer">
              <Link
                to="/details"
                onClick={() => props.saveSelectedTitle(tvShow.id)}
              >
                <div className="mr-2.5">{tvShow.name}</div>
                <div>
                  <span className="text-[#90e0ef] whitespace-pre">
                    Origin:{" "}
                  </span>
                  {/*getCountriesCB(tvShow.country)*/}
                  <span>{tvShow.country}</span>
                </div>
              </Link>
            </div>
            {/* Render watch at and links */}
            <div className="">
              {(Object.keys(tvShow.streamingInfo).length !== 0) ? (
                <div className="flex flex-row flex-wrap text-[#90e0ef]">
                  <span>Watch at: </span>
                  <span> {generateStreamingLinksCB(tvShow.streamingInfo)}</span>
                </div>
              ) : (
                <div className="flex flex-row flex-wrap text-[#90e0ef]">
                  <span>Not available in the chosen region</span>
                </div>
              )}
            </div>
          </div>
          {/* Render expand content button, remove button  */}
          <div className="flex self-start">
            {tvShow.seasons && (
              <div className="mr-1">
                <button
                  id="expand-icon"
                  className=" bg-[#4d194d] hover:bg-[#251a33] py-0 px-1.5 hover:shadow-lg "
                  onClick={expandACB}
                >
                  {props.expandedState[tvShow.id] ? (
                    <IconChevronsUp></IconChevronsUp>
                  ) : (
                    <IconChevronsDown></IconChevronsDown>
                  )}
                </button>
              </div>
            )}
            <div>
              <Link to="/mylist">
                <button
                  className=" px-0 py-0 bg-[#880808] hover:bg-[#251a33] hover:shadow-lg  items-center"
                  onClick={() => props.removeTitle(tvShow.id)}
                >
                  <IconX></IconX>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        {expandedContentACB(
          tvShow.seasons ? tvShow.seasons : null,
          props.saveSelectedSeason,
          props.saveSelectedTitle,
          tvShow.id
        )}
      </div>
    </div>
  );
}
export default PersonalListView;
