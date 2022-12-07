import React from "react";

function PersonalListView(props: any) {
  // console.log(props);

  return (
    <div>
      <h1 className="underline decoration-solid decoration-4 underline-offset-4 ml-4 mt-4 mb-4">
        My list
      </h1>
      {props.tvShow.map(renderMainContent)}
    </div>
  );
}

function renderMainContent(tvShow: any) {
  function expandACB() {
    console.log("test");
    <div className="border-b border-solid">Test</div>;
  }
  // console.log(tvShow);
  return (
    <div key={tvShow.id} className="ml-2  items-center flex text-lg mt-2">
      <img
        src={tvShow.img}
        className="inline w-[100px] object-cover rounded-md mr-2"
      ></img>
      <div
        className="hover:border-b border-solid border-[#b7e4c7]"
        onClick={expandACB}
      >
        <span className="mr-2.5">{tvShow.title}</span>
        <span className="text-[#b7e4c7] whitespace-pre">Origin: </span>
        <span className="mr-2.5">{tvShow.origin}</span>
        <span className="text-[#b7e4c7] whitespace-pre">Watched: </span>
        <span> x/total</span>
      </div>

      <button
        className="ml-2.5 bg-[#312244] py-0 px-1.5 hover:shadow-lg"
        onClick={expandACB}
      >
        Ex
      </button>
    </div>
  );
}
export default PersonalListView;
