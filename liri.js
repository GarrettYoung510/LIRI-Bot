const dotenv = require("dotenv").config();
// // require dotenv or .env
// // code to read and set any environment variables with the dotenv package

const axios = require("axios");
// // require axios

const keys = require("./keys");
// // require import of keys.js file

const inquirer = require("inquirer");
// inquirer

const moment = require('moment');
// moment
moment().format();

// var userRequest = process.argv.slice(2).join(" ");




// make it so liri.js can take in one of the following commands
const liri = function() {
    inquirer.prompt([{
            // list for user to make a selection
            type: "list",
            message: "What would you like to do?",
            choices: ["concert-this", "spotify-this-song", "movie-this"],
            name: "choice"
        },

        {
            type: "input",
            message: "What would you like search?",
            name: "search"
        },

    ]).then(function(user) {

        var userInput = JSON.stringify(user.choice);
        console.log(userInput);
        // pull userinput
        var searchInput = user.search;
        console.log(searchInput);
        // pull user search term

        let queryURLConcert = (`https://rest.bandsintown.com/artists/${searchInput}/events?app_id=codingbootcamp`);

        const getConcertInfo = async function() {
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
        const getSpotifyInfo = async function() {
            const spotify = new Spotify(keys.spotify);
            var options = {
                provider: "spotify",
                apiKey: spotify
            }
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


                // spotify-this-song <song name here>
                // PULLS:
                // artist(s)
                // the song's name
                // a preview link of the song from Spotify
                // the album that the song is from
                // if no song provided default to "The Sign" by Ace of Base
            } catch (e) {
                console.log(e);
            }
        };

        if (user.choice === 'concert-this') {
            console.log(`you chose concert-this`);
            getConcertInfo();
            // const response = axios.get(`https://rest.bandsintown.com/artists/${searchInput}/events?app_id=codingbootcamp`);
            // console.log(response.data);
        } else if (user.choice === 'spotify-this-song') {
            getSpotifyInfo();
            console.log(`you chose spotify-this-song`)
        } else if (user.choice === 'movie-this') {
            console.log(`you chose movie-this`)
        }


    });
}
liri();

// }



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