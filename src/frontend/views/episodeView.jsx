import { map } from 'cherry-cljs/lib/cljs_core.js'
import { Link } from 'react-router-dom';
import { createElement } from 'react';
import { useNavigate } from 'react-router-dom';
var generate_view = function (episode) {
let id8 = episode["id"];
let episode_number9 = episode["episodeNumber"];
let title10 = episode["title"];
let image11 = episode["image"];
let release12 = episode["released"];
let description13 = episode["plot"];
return <div key={id8} className="flex container flex-col items-center text-center w-full md:w-80 h-[600px] mt-2 \n                            bg-[#006466] p-8 m-2 lg:m-5 rounded-lg lg:hover:scale-105 lg:hover:duration-300 \n                            lg:hover:shadow-2xl"><div><img src={image11} className="flex w-80 h-40 object-cover"></img></div> <div className="flex flex-col items-center text-center mt-2 h-[40%] overflow-y-auto "><div className="overscroll-auto overflow-y-auto w-40 font-bold text-xl lg:text-2xl lg:w-64 text-ellipsis overflow-hidden ... ">Episode  {episode_number9} :  {title10}</div></div> <div className="flex flex-col items-center mt-4 h-full overflow-y-auto"><span className="w-64 h-[80%] overscroll-auto hover:overscroll-contain text-left overflow-y-auto">{description13}</span></div> <div className="flex self-end justify-end text-center mt-4 relative w-full"><div className="w-30 font-bold text-md absolute inset-x-0 bottom-0">Episode Released:  {release12}</div></div></div>;
}
;
var episode_view = function (props) {
let title14 = props["title"];
let year15 = props["year"];
let episodes16 = props["episodes"];
let navigate17 = useNavigate.call(null);
return <div className="flex justify-center h-full lg:h-[600px] w-full"><div className="container justify-center w-full"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><button className="mr-4 bg-[#4D194D] hover:bg-[#251a33] font-bold" onClick={function () {
return navigate17.call(null, -1);
}}>Back</button> <div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64">{title14} - {year15}</div> <Link to="/trivia" className="h-full"><button className="ml-4 bg-[#4D194D] hover:bg-[#251a33] font-bold">Trivia</button></Link></div></div> <div className="flex flex-row flex-wrap container w-128 justify-center items-center text-center mt-2">{map.call(null, function (_PERCENT_1) {
return generate_view.call(null, _PERCENT_1);
}, episodes16)}</div></div></div>;
}
;
var default$ = episode_view
;

export { generate_view, episode_view }
export default default$
