# My Friday Night List

Project app for the course DH2642 Interaction Programming and the Dynamic Web.
An app that allows for browsing information about tv-series as well as a place where you can save and manage series you like or intend to watch. 
By adding series or episodes to a "favorite" list you're able to easily keep track of what you have watched and what you'd like to watch. My Friday Night List also shows you where you can watch different series and trivia about them. 

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
 
 As well as other features like:
 
  * Firebase DB Caching
  * API handling
  * Usage of Recoil

The folder structure is pretty straight forward, but is explained here:

* src/   *The source folder*
    * src/frontend &nbsp; &nbsp; - &nbsp; &nbsp; *Where we deal with the presenters and views*
         * src/frontend/header.tsx &nbsp; &nbsp; - &nbsp; &nbsp; *Our navigation bar at the top*
         * src/frontend/presenters &nbsp; &nbsp; - &nbsp; &nbsp; *Where we store our presenters*
         * src/frontend/views &nbsp; &nbsp; - &nbsp; &nbsp; *Where we store our views*
    * src/backend &nbsp; &nbsp; - &nbsp; &nbsp; *Where we deal with the model, Firebase and the APIs*
         * src/backend/api &nbsp; &nbsp; - &nbsp; &nbsp; *Where we store any functions relating to the APIs*
         * src/backend/firebase &nbsp; &nbsp; - &nbsp; &nbsp; *Where the firebase related stuff is stored*
         * src/backend/model &nbsp; &nbsp; - &nbsp; &nbsp; *The model, which handles most the stuff stored in backend*
