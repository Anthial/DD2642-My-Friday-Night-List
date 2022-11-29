import { js__GT_clj, keyword } from 'cherry-cljs/lib/cljs_core.js'
var details_view = function (props) {
let props1 = js__GT_clj.call(null, props);
let image2 = keyword("img").call(null, props1);
let title3 = keyword("title").call(null, props1);
let show_start4 = keyword("show-start").call(null, props1);
let show_end5 = keyword("show-end").call(null, props1);
let description6 = keyword("description").call(null, props1);
return <div className="flex justify-center h-screen w-full"><div className="container justify-center w-96 bg-[#006466] p-8 m-10 rounded-lg"><div><img src={image2} className="flex w-80 "></img></div> <div className="flex flex-col items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64">{title3}</div></div> <div className="flex flex-col items-center mt-4"><span className="w-64">{description6}</span></div> <div className="flex justify-center text-center mt-3"><div className="w-30 font-bold text-md">Show started in:  {show_start4}</div> <div className="w-30 font-bold text-md">Show ended in:  {show_end5}</div></div></div></div>;
}
;
var default$ = details_view
;

export { details_view }
export default default$
