import React from "react";

function PersonalListView(props: any) {
  // console.log(props);
  console.log(props.availability);

  return (
    <div>
      <h1 className="underline decoration-solid decoration-4 underline-offset-4 ml-4 mt-4 mb-4">
        My list
      </h1>
      {console.log(props.tvShow)}
      {props.tvShow.map(renderMainContent)}
    </div>
  );
}

function renderSeasons(season: any) {
  console.log("test");
  return (
    <div className="inline-block whitespace-pre pl-[120px] flex">
      Season {season}
    </div>
  );
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

  // console.log(tvShow);
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
        <div
          className="hover:border-b border-solid border-[#b7e4c7] hover:cursor-pointer"
          onClick={expandACB}
        >
          <span className="mr-2.5">{tvShow.fullTitle}</span>
          <span className="text-[#b7e4c7] whitespace-pre">Origin: </span>
          <span className="mr-2.5">{tvShow.countries}</span>
          <span className="text-[#b7e4c7] whitespace-pre">Watched: </span>
          <span> x/total</span>
        </div>
        <div>
          <span></span>
        </div>

        <button
          className="ml-2.5 bg-[#312244] py-0 px-1.5 hover:shadow-lg"
          onClick={expandACB}
        >
          Ex
        </button>
      </div>
      {expandedContent(tvShow.tvSeriesInfo.seasons)}
    </div>
  );
}
export default PersonalListView;
