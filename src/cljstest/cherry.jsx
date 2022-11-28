import { get, js__GT_clj, str } from 'cherry-cljs/lib/cljs_core.js'
var Cherryworks_button = function (props) {
let x1 = get.call(null, js__GT_clj.call(null, props), "x");
return <button onClick={function () {
return alert(str.call(null, "Hello from CLJS! You've fed me: ", js__GT_clj.call(null, props), "! I see: ", x1, "!"));
}}>Click me!</button>;
}
;
var default$ = Cherryworks_button
;

export { Cherryworks_button }
export default default$
