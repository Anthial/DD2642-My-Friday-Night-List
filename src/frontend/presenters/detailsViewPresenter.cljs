(ns frontend.presenters.detailsViewPresenter
  (:require ["../views/detailsView.jsx" :as ds :refer [details_view]]))

(defn details-view-presenter [props]
  (let [props (js->clj props)
        model {:img "https://i.ytimg.com/vi/nk4zbMxj2CQ/maxresdefault.jpg" :title "Testing Title" :description "Testing what it would be like to have a description. It was a very short show." :show-start 2014 :show-end 2015}]
    #jsx [:div (details_view model)]))

(def default details-view-presenter)