import { seq, random_uuid, map, _EQ_, truth_, some, not, keyword, str, clj__GT_js, arrayMap } from 'cherry-cljs/lib/cljs_core.js'
import { Link } from 'react-router-dom';
import { createElement } from 'react';
import { useNavigate } from 'react-router-dom';
var generate_stars = function (star) {
return <div key={random_uuid.call(null)}>{star}</div>;
}
;
var generate_button = function (season, props) {
return <div key={random_uuid.call(null)}><Link to="/episodes"><button onClick={function (event) {
return props["setSelectedSeason"].call(null, season);
}} className="m-2 bg-[#4D194D]">{season}</button></Link></div>;
}
;
var generate_movie_view = function (plot, stars, src, seasons, props) {
console.log(props);
return <div className="flex flex-col text-center items-center mt-4 bg-[#006466] h-full w-full lg:w-[50%] \n                          p-2 lg:px-16 m-2 lg:m-5 rounded-lg "><div className="select-none h-64 w-full bg-center bg-contain bg-no-repeat group overflow-hidden rounded-lg \n                           overflow-hidden relative" style={clj__GT_js.call(null, arrayMap(keyword("backgroundImage"), str.call(null, "url", "(", src, ")")))} onClick={function (event) {
return props["onUserModifiedList"].call(null, props["values"]);
}}><div className="select-none h-6 absolute -bottom-12 flex w-full justify-center \n                            transition-transform duration-100 \n                            group-hover:-translate-y-40 group-hover: scale-[600%]">{(some.call(null, function (_PERCENT_1) {
return _EQ_.call(null, props["values"]["id"], _PERCENT_1);
}, props["userWatchlist"])) ? (<div className="select-none text-red-500">&#10084;</div>) : (null)} {(not.call(null, some.call(null, function (_PERCENT_1) {
return _EQ_.call(null, props["values"]["id"], _PERCENT_1);
}, props["userWatchlist"]))) ? (<div className="select-none text-white">&#9825;</div>) : (null)}</div></div> <div className="text-left w-2/3 h-1/3 mt-4">Plot:  {plot}</div> <div className="h-1/3 mt-4 flex flex-col">Stars:  {map.call(null, generate_stars, stars)}</div> <div className="self-start text-left w-2/3 h-1/3 mt-4 font-bold">{(seq.call(null, seasons)) ? ("Seasons:") : ("")}</div> <div className="flex flex-row flex-wrap">{(seq.call(null, seasons)) ? (map.call(null, function (_PERCENT_1) {
return generate_button.call(null, _PERCENT_1, props);
}, seasons)) : (null)}</div></div>;
}
;
var details_view = function (props) {
let title1 = props["title"];
let year2 = props["year"];
let plot3 = props["plot"];
let stars4 = props["stars"];
let src5 = props["image"];
let seasons6 = props["seasons"];
let navigate7 = useNavigate.call(null);
return <div className="flex justify-center h-full lg:h-[600px] w-full"><div className="container justify-center w-full"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><button className="mr-4 bg-[#4D194D] hover:bg-[#251a33] font-bold" onClick={function () {
return navigate7.call(null, -1);
}}>Back</button> <div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64">{title1} - {year2}</div> <Link to="/trivia" className="h-full"><button className="ml-4 bg-[#4D194D] hover:bg-[#251a33] font-bold">Trivia</button></Link></div></div> <div className="flex flex-row flex-wrap container w-128 justify-center items-center text-center mt-2">{generate_movie_view.call(null, plot3, stars4, src5, seasons6, props)}</div></div></div>;
}
;
var default$ = details_view
;

export { generate_stars, generate_button, generate_movie_view, details_view }
export default default$
