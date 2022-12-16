(ns frontend.views.detailsView
  (:require ["react-router-dom" :refer [Link]]
            ["react" :refer [createElement]]
            ["react-router-dom" :refer [useNavigate]]
            ["@tabler/icons" :refer [IconHeartPlus]]))

(defn generate-stars [star]
  #jsx [:div star])

(defn generate-button [season props]
  #jsx [:Link {:to "/episodes"} [:button {:onClick (fn [event] ((.-setSelectedSeason props) season)) :className "m-2 bg-[#4D194D]" } season]])

(defn generate-movie-view [plot stars src seasons props] 
  #jsx [:div {:className "flex flex-col text-center items-center mt-4 bg-[#006466] h-full w-full lg:w-[50%] p-2 lg:px-16 m-2 lg:m-5 rounded-lg "}
        [:span {:className "h-64 w-full bg-center bg-contain bg-no-repeat" :style (clj->js {:backgroundImage (str "url""("src")")})}]  
        [:div {:className "text-left w-2/3 h-1/3 mt-4"} "Plot: " plot]
        [:div {:className "h-1/3 mt-4 flex flex-col"} "Stars: " (map generate-stars stars)]
        [:div {:className "self-start text-left w-2/3 h-1/3 mt-4 font-bold"} (if (seq seasons) "Seasons:" "")]
        [:div {:className "flex flex-row flex-wrap"}
         (when (seq seasons) (map #(generate-button % props) seasons))]])


(defn details-view [props]
  (let [title (.-title props)
        year (.-year props)
        plot (.-plot props)
        stars (.-stars props)
        src (.-image props)
        seasons (.-seasons props)
        navigate (useNavigate)]
    #jsx [:div {:className "flex justify-center h-full lg:h-[600px] w-full"}
          [:div {:className "container justify-center w-full"}
           
           [:div {:className "flex flex-col items-center"}
            [:div {:className "flex flex-row items-center text-center mt-2"}
             [:button {:className "mr-4 bg-[#4D194D] hover:bg-[#251a33] font-bold" :onClick #(navigate -1)} "Back"]
             [:div {:className "w-40 font-bold text-2xl lg:text-4xl lg:w-64"} title "-" year]
             [:Link {:to "/trivia" :className "h-full"} [:button {:className "ml-4 bg-[#4D194D] hover:bg-[#251a33] font-bold"} "Trivia"]]]]
           [:div {:className "flex flex-row flex-wrap container w-128 justify-center items-center text-center mt-2"}
            (generate-movie-view plot stars src seasons props)]]]))





(def default details-view)