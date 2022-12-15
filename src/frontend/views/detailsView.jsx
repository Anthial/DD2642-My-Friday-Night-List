import { map, truth_, not, nil_QMARK_, some_QMARK_, empty_QMARK_ } from 'cherry-cljs/lib/cljs_core.js'
import { Link } from 'react-router-dom';
import { createElement } from 'react';
var generate_view = function (episode) {
let id1 = episode["id"];
let episode_number2 = episode["episodeNumber"];
let title3 = episode["title"];
let image4 = episode["image"];
let release5 = episode["released"];
let description6 = episode["plot"];
return <div key={id1} className="flex container flex-col items-center text-center w-full md:w-80 h-[600px] mt-2 \n                            bg-[#006466] p-8 m-2 lg:m-5 rounded-lg lg:hover:scale-105 lg:hover:duration-300 \n                            lg:hover:shadow-2xl"><div><img src={image4} className="flex w-80 h-40 object-cover"></img></div> <div className="flex flex-col items-center text-center mt-2"><div className="w-40 font-bold text-xl lg:text-2xl lg:w-64">Episode  {episode_number2} :  {title3}</div></div> <div className="flex flex-col items-center mt-4"><span className="w-64 h-40 overscroll-auto hover:overscroll-contain text-left overflow-y-auto">{description6}</span></div> <div className="flex justify-center text-center mt-3 relative w-full h-32"><div className="w-30 font-bold text-md absolute inset-x-0 bottom-0">Episode Released:  {release5}</div></div></div>;
}
;
var generate_stars = function (star) {
return <div>{star}</div>;
}
;
var generate_button = function (season, props) {
return <button onClick={function (event) {
return props["setSelectedSeason"].call(null, season);
}} className="m-2 bg-[#4D194D]">{season}</button>;
}
;
var generate_movie_view = function (plot, stars, src, seasons, props) {
return <div className="flex flex-col text-center items-center mt-4 bg-[#006466] h-full w-full lg:w-[50%] p-2 lg:px-16 m-2 lg:m-5 rounded-lg "><img src={src} className="h-64"></img> <div className="text-left w-2/3 h-1/3 mt-4">Plot:  {plot}</div> <div className="h-1/3 mt-4 flex flex-col">Stars:  {map.call(null, generate_stars, stars)}</div> <div className="text-left w-2/3 h-1/3 mt-4 font-bold">Seasons:</div> <div className="flex flex-row flex-wrap">{(not.call(null, nil_QMARK_.call(null, seasons))) ? (map.call(null, function (_PERCENT_1) {
return generate_button.call(null, _PERCENT_1, props);
}, seasons)) : (null)}</div></div>;
}
;
var details_view = function (props) {
let title7 = props["title"];
let year8 = props["year"];
let episodes9 = props["episodes"];
let plot10 = props["plot"];
let stars11 = props["stars"];
let src12 = props["image"];
let seasons13 = props["seasons"];
return <div className="flex justify-center h-full lg:h-[600px] w-full"><div className="container justify-center w-full"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64">{title7} - {year8}</div> <Link to="trivia" className="h-full"><button className="ml-4 bg-[#4D194D] font-bold">Trivia</button></Link></div></div> <div className="flex flex-row flex-wrap container w-128 justify-center items-center text-center mt-2">{(some_QMARK_.call(null, episodes9)) ? (map.call(null, function (_PERCENT_1) {
return generate_view.call(null, _PERCENT_1);
}, episodes9)) : (null)} {(empty_QMARK_.call(null, episodes9)) ? (generate_movie_view.call(null, plot10, stars11, src12, seasons13, props)) : (null)}</div></div></div>;
}
;
var default$ = details_view
;

export { generate_view, generate_stars, generate_button, generate_movie_view, details_view }
export default default$
