// ==UserScript==
// @name         Air Balloon Injector
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Shows Air Balloon PNG when "Balloon" is detected in a Pokémon Showdown battle.
// @author       ChrisDaDerp
// @match        *://play.pokemonshowdown.com/battle-*
// @icon         https://github.com/PokeAPI/sprites/blob/master/sprites/items/air-balloon.png?raw=true
// @downloadURL  https://github.com/ChrisDaDerp/Pokemon-Showdown-Air-Balloon-Injector/blob/1ba4e644bd822926579fbd945c9578fd728f32e2/code.user.js
// @updateURL    https://github.com/ChrisDaDerp/Pokemon-Showdown-Air-Balloon-Injector/blob/1ba4e644bd822926579fbd945c9578fd728f32e2/code.user.js
// @grant        none
// ==/UserScript==

const airBalloonImg = new Image();
airBalloonImg.src = 'https://github.com/PokeAPI/sprites/blob/master/sprites/items/air-balloon.png?raw=true';
const airBalloon1 = document.createElement('img');
const airBalloon2 = document.createElement('img');
// set the src of the img leftElements to the Air Balloon image
airBalloon1.src = airBalloonImg.src;
// set the width of the img element
airBalloon1.width = 50;
let balloon1 = false;
// set the src of the img rightElements to the Air Balloon image
airBalloon2.src = airBalloonImg.src;
// set the width of the img rightElements
airBalloon2.width = 50;
let balloon2 = false;

// Checks left for Balloon status
function checkLeft() {
    const leftElements = document.querySelectorAll('div.statbar.lstatbar.leftstatbar');

    // Loop through the leftElements
    for (let i = 0; i < leftElements.length; i++) {
        // Check if the current leftElement's innerText contains the string "Balloon"
        if (leftElements[i].innerText.includes('Balloon')) {
            leftElements[i].appendChild(airBalloon1);
            balloon1 = true;
        }
        // Remove balloon if no longer active
        else if (!leftElements[i].innerText.includes('Balloon') && balloon1) {
            leftElements[i].removeChild(airBalloon1);
            balloon1 = false;
        }
    }
}

// Checks right for Balloon status
function checkRight() {
    const rightElements = document.querySelectorAll('div.statbar.rstatbar.leftstatbar');

    // Loop through the rightElements
    for (let i = 0; i < rightElements.length; i++) {
        // Check if the current rightElements's innerText contains the string "Balloon"
        if (rightElements[i].innerText.includes('Balloon')) {
            rightElements[i].appendChild(airBalloon2);
            balloon2 = true;
        }
        // Remove balloon if no longer active
        else if (!rightElements[i].innerText.includes('Balloon') && balloon2) {
            rightElements[i].removeChild(airBalloon2);
            balloon2 = false;
        }
    }
}

// Checks left and right sides for balloons
function checkForBalloon() {
    try {
        checkLeft()
    } catch (error) {
        console.error(error);
    }
    try {
    checkRight()
    } catch (error) {
        console.error(error);
    }
}

setInterval(checkForBalloon, 1000);
