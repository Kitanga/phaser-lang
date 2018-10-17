const fs = require('fs');
const path = require('path');
// First we get the config file
let config = require('./map.config.json');

// then we get the main scene which is first started by the game
const {
    entry,
    map
} = config;

// Function for checking if there are any combinations
function checkForCombinations(str, list) {
    var foundCombination = false;
    // Check for any combinations
    for (let ix = 0, {
            length
        } = list; ix < length; ix++) {
        for (let kx = 0; kx < length; kx++) {
            // 
            if (str.includes(list[ix] + list[kx])) {
                foundCombination = true;
                throw new Error("You can't have two directives combined, for now at least");
            }
        }
    }
    return foundCombination;
}

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

// Now we find and act on the #import directive
// console.log(mainFile.indexOf('#import'));
do {
    if (mainFile.includes('#import')) {
        mainFile = mainFile.replace(/#import\s*(['"]\w*['"])/gi, (match, p1) => {
            var file = p1.split(/['"]/)[1];
            if (!file.includes('.pl')) {
                file += '.pl';
            }
            return fs.readFileSync(path.join(__dirname, '/scripts', file), 'utf8');
        });
    }
}
while (mainFile.includes('#import'));

// Remove the comments and store them to place them back later
let comments = [];

mainFile = mainFile.replace(/((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/gi, (match, p1) => {
    // console.log("Match:", p2);
    var comment = {
        replacementString: `_||${comments.length}||_`,
        str: p1
    };
    comments.push(comment);
    
    return comment.replacementString;
});

// Now we check for any combinations of directives or quick includes
checkForCombinations(mainFile, list);

// Replace all the strings found in our map variable
for (let ix = 0, {
        length
    } = list; ix < length; ix++) {
    mainFile = mainFile.replace(new RegExp(list[ix], 'g'), map[list[ix]]);
}

console.log(comments);
// Put the comments back into the file
for (let ix = 0, {length} = comments; ix < length; ix++) {
    const comment = comments[ix];
    mainFile = mainFile.replace(comment.replacementString, comment.str);
}

// Make sure that the folder structure exists
if (!fs.existsSync(path.join(__dirname, '/dist'))) {
    fs.mkdirSync(path.join(__dirname, '/dist'), 0766, function (err) {
        if (err) {
            console.log(err);
            // echo the result back
            response.send("ERROR! Can't make the directory! \n");
        }
    });
}

fs.writeFileSync(path.join(__dirname, '/dist', '/main.js'), mainFile, 'utf8');