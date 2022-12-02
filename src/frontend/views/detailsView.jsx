import { keyword, js__GT_clj, map } from 'cherry-cljs/lib/cljs_core.js'
var generate_view = function (episode) {
let id1 = keyword("id").call(null, episode);
let episode_number2 = keyword("episodeNumber").call(null, episode);
let title3 = keyword("title").call(null, episode);
let image4 = keyword("image").call(null, episode);
let release5 = keyword("released").call(null, episode);
let description6 = keyword("plot").call(null, episode);
return <div key={id1} className="flex container flex-col items-center text-center w-full md:w-80 h-[600px] mt-2 bg-[#006466] p-8 lg:m-5 rounded-lg"><div><img src={image4} className="flex w-80"></img></div> <div className="flex flex-col items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-2xl lg:w-64">Episode  {episode_number2} :  {title3}</div></div> <div className="flex flex-col items-center mt-4"><span className="w-64 h-40 text-elipsis overflow-hidden ...">{description6}</span></div> <div className="flex justify-center text-center mt-3 relative w-full h-32"><div className="w-30 font-bold text-md absolute inset-x-0 bottom-0">Episode Released:  {release5}</div></div></div>;
}
;
var details_view = function (props) {
let props7 = js__GT_clj.call(null, props);
let title8 = keyword("title").call(null, props7);
let year9 = keyword("year").call(null, props7);
let episodes10 = keyword("episodes").call(null, props7);
return <div className="flex justify-center h-screen w-full"><div className="container justify-center w-full"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64">{title8} - {year9}</div> <button className="bg-[#4D194D] font-bold">Trivia</button></div></div> <div className="flex flex-row flex-wrap container w-128 justify-center items-center text-center mt-2">{map.call(null, function (_PERCENT_1) {
return generate_view.call(null, _PERCENT_1);
}, episodes10)}</div></div></div>;
}
;
var default$ = details_view
;

export { generate_view, details_view }
export default default$
