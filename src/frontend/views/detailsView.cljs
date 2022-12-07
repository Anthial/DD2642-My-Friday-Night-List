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


(defn generate-movie-view [plot stars]
  #jsx [:div {:className "flex flex-col text-center items-center mt-4 bg-[#006466] h-full p-8 lg:px-16 m-2 lg:m-5 rounded-lg "}
        [:img {:src "https://designshack.net/wp-content/uploads/placehold.jpg" :className "h-1/3 w-1/3"}] ;generic image for now
        [:div {:className "text-left w-2/3 h-1/3 mt-4"} "Plot: " plot]
        [:div {:className "h-1/3 mt-4"} "Stars: " stars]])


(defn details-view [props]
  (let [title (.-title props)
        year (.-year props)
        episodes (.-episodes props)
        plot (.-plot props)
        stars (.-stars props)]
    #jsx [:div {:className "flex justify-center h-screen lg:h-[600px] w-full"}
          [:div {:className "container justify-center w-full"}

           [:div {:className "flex flex-col items-center"}
            [:div {:className "flex flex-row items-center text-center mt-2"}
             [:div {:className "w-40 font-bold text-2xl lg:text-4xl lg:w-64"} title "-" year]
             [:Link {:to "trivia"} [:button {:className "ml-4 bg-[#4D194D] font-bold"} "Trivia"]]]]
           [:div {:className "flex flex-row flex-wrap container w-128 justify-center items-center text-center mt-2"}
            (when (some? episodes) (map #(generate-view %) episodes))
            (when (empty? episodes) (generate-movie-view plot stars))]]]))





(def default details-view)