require("dotenv").config();
// code to read and set any environment variables with the dotenv package

var axious = require("axios");
// require axios

var keys = require("./keys");
// require import of keys.js file

var userRequest = process.argv.slice(2).join(" ");

var spotify = new Spotify(keys.spotify);

// make it so liri.js can take in one of the following commands

// concert-this <artist/>band name here>
// searches bands in towns api for events 
// ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") 
// PULLS:
// name of the venue
// venue location
// date of the event using moment to format as "MM/DD/YYYY"

// spotify-this-song <song name here>
// PULLS:
// artist(s)
// the song's name
// a preview link of the song from Spotify
// the album that the song is from
// if no song provided default to "The Sign" by Ace of Base


// movie-this <movie name here>
// pulls:
// Title of the movie
// Year the movie came out
// IMDB Rating of the movie
// Rotten tomatoes rating of the movie
// country where the movie was produced
// language of the movie
// plot of the movie
// actors in the movie
// IF user does not type in movie output data for "Mr. Nobody"
// display message if you have not watched mr nobody you should
// it is on netflix!
// use axios package to retrieve data from the OMDB API
// use the trilogy api

// do-what-it-says run one of the previous programs
// using fs node package LIRI will take the text inside random.txt and use it 
// the text in random.txt to test out this feature 

// create a readme.md
// add to your portfolio

// BONUS
// log the data to your terminal/bash window output the data to a .txt file called log.txt
// make sure you append each command you run to the log.txt
// do not overwrite your file each time you run a command