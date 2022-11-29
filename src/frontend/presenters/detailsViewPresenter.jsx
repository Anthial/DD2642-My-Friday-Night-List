import {  } from '../views/detailsView.jsx'
import { js__GT_clj, keyword, arrayMap } from 'cherry-cljs/lib/cljs_core.js'
import { details_view } from '../views/detailsView.jsx';
var details_view_presenter = function (props) {
let props1 = js__GT_clj.call(null, props);
let model2 = arrayMap(keyword("img"), "https://i.ytimg.com/vi/nk4zbMxj2CQ/maxresdefault.jpg", keyword("title"), "Testing Title", keyword("description"), "Testing what it would be like to have a description. It was a very short show.", keyword("show-start"), 2014, keyword("show-end"), 2015);
return <div>{details_view.call(null, model2)}</div>;
}
;
var default$ = details_view_presenter
;

export { details_view_presenter }
export default default$
