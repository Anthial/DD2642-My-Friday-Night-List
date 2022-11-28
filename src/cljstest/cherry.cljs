(ns cljstest.cherry)



(defn Cherryworks-button [props] 
  (let [x (get (js->clj props) "x")]
  #jsx [:button {:onClick (fn [] (js/alert (str "Hello from CLJS! You've fed me: " (js->clj props) "! I see: " x "!")))} "Click me!"]))
(def default Cherryworks-button)