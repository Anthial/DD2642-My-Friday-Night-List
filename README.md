# My Friday Night List

Project app for the course DH2642 Interaction Programming and the Dynamic Web.
An app that allows for browsing information about tv-series as well as a place where you can save and manage series you like or intend to watch. 
By adding series or episodes to a "favorite" list you're able to easily keep track of what you have watched and what you'd like to watch. My Friday Night List also shows you where you can watch different series and trivia about them. 

## Link to Deployed Application

https://my-friday-night-list.web.app/

## User Evaluation

See https://github.com/Anthial/my-friday-night-list/blob/main/Prototype%20User%20Consultation.txt and https://github.com/Anthial/my-friday-night-list/blob/main/Formative%20Evaluation%20User%20Consultation.txt

The Prototype User Consultation helped us realise that we had some core issues with our app functionality that we neeeded to resolve to make the application intutive to use. We resolved the requested changes since we thought that they made a lot of sense.

The Formative Evaluation User Consultation, helped us clean up our application where there was previously clutter. A cleaner and more unified experience makes for a better application over all.  

## Setup

Installing dependencies is done with:

npm install

A development server can be started with:

npm run dev 

A production build can be compiled with 

npm run build

### API Configuration

An IMDB API Key is needed for this application to function. You can obtain an IMDB API Key from: https://imdb-api.com/

A Streaming Availability API Key is needed for this application to function. You can obtain a Streaming Availability API Key from: https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/pricing

To ensure functionality, make the file apiConfig.ts in src/backend/api/imdb/

The apiConfig.ts file must be configured as follows:

```
const IMDB_API_KEY = "INSERT IMDB API KEY HERE";
const STREAMING_AVAILABILITY_API_KEY = "INSERT STREAMING AVAILABILITY API KEY HERE";

export {IMDB_API_KEY, STREAMING_AVAILABILITY_API_KEY}
```

### Firebase configuration

This application expects a Realtime Firebase Database as well as Firebase Authentication to function. Please set those up, following:
1. Please setup a Firebase Project.
2. To ensure functionality, please make the file firebaseConfig.ts in src/backend/firebase/ as following 
```
import { FirebaseOptions } from "firebase/app";
//extracting the following from your Firebase Project settings
export const firebaseConfig: FirebaseOptions = {
	apiKey: "",
	authDomain: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: "",
	databaseURL: ""
};
```
3. Please enable a Realtime Firebase Database with the following ruleset 
```
{
  "rules": {
    "user": {
      "$userId": {
        // grants write access to the owner of this user account
        // whose uid must exactly match the key ($userId)
        ".write": "$userId === auth.uid",
        ".read": "$userId === auth.uid",
      },
    },
    "cache": {
      ".write": "auth != null",
      ".read": "auth != null",
      "imdb": {
        "search": {
          ".indexOn": "cacheTime"
        },
        "title": {
          ".indexOn": "cacheTime"
        }
      }
    }
  }
}
```
4. Please enable Firebase Authentication for Email/Password.


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
         * src/frontend/presenters &nbsp; &nbsp; - &nbsp; &nbsp; *Where we store our presenters*
         * src/frontend/views &nbsp; &nbsp; - &nbsp; &nbsp; *Where we store our views*
    * src/backend &nbsp; &nbsp; - &nbsp; &nbsp; *Where we deal with the model, Firebase and the APIs*
         * src/backend/api &nbsp; &nbsp; - &nbsp; &nbsp; *Where we store any functions relating to the APIs*
         * src/backend/firebase &nbsp; &nbsp; - &nbsp; &nbsp; *Where the firebase related stuff is stored*
         * src/backend/model &nbsp; &nbsp; - &nbsp; &nbsp; *The model, which handles most the stuff stored in backend*
