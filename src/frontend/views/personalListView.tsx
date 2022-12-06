import React from "react";

function PersonalListView(props: any) {
  console.log(props);

  return (
    <div>
      <h1 className="underline decoration-solid decoration-4 underline-offset-4 ml-4 mt-4 mb-4">
        My list
      </h1>
      {/* {console.log(props.tvShow)} */}
      {props.tvShow.map(renderMainContent)}
    </div>
  );
}

function renderSeasons(season: any) {
  // console.log("test");
  return (
    <div className="inline-block whitespace-pre pl-[120px]">
      Season {season}
    </div>
  );
}
function renderLinks(links: any) {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const region: string = Object.keys(links[1])[0];
  // console.log(Object.keys(links[1])[0]);
  return (
    // <div className="border bg-[#312244] border-[#312244] px-2 rounded-lg hover:border-[#646cff]">
    <a
      className="border bg-[#312244] border-[#312244] px-2 rounded-lg hover:border-[#646cff] mx-2 text-white"
      href={links[1][region].link}
    >
      {capitalizeFirstLetter(links[0])}
    </a>
    // </div>
  );
}
function renderCountries(country: string) {
  return <span>{country} / </span>;
}

function renderMainContent(tvShow: any) {
  const [expand, setExpand] = React.useState(false);

  function expandACB() {
    setExpand(!expand);
  }

  function expandedContent(seasons: any) {
    if (expand) {
      return <div>{seasons.map(renderSeasons)}</div>;
    }
    return <div></div>;
  }
  function generateStreamingLinks(streamingInfo: object) {
    // console.log(Object.entries(streamingInfo)); //gives me an array containing the keys for the streaming objects
    return <div>{Object.entries(streamingInfo).map(renderLinks)}</div>;
  }
  function getCountries(countries) {
    console.log(countries);
    return <span>{countries.map(renderCountries)}</span>;
  }
  return (
    <div
      key={tvShow.id}
      className="ml-2 flex flex-col text-lg mt-2 w-[500px] lg:w-[900px]"
    >
      <div className="ml-2  items-center flex text-lg mt-2">
        <img
          src={tvShow.image}
          className="inline w-[100px] object-cover rounded-md mr-2"
        ></img>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div
              className="hover:border-b border-solid border-[#b7e4c7] hover:cursor-pointer"
              onClick={expandACB}
            >
              <span className="mr-2.5">{tvShow.fullTitle}</span>
              <span className="text-[#b7e4c7] whitespace-pre">Origin: </span>
              {getCountries(tvShow.countries)}
            </div>
            <button
              id="expand-icon"
              className="ml-2.5 bg-[#312244] py-0 px-1.5 hover:shadow-lg "
              onClick={expandACB}
            >
              <img
                id="expand-icon"
                className="w-4 bg-transparent ${}"
                src="/src/assets/expand-down-arrow-ico.png"
                alt="expand down arrow"
              />
            </button>
          </div>
          <div className="flex text-[#b7e4c7] pt-1">
            Watch at: {generateStreamingLinks(tvShow.streamingInfo)}
          </div>
        </div>
      </div>
      {expandedContent(tvShow.tvSeriesInfo.seasons)}
    </div>
  );
}
export default PersonalListView;
