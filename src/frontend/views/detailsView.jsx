import { map, truth_, not, nil_QMARK_ } from 'cherry-cljs/lib/cljs_core.js'
import { Link } from 'react-router-dom';
import { createElement } from 'react';
var generate_stars = function (star) {
return <div>{star}</div>;
}
;
var generate_button = function (season, props) {
return <Link to="/episodes"><button onClick={function (event) {
return props["setSelectedSeason"].call(null, season);
}} className="m-2 bg-[#4D194D]">{season}</button></Link>;
}
;
var generate_movie_view = function (plot, stars, src, seasons, props) {
return <div className="flex flex-col text-center items-center mt-4 bg-[#006466] h-full w-full lg:w-[50%] p-2 lg:px-16 m-2 lg:m-5 rounded-lg "><img src={src} className="h-64"></img> <div className="text-left w-2/3 h-1/3 mt-4">Plot:  {plot}</div> <div className="h-1/3 mt-4 flex flex-col">Stars:  {map.call(null, generate_stars, stars)}</div> <div className="text-left w-2/3 h-1/3 mt-4 font-bold">Seasons:</div> <div className="flex flex-row flex-wrap">{(not.call(null, nil_QMARK_.call(null, seasons))) ? (map.call(null, function (_PERCENT_1) {
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
return <div className="flex justify-center h-full lg:h-[600px] w-full"><div className="container justify-center w-full"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64">{title1} - {year2}</div> <Link to="/trivia" className="h-full"><button className="ml-4 bg-[#4D194D] font-bold">Trivia</button></Link></div></div> <div className="flex flex-row flex-wrap container w-128 justify-center items-center text-center mt-2">{generate_movie_view.call(null, plot3, stars4, src5, seasons6, props)}</div></div></div>;
}
;
var default$ = details_view
;

export { generate_stars, generate_button, generate_movie_view, details_view }
export default default$
