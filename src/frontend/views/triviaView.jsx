import { keyword, random_uuid, js__GT_clj, prn, map } from 'cherry-cljs/lib/cljs_core.js'
var generate_qa_view = function (item) {
let question20 = keyword("question").call(null, item);
let answer21 = keyword("answer").call(null, item);
return <div key={random_uuid.call(null)} className="mt-4"><div className="mt-2"><span className="font-bold">Q:</span> <span className="font-italic">{question20}</span></div> <div className="mt-2"><span className="font-bold">A:</span> <span className="font-italic">{answer21}</span></div></div>;
}
;
var trivia_view = function (props) {
let props22 = js__GT_clj.call(null, props);
let title23 = keyword("title").call(null, props22);
let year24 = keyword("year").call(null, props22);
let items25 = keyword("items").call(null, props22);
prn.call(null, props22);
return <div className="flex justify-center h-screen w-full"><div className="container justify-center w-full bg-[#006466] p-8 px-20 textm-2 lg:m-5 rounded-lg overscroll-auto hover:overscroll-contain text-left overflow-y-auto"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64 ">{title23} - {year24} Trivia</div></div></div> {map.call(null, function (_PERCENT_1) {
return generate_qa_view.call(null, _PERCENT_1);
}, items25)}</div></div>;
}
;
var default$ = trivia_view
;

export { generate_qa_view, trivia_view }
export default default$
