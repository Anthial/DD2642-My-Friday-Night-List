import { random_uuid, map } from 'cherry-cljs/lib/cljs_core.js'
var generate_qa_view = function (item) {
let question17 = item["question"];
let answer18 = item["answer"];
return <div key={random_uuid.call(null)} className="mt-4"><div className="mt-2"><span className="font-bold">Q:</span> <span className="italic">{question17}</span></div> <div className="mt-2"><span className="font-bold">A:</span> <span>{answer18}</span></div></div>;
}
;
var trivia_view = function (props) {
let title19 = props["title"];
let year20 = props["year"];
let items21 = props["items"];
let src22 = props["image"];
return <div className="flex justify-center w-full"><div className="container justify-center w-full h-full bg-[#006466] p-8 px-4 lg:px-20 textm-2 lg:m-5 rounded-lg overscroll-auto hover:overscroll-contain text-left overflow-y-auto"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64 ">{title19} - {year20} Trivia</div></div> <img src={src22} className="w-64 "></img></div> {map.call(null, function (_PERCENT_1) {
return generate_qa_view.call(null, _PERCENT_1);
}, items21)}</div></div>;
}
;
var default$ = trivia_view
;

export { generate_qa_view, trivia_view }
export default default$
