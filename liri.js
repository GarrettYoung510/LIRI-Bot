require("dotenv").config();
// // require dotenv or .env
// // code to read and set any environment variables with the dotenv package
const fs = require("fs");
// grab fs package

const axios = require("axios");
// // require axios

const keys = require("./keys.js");
// // require import of keys.js file

var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
// var spotify = new Spotify({ 
//     id: defd70024dba40e9bd3a04faa3cd1fe6, 
//     secret: 622e33b0a0f94fb8b6c074b4c1e416e6
//         });

console.log(spotify);
// spotify

const inquirer = require("inquirer");
// inquirer

const moment = require('moment');
// moment
moment().format();
// brings in the function for formatting 

// make it so liri.js can take in one of the following commands
const liri = function() {
    inquirer.prompt([{
            // list for user to make a selection
            type: "list",
            message: "What would you like to do?",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "choice"
        },

        {
            type: "input",
            message: "What would you like search?",
            name: "search",
            validate: function(user) {
                // validate if user input something
                if (user.choice === 'movie-this' && user.search === undefined) {
                    // if user choice is movie this and input was blank

                    user.search = 'mr nobody'
                        // change the input to mr nobody
                }
                return true;
            },
            consolelog: function(user) {
                if (user.choice !== "") {
                    console.log(`this is what you searched: ${user.search}`);
                }
            }
        },

    ]).then(function(user) {

        var userInput = JSON.stringify(user.choice);
        // so we can interpret it because it is undefined
        console.log(userInput);
        // pull userinput
        var searchInput = user.search;
        console.log(searchInput);
        // pull user search term


        const getConcertInfo = async function() {
            let queryURLConcert = (`https://rest.bandsintown.com/artists/${searchInput}/events?app_id=codingbootcamp`);

            try {
                const response = await axios.get(queryURLConcert);
                // PULLS response:
                console.log(JSON.stringify(response.data[0].venue.name));
                // name of the venue
                console.log(`${response.data[0].venue.city},${response.data[0].venue.region}`);
                // venue location
                // console.log(`${response.data[0].datetime}`);
                StartDate = moment(response.data[0].datetime).format('MM-DD-YYYY');
                console.log(StartDate);
                // date of the event using moment to format as "MM/DD/YYYY"
            } catch (e) {
                console.log(e);
            }
        };

        const getSpotifyInfo = function() {
            if (searchInput.length < 0) {
                searchInput === 'i want it that way'
            }
            spotify.search({ type: 'track', query: searchInput, limit: 1 }).then(function(response) {
                    // default the sign ace of base
                    // PULLS response:
                    // console.log(JSON.stringify(response));

                    // artist(s)
                    // console.log(`ITEM QUERY: ${JSON.stringify(response.tracks.items[0])}`);
                    console.log(`ARTIST: ${JSON.stringify(response.tracks.items[0].album.artists[0].name)}`);

                    // the song's name
                    console.log(`SONG NAME: ${JSON.stringify(response.tracks.items[0].name)}`);

                    // a preview link of the song from Spotify
                    console.log(`PREVIEW LINK: ${JSON.stringify(response.tracks.items[0].preview_url)}`);

                    // the album that the song is from
                    console.log(`ALBUM: ${JSON.stringify(response.tracks.items[0].album.name)}`);

                    // if no song provided default to "The Sign" by Ace of Base
                })
                .catch(function(err) {
                    console.log(err);
                });

        };

        let queryURLMovie = (`http://www.omdbapi.com/?t=${searchInput}&y=&plot=short&apikey=trilogy`);

        const getMovieInfo = async function() {

            try {
                const response = await axios.get(queryURLMovie);
                // PULLS response:
                // pulls:
                console.log("Title: " + response.data.Title);
                // Title of the movie
                console.log("Year released: " + response.data.Year);
                // Year the movie came out
                console.log("Rated: " + response.data.Rated);
                // IMDB Rating of the movie
                console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value);
                // Rotten tomatoes rating of the movie
                console.log("Country: " + response.data.Country);
                // country where the movie was produced
                console.log("Language(s): " + response.data.Language);
                // language of the movie
                console.log("Plot: " + response.data.Plot);
                // plot of the movie
                console.log("Actors: " + response.data.Actors);
                // actors in the movie

                // IF user does not type in movie output data for "Mr. Nobody"
                // display message if you have not watched mr nobody you should
                // it is on netflix!
                // use axios package to retrieve data from the OMDB API
                // use the trilogy api
            } catch (e) {
                console.log(e);
            }

        };

        const doWhatItSays = function() {
            // do what it says function
            fs.readFile("random.txt", "utf8", function(error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                // We will then print the contents of data
                console.log(data);

                // Then split it by commas (to make it more readable)
                // turns it into an array by what is in the quotes
                var dataArr = data.split(",");

                // We will then re-display the content as an array for later use.
                console.log(dataArr);

                user.choice = dataArr[0];
                // do what it says

                if (user.choice === 'concert-this') {
                    console.log(`Concert Details`);
                    getConcertInfo(dataArr[1]);
                } else if (user.choice === 'spotify-this-song') {
                    console.log(`Song Details`)
                    getSpotifyInfo(dataArr[1]);
                } else if (user.choice === 'movie-this') {
                    // if chose to search a movie
                    // if (user.search == undefined) {
                    //     searchInput = 'mr nobody';
                    //     getMovieInfo();
                    //     console.log(`Movie Details`)
                    // } else {
                    getMovieInfo(dataArr[1]);
                    // console.log(searchInput);
                    console.log(`Movie Details`)
                        // }
                }

            });
        };
        if (user.choice === 'concert-this') {
            console.log(`Concert Details`);
            getConcertInfo();
        } else if (user.choice === 'spotify-this-song') {
            console.log(`Song Details`)
            getSpotifyInfo();
        } else if (user.choice === 'movie-this') {
            // if chose to search a movie
            // if (user.search == undefined) {
            //     searchInput = 'mr nobody';
            //     getMovieInfo();
            //     console.log(`Movie Details`)
            // } else {
            getMovieInfo();
            // console.log(searchInput);
            console.log(`Movie Details`)
                // }
        } else if (user.choice === 'do-what-it-says') {
            // if chose to search a movie
            // if (user.search == undefined) {
            //     searchInput = 'mr nobody';
            //     getMovieInfo();
            //     console.log(`Movie Details`)
            // } else {
            doWhatItSays();
            // console.log(searchInput);
            console.log(`Doing What it says: `)
                // }
        }


    });
}
liri();

// }





// do-what-it-says run one of the previous programs
// using fs node package LIRI will take the text inside random.txt and use it 
// the text in random.txt to test out this feature 

// create a readme.md
// add to your portfolio

// BONUS
// log the data to your terminal/bash window output the data to a .txt file called log.txt
// make sure you append each command you run to the log.txt
// do not overwrite your file each time you run a command