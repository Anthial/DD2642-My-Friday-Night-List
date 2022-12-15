(ns frontend.views.detailsView
  (:require ["react-router-dom" :refer [Link]]
            ["react" :refer [createElement]]))

(defn generate-view [episode]
  (let [id (.-id episode)
        episode-number (.-episodeNumber episode)
        title (.-title episode)
        image (.-image episode)
        release (.-released episode)
        description (.-plot episode)]
    #jsx [:div {:key id 
                :className "flex container flex-col items-center text-center w-full md:w-80 h-[600px] mt-2 
                            bg-[#006466] p-8 m-2 lg:m-5 rounded-lg lg:hover:scale-105 lg:hover:duration-300 
                            lg:hover:shadow-2xl"}
          [:div 
           [:img {:src image 
                  :className "flex w-80 h-40 object-cover"}]]
          [:div {:className "flex flex-col items-center text-center mt-2"} 
           [:div {:className "w-40 font-bold text-xl lg:text-2xl lg:w-64"} "Episode " episode-number ": " title]]
          [:div {:className "flex flex-col items-center mt-4"} 
           [:span {:className "w-64 h-40 overscroll-auto hover:overscroll-contain text-left overflow-y-auto"} description]]
          [:div {:className "flex justify-center text-center mt-3 relative w-full h-32"}
           ;[:div {:className "flex flex-col justify-center"} Remember for Seasons interface,
           [:div {:className "w-30 font-bold text-md absolute inset-x-0 bottom-0"} "Episode Released: " release]]]))



(defn generate-stars [star]
  #jsx [:div star])

(defn generate-button [season props]
  #jsx [:button {:onClick (fn [event] ((.-setSelectedSeason props) season)) :className "m-2 bg-[#4D194D]" }season])

(defn generate-movie-view [plot stars src seasons props]
  #jsx [:div {:className "flex flex-col text-center items-center mt-4 bg-[#006466] h-full w-full lg:w-[50%] p-2 lg:px-16 m-2 lg:m-5 rounded-lg "}
        [:img {:src src :className "h-64"}]
        [:div {:className "text-left w-2/3 h-1/3 mt-4"} "Plot: " plot]
        [:div {:className "h-1/3 mt-4 flex flex-col"} "Stars: " (map generate-stars stars)]
        [:div {:className "text-left w-2/3 h-1/3 mt-4 font-bold"} "Seasons:"]
        [:div {:className "flex flex-row flex-wrap"} 
         (when (not (nil? seasons)) (map #(generate-button % props) seasons))]])


(defn details-view [props]
  (let [title (.-title props)
        year (.-year props)
        episodes (.-episodes props)
        plot (.-plot props)
        stars (.-stars props)
        src (.-image props)
        seasons (.-seasons props)]
    #jsx [:div {:className "flex justify-center h-full lg:h-[600px] w-full"}
          [:div {:className "container justify-center w-full"}

           [:div {:className "flex flex-col items-center"}
            [:div {:className "flex flex-row items-center text-center mt-2"}
             [:div {:className "w-40 font-bold text-2xl lg:text-4xl lg:w-64"} title "-" year]
             [:Link {:to "trivia" :className "h-full"} [:button {:className "ml-4 bg-[#4D194D] font-bold"} "Trivia"]]]]
           [:div {:className "flex flex-row flex-wrap container w-128 justify-center items-center text-center mt-2"}
            (when (some? episodes) (map #(generate-view %) episodes))
            (when (empty? episodes) (generate-movie-view plot stars src seasons props))]]]))





(def default details-view)