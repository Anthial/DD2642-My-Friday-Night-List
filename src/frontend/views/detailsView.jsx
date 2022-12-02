import { keyword, js__GT_clj, map } from 'cherry-cljs/lib/cljs_core.js'
var generate_view = function (episode) {
let id2 = keyword("id").call(null, episode);
let episode_number3 = keyword("episodeNumber").call(null, episode);
let title4 = keyword("title").call(null, episode);
let image5 = keyword("image").call(null, episode);
let release6 = keyword("released").call(null, episode);
let description7 = keyword("plot").call(null, episode);
return <div key={id2} className="flex container flex-col items-center text-center w-full md:w-80 h-[600px] mt-2 \n                            bg-[#006466] p-8 m-2 lg:m-5 rounded-lg lg:hover:scale-105 lg:hover:duration-300 \n                            lg:hover:shadow-2xl"><div><img src={image5} className="flex w-80 h-40 object-cover"></img></div> <div className="flex flex-col items-center text-center mt-2"><div className="w-40 font-bold text-xl lg:text-2xl lg:w-64">Episode  {episode_number3} :  {title4}</div></div> <div className="flex flex-col items-center mt-4"><span className="w-64 h-40 overscroll-auto hover:overscroll-contain text-left overflow-y-auto">{description7}</span></div> <div className="flex justify-center text-center mt-3 relative w-full h-32"><div className="w-30 font-bold text-md absolute inset-x-0 bottom-0">Episode Released:  {release6}</div></div></div>;
}
;
var details_view = function (props) {
let props8 = js__GT_clj.call(null, props);
let title9 = keyword("title").call(null, props8);
let year10 = keyword("year").call(null, props8);
let episodes11 = keyword("episodes").call(null, props8);
return <div className="flex justify-center h-screen w-full"><div className="container justify-center w-full"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64">{title9} - {year10}</div> <button className="ml-4 bg-[#4D194D] font-bold">Trivia</button></div></div> <div className="flex flex-row flex-wrap container w-128 justify-center items-center text-center mt-2">{map.call(null, function (_PERCENT_1) {
return generate_view.call(null, _PERCENT_1);
}, episodes11)}</div></div></div>;
}
;
var default$ = details_view
;

export { generate_view, details_view }
export default default$
