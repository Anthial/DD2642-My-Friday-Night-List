import { truth_, some_QMARK_, map } from 'cherry-cljs/lib/cljs_core.js'
import { Link } from 'react-router-dom';
import { createElement } from 'react';
var generate_view = function (episode) {
let id7 = episode["id"];
let episode_number8 = episode["episodeNumber"];
let title9 = episode["title"];
let image10 = episode["image"];
let release11 = episode["released"];
let description12 = episode["plot"];
return <div key={id7} className="flex container flex-col items-center text-center w-full md:w-80 h-[600px] mt-2 \n                            bg-[#006466] p-8 m-2 lg:m-5 rounded-lg lg:hover:scale-105 lg:hover:duration-300 \n                            lg:hover:shadow-2xl"><div><img src={image10} className="flex w-80 h-40 object-cover"></img></div> <div className="flex flex-col items-center text-center mt-2"><div className="w-40 font-bold text-xl lg:text-2xl lg:w-64">Episode  {episode_number8} :  {title9}</div></div> <div className="flex flex-col items-center mt-4"><span className="w-64 h-40 overscroll-auto hover:overscroll-contain text-left overflow-y-auto">{description12}</span></div> <div className="flex justify-center text-center mt-3 relative w-full h-32"><div className="w-30 font-bold text-md absolute inset-x-0 bottom-0">Episode Released:  {release11}</div></div></div>;
}
;
var episode_view = function (props) {
let title13 = props["title"];
let year14 = props["year"];
let episodes15 = props["episodes"];
let spinner16 = <img src="spinner.svg" className="flex justify-center w-full h-[25%]"></img>;
console.log(props);
if (truth_(some_QMARK_.call(null, episodes15))) {
return <div className="flex justify-center h-full lg:h-[600px] w-full"><div className="container justify-center w-full"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64">{title13} - {year14}</div> <Link to="/trivia" className="h-full"><button className="ml-4 bg-[#4D194D] font-bold">Trivia</button></Link></div></div> <div className="flex flex-row flex-wrap container w-128 justify-center items-center text-center mt-2">{map.call(null, function (_PERCENT_1) {
return generate_view.call(null, _PERCENT_1);
}, episodes15)}</div></div></div>;} else {
return spinner16;}
}
;
var default$ = episode_view
;

export { generate_view, episode_view }
export default default$
