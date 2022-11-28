(ns cljstest.cherry)



(defn Cherryworks-button [props] 
  (let [x (get (js->clj props) "x")]
  #jsx [:button {:className "bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" 
                 :onClick (fn [] (js/alert (str "Hello from CLJS! You've fed me: " (js->clj props) "! I see: " x "!")))} "Click me!"]))
(def default Cherryworks-button)