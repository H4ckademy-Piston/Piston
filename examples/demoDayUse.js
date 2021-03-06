'use strict';
let colors = require('colors');
let Piston = require('../lib/Piston');
let spotifySpecPath = '../pistonSpecs/spotify.json';
let spotify = new Piston(spotifySpecPath);
let echonestSpecPath = '../pistonSpecs/echonest.json';
let echonest = new Piston(echonestSpecPath);

/*echonest.hotttnesss('Bob Marley')
  .then(function (data) {
    console.log(data);
  });*/

/*spotify.searchArtist('Bob Marley')
  .then(function (data) {
    console.log(data);
  });*/

let song = 'New born';
console.log("\nWe're searching the Spotify API for the song:".yellow);
console.log(song.green);
spotify.searchTrack(song, 'tracks.items.0.artists.name.0')
  .then(function (data) {
    console.log("\nWe've got this artist name from Spotify API:".yellow);
    console.log(data.green);
    // console.log('Popularity according Spotify is: ', data.popularity[0]);

    console.log('\nAnd now we are going to check how hot the artist is in Echonest API:'.yellow);
    echonest.hotttnesss(data)
      .then(function (data) {
        console.log(data.hotttnesss.toString().green);
        echonest.images(data.id)
          .then(function (data) {
            console.log('\nFor that artist in Echonest API we can get this public domain images:'.yellow);
            data.forEach(function (value) {
              console.log(value.green);
            });
          });
      });
  });
