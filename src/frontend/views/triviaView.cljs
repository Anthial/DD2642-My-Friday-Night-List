(ns frontend.views.triviaView
  (:require ["react-router-dom" :refer [useNavigate]]))

(defn generate-qa-view [item]
  (let [question (.-question item)
        answer (.-answer item)]
    #jsx [:div {:key (random-uuid) :className "mt-4"}
     [:div {:className "mt-2"} [:span {:className "font-bold"} "Q:"] [:span {:className "italic"} question]]
     [:div {:className "mt-2"} [:span {:className "font-bold"}"A:"] [:span answer]]]))


(defn trivia-view [props]
  (let [title (.-title props)
        year (.-year props)
        items (.-items props)
        src (.-image props)
        navigate (useNavigate)] 
    #jsx [:div {:className "flex justify-center w-full"}
          [:div {:className "container justify-center w-full lg:w-[50%] h-full bg-[#006466] p-8 px-4 lg:px-20 textm-2 lg:m-5 rounded-lg overscroll-auto hover:overscroll-contain text-left overflow-y-auto"}
           [:div {:className "flex flex-col items-center"}
            [:div {:className "flex flex-row items-center text-center mt-2"} 
             [:div {:className "w-40 font-bold text-2xl lg:text-4xl lg:w-64 "} title "-" year "Trivia"]]
            [:img {:src src :className "w-64 "}]
            [:button {:className "mr-4 bg-[#4D194D] hover:bg-[#251a33] self-start font-bold" :onClick #(navigate -1)} "Back"]]
           
           (map #(generate-qa-view %) items)]]))



(def default trivia-view)