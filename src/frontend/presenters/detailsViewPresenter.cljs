(ns frontend.presenters.detailsViewPresenter
  (:require ["../views/detailsView.jsx" :as ds :refer [details_view]]))


(def model {:imdbid "tt0118480"
            :title "Stargate SG-1"
            :fulltitle "Stargate SG-1 (TV Series 1997-2007)"
            :type "TVSeries"
            :year "1997"
            :episodes [{:id "1"
                        :seasonNumber "1"
                        :episodeNumber "1"
                        :title "Children of the Gods"
                        :image "https://m.media-amazon.com/images/M/MV5BZWQ4ZWRiNTctNTcyOC00ZjA4LThiZmYtMzMxMjQxYzEwODAzXkEyXkFqcGdeQXVyMTAwMDk1MjM@._V1_Ratio1.7778_AL_.jpg"
                        :year "1997"
                        :released "27 Jul. 1997"
                        :plot "Colonel Jack O'Neill is brought out of retirement to lead a new expedition back to Abydos, only to find an old friend, a new enemy and a far wider use of the Stargate."
                        :rating "8.1"
                        :imdbratingcount "3396"}
                       {:id "2"
                        :seasonNumber "2"
                        :episodeNumber "2"
                        :title "The Enemy Within"
                        :image "https://m.media-amazon.com/images/M/MV5BMTgzMjEzNTk5Ml5BMl5BanBnXkFtZTgwNDE5MzIyMjE@._V1_Ratio1.7778_AL_.jpg"
                        :year "1997"
                        :released "1 Aug. 1997"
                        :plot "The team, now designated SG-1 are planning their next foray through the gate as they try to map out the variety of sites available to them and locate their missing friends. O'Neill asks that Teal'c be allowed to join his team but Gen. Hammond thinks that will be unlikely given that he is the host for a Goa'uld. Unknown to anyone, however, is that O'Neill's close friend, Maj. Charles Kawalsky, leader of SG-2, has been infected by a Goa'uld, an immature version that has not yet taken complete control of the host. Kawalsky is having regular blackouts during which the ..."
                        :rating "7.6"
                        :imdbratingcount "1632"}
                       {:id "3"
                        :seasonNumber "2"
                        :episodeNumber "2"
                        :title "The Enemy Within"
                        :image "https://m.media-amazon.com/images/M/MV5BMTgzMjEzNTk5Ml5BMl5BanBnXkFtZTgwNDE5MzIyMjE@._V1_Ratio1.7778_AL_.jpg"
                        :year "1997"
                        :released "1 Aug. 1997"
                        :plot "The team, now designated SG-1 are planning their next foray through the gate as they try to map out the variety of sites available to them and locate their missing friends. O'Neill asks that Teal'c be allowed to join his team but Gen. Hammond thinks that will be unlikely given that he is the host for a Goa'uld. Unknown to anyone, however, is that O'Neill's close friend, Maj. Charles Kawalsky, leader of SG-2, has been infected by a Goa'uld, an immature version that has not yet taken complete control of the host. Kawalsky is having regular blackouts during which the ..."
                        :rating "7.6"
                        :imdbratingcount "1632"}
                       {:id "4"
                        :seasonNumber "2"
                        :episodeNumber "2"
                        :title "The Enemy Within"
                        :image "https://m.media-amazon.com/images/M/MV5BMTgzMjEzNTk5Ml5BMl5BanBnXkFtZTgwNDE5MzIyMjE@._V1_Ratio1.7778_AL_.jpg"
                        :year "1997"
                        :released "1 Aug. 1997"
                        :plot "The team, now designated SG-1 are planning their next foray through the gate as they try to map out the variety of sites available to them and locate their missing friends. O'Neill asks that Teal'c be allowed to join his team but Gen. Hammond thinks that will be unlikely given that he is the host for a Goa'uld. Unknown to anyone, however, is that O'Neill's close friend, Maj. Charles Kawalsky, leader of SG-2, has been infected by a Goa'uld, an immature version that has not yet taken complete control of the host. Kawalsky is having regular blackouts during which the ..."
                        :rating "7.6"
                        :imdbratingcount "1632"}
                       {:id "5"
                        :seasonNumber "2"
                        :episodeNumber "2"
                        :title "The Enemy Within"
                        :image "https://m.media-amazon.com/images/M/MV5BMTgzMjEzNTk5Ml5BMl5BanBnXkFtZTgwNDE5MzIyMjE@._V1_Ratio1.7778_AL_.jpg"
                        :year "1997"
                        :released "1 Aug. 1997"
                        :plot "The team, now designated SG-1 are planning their next foray through the gate as they try to map out the variety of sites available to them and locate their missing friends. O'Neill asks that Teal'c be allowed to join his team but Gen. Hammond thinks that will be unlikely given that he is the host for a Goa'uld. Unknown to anyone, however, is that O'Neill's close friend, Maj. Charles Kawalsky, leader of SG-2, has been infected by a Goa'uld, an immature version that has not yet taken complete control of the host. Kawalsky is having regular blackouts during which the ..."
                        :rating "7.6"
                        :imdbratingcount "1632"}
                       {:id "6"
                        :seasonNumber "2"
                        :episodeNumber "2"
                        :title "The Enemy Within"
                        :image "https://m.media-amazon.com/images/M/MV5BMTgzMjEzNTk5Ml5BMl5BanBnXkFtZTgwNDE5MzIyMjE@._V1_Ratio1.7778_AL_.jpg"
                        :year "1997"
                        :released "1 Aug. 1997"
                        :plot "The team, now designated SG-1 are planning their next foray through the gate as they try to map out the variety of sites available to them and locate their missing friends. O'Neill asks that Teal'c be allowed to join his team but Gen. Hammond thinks that will be unlikely given that he is the host for a Goa'uld. Unknown to anyone, however, is that O'Neill's close friend, Maj. Charles Kawalsky, leader of SG-2, has been infected by a Goa'uld, an immature version that has not yet taken complete control of the host. Kawalsky is having regular blackouts during which the ..."
                        :rating "7.6"
                        :imdbratingcount "1632"}]})

(defn details-view-presenter [props]
  (let [props (js->clj props)]
        #jsx [:div (details_view model)]))

(def default details-view-presenter)