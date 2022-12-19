import { random_uuid, map } from 'cherry-cljs/lib/cljs_core.js'
import { useNavigate } from 'react-router-dom';
var generate_qa_view = function (item) {
let question18 = item["question"];
let answer19 = item["answer"];
return <div key={random_uuid.call(null)} className="mt-4"><div className="mt-2"><span className="font-bold">Q:</span> <span className="italic">{question18}</span></div> <div className="mt-2"><span className="font-bold">A:</span> <span>{answer19}</span></div></div>;
}
;
var trivia_view = function (props) {
let title20 = props["title"];
let year21 = props["year"];
let items22 = props["items"];
let src23 = props["image"];
let navigate24 = useNavigate.call(null);
return <div className="flex justify-center w-full"><div className="container justify-center w-full lg:w-[50%] h-full bg-[#006466] p-8 px-4 lg:px-20 textm-2 lg:m-5 rounded-lg overscroll-auto hover:overscroll-contain text-left overflow-y-auto"><div className="flex flex-col items-center"><div className="flex flex-row items-center text-center mt-2"><div className="w-40 font-bold text-2xl lg:text-4xl lg:w-64 ">{title20} - {year21} Trivia</div></div> <img src={src23} className="w-64 "></img> <button className="mr-4 bg-[#4D194D] hover:bg-[#251a33] self-start font-bold" onClick={function () {
return navigate24.call(null, -1);
}}>Back</button></div> {map.call(null, function (_PERCENT_1) {
return generate_qa_view.call(null, _PERCENT_1);
}, items22)}</div></div>;
}
;
var default$ = trivia_view
;

export { generate_qa_view, trivia_view }
export default default$
