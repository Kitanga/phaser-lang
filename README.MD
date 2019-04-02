# Phaser Language

## Motivation

I needed a way to program JavaScript games a lot quicker using [PhaserJS](phaser.io) 3, which meant I needed to find a way of iterating quickly. I figured that reducing the amount of typing I had to do would be a good place to start. Hence, this project.

Pretty much, what Phaser Language (.pl) allows you to do is type a directive and pass it parameters where possible. This reduces the amount of typing one has to do. For example, instead of `this`, you can use `::`. So, `this.player` becomes `::player`.

## Some directives

`::` is `this`;

`:::sprite` is `this.add.sprite` (the sprite action/directive needs 3 params to work, so would rightly so add parentheses after it and pass it arguments)

You can find more mappings in the `map.config.json` file.

## Folder structure

So all you need to know is that the `scenes` folder holds the top level .pl files for now. To include scripts from other files you can use the `#import` directive (e.g. `#import "Player";`). External scripts are kept in the `scripts` folder.

## Testing

You can test this by running `node index.js` in your console at the root of the project. This will compile into the JavaScript needed to run in the browser.

### I don't want to use the `scenes` folder for some reason

Then change the entry point of your app in the `map.config.json` file.

### I want to add my own mappings

Then add a directive/action as a key and it's corresponding JavaScript equivalent as the value.