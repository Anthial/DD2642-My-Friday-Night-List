(ns frontend.views.triviaView)

(defn generate-qa-view [item]
  (let [question (:question item)
        answer (:answer item)]
    #jsx [:div {:key (random-uuid) :className "mt-4"}
     [:div {:className "mt-2"} [:span {:className "font-bold"} "Q:"] [:span {:className "font-italic"} question]]
     [:div {:className "mt-2"} [:span {:className "font-bold"}"A:"] [:span {:className "font-italic"} answer]]]))


(defn trivia-view [props]
  (let [props (js->clj props)
        title (:title props)
        year (:year props)
        items (:items props)]
    (prn props)
    #jsx [:div {:className "flex justify-center h-screen w-full"}
          [:div {:className "container justify-center w-full bg-[#006466] p-8 px-20 textm-2 lg:m-5 rounded-lg overscroll-auto hover:overscroll-contain text-left overflow-y-auto"}
           [:div {:className "flex flex-col items-center"}
            [:div {:className "flex flex-row items-center text-center mt-2"}
             [:div {:className "w-40 font-bold text-2xl lg:text-4xl lg:w-64 "} title "-" year "Trivia"]]]
           (map #(generate-qa-view %) items)]]))



(def default trivia-view)