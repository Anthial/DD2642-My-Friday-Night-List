(ns frontend.views.detailsView)

(defn details-view [props]
  (let [props (js->clj props)
        image (:img props)
        title (:title props)
        show-start (:show-start props)
        show-end (:show-end props)
        description (:description props)]
    #jsx [:div {:className "flex justify-center h-screen w-full"}
          [:div {:className "container justify-center w-96 bg-[#006466] p-8 m-10 rounded-lg"}
           [:div [:img {:src image :className "flex w-80 "}]]
           [:div {:className "flex flex-col items-center text-center mt-2"} [:div {:className "w-40 font-bold text-2xl lg:text-4xl lg:w-64"} title]]
           [:div {:className "flex flex-col items-center mt-4"} [:span {:className "w-64"} description]]
           [:div {:className "flex justify-center text-center mt-3"}
           ;[:div {:className "flex flex-col justify-center"} Remember for Seasons interface,
            [:div {:className "w-30 font-bold text-md"} "Show started in: "show-start]
            [:div {:className "w-30 font-bold text-md"} "Show ended in: "show-end]]]
          ]))



(def default details-view)