import { keyword, random_uuid, js__GT_clj, prn, map } from 'cherry-cljs/lib/cljs_core.js'
var generate_qa_view = function (item) {
let question13 = keyword("question").call(null, item);
let answer14 = keyword("answer").call(null, item);
return <div key={random_uuid.call(null)} className="mt-4"><div className="mt-2"><span className="font-bold">Q:</span> <span className="font-italic">{question13}</span></div> <div className="mt-2"><span className="font-bold">A:</span> <span className="font-italic">{answer14}</span></div></div>;
}
;
var trivia_view = function (props) {
let props15 = js__GT_clj.call(null, props);
let title16 = keyword("title").call(null, props15);
let year17 = keyword("year").call(null, props15);
let items18 = keyword("items").call(null, props15);
prn.call(null, props15);
return <div className="flex justify-center h-screen w-full"><div className="container justify-center w-full bg-[#006466] p-8 px-20 textm-2 lg:m-5 rounded-lg overscroll-auto hover:overscroll-contain text-left overflow-y-auto"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64 ">{title16} - {year17} Trivia</div></div></div> {map.call(null, function (_PERCENT_1) {
return generate_qa_view.call(null, _PERCENT_1);
}, items18)}</div></div>;
}
;
var default$ = trivia_view
;

export { generate_qa_view, trivia_view }
export default default$
