const library = {
  tracks: {

    t01: { id: "t01",
    name: "Code Monkey",
    artist: "Jonathan Coulton",
    album: "Thing a Week Three" },
    t02: { id: "t02",

       name: "Model View Controller",
                   artist: "James Dempsey",
                   album: "WWDC 2003"},
            t03: { id: "t03",
                   name: "Four Thirty-Three",
                   artist: "John Cage",
                   album: "Woodstock 1952"}
          },
  playlists: { p01: { id: "p01",
                      name: "Coding Music",
                      tracks: ["t01", "t02"]
                    },
               p02: { id: "p02",
                      name: "Other Playlist",
                      tracks: ["t03"]
                    }
             },

// prints a list of all playlists, in the form:
// p01: Coding Music - 2 tracks
// p02: Other Playlist - 1 tracks
 printPlaylists: function() {
 const playlists =  this["playlists"]; //create playlists object
 const playlistsKeys = Object.keys(playlists); //create playlists keys
 for (const key of playlistsKeys) { //iterate through keys
       let string = `${key}: `;  //create string for output
       string = string.concat(playlists[key]["name"], " - "); //add name of playlist to string
       const keyObject = Object.keys(playlists[key]);
       string = string.concat(playlists[key]["tracks"].length, " tracks"); //add amount of tracks to string
       console.log(string); //print string
       }



}, // printPlaylists end

// prints a list of all tracks, using the following format:
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
// t03: Four Thirty-Three by John Cage (Woodstock 1952)
 printTracks: function() {
       const tracks = this["tracks"];
       const tracksKeys = Object.keys(tracks);
       for (const key of tracksKeys) {
              const string = `${key}: ${tracks[key]["name"]} by ${tracks[key]["artist"]} (${tracks[key]["album"]})`;
              console.log(string);
       }

}, //printTracks end

// prints a list of tracks for a given playlist, using the following format:
// p01: Coding Music - 2 tracks
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
printPlaylist: function(playlistId) {

 if (!playlistId) { //check if playlistId was input
       return null;
 }

 const playlists = this["playlists"];
 const playlistsKeys = Object.keys(playlists);
 if (!playlistsKeys.includes(playlistId)) { //check if the playlistId is in the library
       return null;
 }

 let playlistString = `${playlistId}: ${playlists[playlistId]["name"]} - ${playlists[playlistId]["tracks"].length} tracks`
 console.log(playlistString);

 const tracks = this["tracks"];
 const trackId = playlists[playlistId]["tracks"];
 for (key of trackId) {
       let trackString = `${key}: `;
       trackString = trackString.concat(tracks[key]["name"], " by ", tracks[key]["artist"], " (", tracks[key]["album"], ")"); //refactor later
       console.log(trackString);
 }




}, //printPlaylist end

// adds an existing track to an existing playlist
addTrackToPlaylist: function(trackId, playlistId) {
 if (!trackId || !playlistId) { //make sure all values are input
       return null;
 }
 const trackKeys = Object.keys(this["tracks"]);
if (!trackKeys.includes(trackId)) { //check if trackId exists
       return null;
}
 const playlistKeys = Object.keys(this["playlists"]);
 if (!playlistKeys.includes(playlistId)) { // check if playlistId exists
       return null;
 }

 this["playlists"][playlistId]["tracks"].push(trackId); //add track
}, //addTrackToPlaylist end

// adds a track to the library
addTrack: function(name, artist, album) {
       if (!name || !artist || !album) { //checks inputs are valid
              return null;
       }
       const newId = `${generateUid()}`; //create id
       console.log(`Adding:${name} by ${artist} (${album}) to track list under id: ${newId}`); 
       this["tracks"][newId] = { //add to library under newId
              "id": newId,
              "name": name,
              "artist": artist,
              "album": album
       }
}, //addTrack end

// adds a playlist to the library
 addPlaylist: function(name) {
       if (!name) { //checks input exists
              return null;
       }
       const newId = `${generateUid()}`; //generate id
       console.log(`Adding Playlist: ${name} under id: ${newId}`);
       this["playlists"][newId] = { //add playlist to library under newId
              "id": newId,
              "name": name,
              "tracks": []
       }
}, //addPlaylist end

// STRETCH:
// given a query string string, prints a list of tracks
// where the name, artist or album contains the query string (case insensitive)
// tip: use "string".search("tri") 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
 printSearchResults: function(query) {
       if (!query) { //check input
              return null
       }
       const trackKeys = Object.keys(this["tracks"]); 
       for (key of trackKeys) { //iterate through keys
              if (this["tracks"][key]["artist"].search(query) !== -1 || //check if query is in artist
                  this["tracks"][key]["name"].search(query) !== -1 || //check if query is in name
                  this["tracks"][key]["album"].search(query) !== -1) { //check if query is in album
                     console.log(`${this["tracks"][key]["id"]} contains ${query} - ${this["tracks"][key]["name"]} by ${this["tracks"][key]["artist"]} (${this["tracks"][key]["album"]})`); //outputs where query was found
  
              }
       }

} //printSearchResults end




             
}; //library end

const assertEqual = function(actual, expected) {
  if (actual === expected) {
    console.log(`Assertion Passed: ${actual} === ${expected}`);
  } else {
    console.log(`Assertion Failed: ${actual} !== ${expected}`);
  }
};
// generates a unique id
// (already implemented: use this for addTrack and addPlaylist)
const generateUid = function() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}











//printPlaylists tests
console.log("printPlaylists tests:");
library.printPlaylists(); 
//output: 
// p01: Coding Music - 2 tracks
// p02: Other Playlist - 1 tracks
//assertEqual(printPlaylists(), null); //true old test
console.log();

//printTracks tests
console.log("printTracks tests: \n");
library.printTracks();
//assertEqual(printTracks(), null); old test

console.log();


//printPlaylist tests

console.log("printPlaylist tests \n");
library.printPlaylist("p01");
console.log();

//addTrack tests

console.log("addTrack tests: \n");
console.log(library.tracks);
library.addTrack("Silvera", "Gojira", "Magma");
console.log(library.tracks);
assertEqual(library.addTrack(), null);
console.log();


//addTrackToPlaylist tests
console.log("addTrackToPlaylist tests: \n")
library.addTrackToPlaylist("t03", "p01");
assertEqual(library.addTrackToPlaylist(), null); //check when no parameters included
console.log(library["playlists"]["p01"]);
assertEqual(library.addTrackToPlaylist("t03"), null); //check when not all parameters included
assertEqual(library.addTrackToPlaylist("t03", "P04"), null); //check for playlist that doesnt exist
assertEqual(library.addTrackToPlaylist("t09", 'p01'), null) //check for track that doesnt exist
console.log();

//addPlaylist tests
console.log("addPlaylist tests: \n");
library.addPlaylist("New Playlist");
assertEqual(library.addPlaylist(), null);
console.log();


//printSearchResults tests

console.log("printSearchResults tests: \n")
library.printSearchResults("John");
library.printSearchResults("C");
assertEqual(library.printSearchResults(), null);