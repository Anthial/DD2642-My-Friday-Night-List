# My Friday Night List

Project app for the course DH2642 Interaction Programming and the Dynamic Web.
An app that in the future will allow for browsing information about tv-series as well as a place where you can save and manage series you like or intend to watch. 
By adding series or episodes to a "favorite" list you will easily be able to keep track of what you have watched and what you'd like to watch. My friday night list also shows you where you can watch different series and trivia about them. 

## Setup

Installing dependencies is done with:

npm install

A development server can be started with:

npm run dev 

A production build can be compiled with 

npm run build


## Project structure

The project/app is structured based on the MVP model. This means there are three different types of components that provide the main content of the app. Firstly the Model, which manages data and stores it in the database. The View components are what displays the app to the user. Lastly the Presenter components act like a middleperson between the Model and View.

We use Firebase as our database for this project. 

We have made views and presenters available for the following:

  * Login
  * Registration
  * Search Results
  * My List
  * Movie / TV Show Details View
  * Trivia View
  * Header / Navigation
    
What you still plan to do:
  * Firebase DB Caching
  * Improve API handling
  * Improve styling
  * Increase usage of Recoil (M P not quite separated at the moment)

Your project file structure (short description/purpose of each file):
  * src/ &nbsp; &nbsp; - &nbsp; &nbsp; *Our source folder*
  
  * src/frontend &nbsp; &nbsp; - &nbsp; &nbsp; *Where we deal with the presenters and views*
  * src/frontend/header.tsx &nbsp; &nbsp; - &nbsp; &nbsp; *Our navigation bar at the top*
  * src/frontend/presenters &nbsp; &nbsp; - &nbsp; &nbsp; *Where we store our presenters*
  * src/frontend/views &nbsp; &nbsp; - &nbsp; &nbsp; *Where we store our views*
  * src/frontend/presenters/detailsViewPresenter.tsx &nbsp; &nbsp; - &nbsp; &nbsp; *Calls our API to get data for the details in regards to a selected title and gives that data to the detailsView*
  * src/frontend/presenters/triviaViewPresenter.tsx &nbsp; &nbsp; - &nbsp; &nbsp; *Calls our API to get data for the trivia in regards to a selected title and gives that data to the triviaView*
  * src/frontend/views/detailsView.cljs &nbsp; &nbsp; - &nbsp; &nbsp; *Renders either an episode view containing all episodes in a given season, with episode details or a general view containing the plot of the content and any stars involved*
  * src/frontend/views/detailsView.jsx &nbsp; &nbsp; - &nbsp; &nbsp; *Transpiled detailsView.cljs, is what is actually used in the detailsViewPresenter*
  * src/frontend/views/triviaView.cljs &nbsp; &nbsp; - &nbsp; &nbsp; *Renders the FAQ of the title selected, this due to the actual IMDB trivia being unobtainable from the API*
  * src/frontend/views/triviaView.jsx &nbsp; &nbsp; - &nbsp; &nbsp; *Transpiled triviaView.cljs, is what is actually used in the detailsViewPresenter*
  * src/frontend/presenters/searchResultsPresenter.tsx &nbsp; &nbsp; - &nbsp; &nbsp; *Calls placeholder API to get fake search results after 500 ms (to simulate loading)*
  * src/frontend/views/searchResultsView.tsx &nbsp; &nbsp; - &nbsp; &nbsp; *Shows search results from IMDB API*
  * src/backend &nbsp; &nbsp; - &nbsp; &nbsp; *Where we deal with the model, Firebase and the APIs*
  * src/backend/imdb &nbsp; &nbsp; - &nbsp; &nbsp; *Where we store any functions relating to the IMDB API*
  * src/backend/accounts/placeholderData.ts &nbsp; &nbsp; - &nbsp; &nbsp; *Placeholder data for accounts (not used yet)*
  * src/backend/imdb/IMDB.tsx &nbsp; &nbsp; - &nbsp; &nbsp; *Our IMDB API calls*
  * src/backend/imdb/functions.ts &nbsp; &nbsp; - &nbsp; &nbsp; *Another file with IMDB API functions (they will be merged later)*
  * src/backend/imdb/placeholderData.ts &nbsp; &nbsp; - &nbsp; &nbsp; *Placeholder data for search results*
  * src/backend/firebase/app.ts &nbsp; &nbsp; - &nbsp; &nbsp; *Stores unique Firebase instance and database*
  * src/backend/firebase/cache.ts &nbsp; &nbsp; - &nbsp; &nbsp; *Will be used to cache API requests from IMDB and streaming availability API*