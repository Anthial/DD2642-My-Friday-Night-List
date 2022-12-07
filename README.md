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
