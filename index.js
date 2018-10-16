const fs = require('fs');
// First we get the config file
let config = require('./map.config.json');

// then we get the main scene which is first started by the game
const {
    entry,
    map
} = config;

// Now we extract the map's keys so that we can order them in order of length (descending)
let list = [];

// Extract keys, place into list array
for (let ix in map) {
    if (map.hasOwnProperty(ix)) {
        list.push(ix);
    }
}

// Sort by length
list.sort((a, b) => {
    return a.length < b.length;
});

// Now load the main.pl files content
let mainFile = fs.readFileSync('./scenes/' + entry, 'utf8');

// Check for any combinations
for (let ix = 0, {
        length
    } = list; ix < length; ix++) {
    for (let kx = 0; kx < length; kx++) {
        // 
        if (mainFile.includes(list[ix] + list[kx])) {
            console.error(new Error("You can't have two directives combined, for now at least"));
        }
    }
}