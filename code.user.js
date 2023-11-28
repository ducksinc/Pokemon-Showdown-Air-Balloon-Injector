// ==UserScript==
// @name         Air Balloon Injector
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Shows Air Balloon PNG when "Balloon" is detected in a Pokémon Showdown battle.
// @author       ducksinc
// @match        *://play.pokemonshowdown.com/battle-*
// @match        *://replay.pokemonshowdown.com/*
// @icon         https://github.com/PokeAPI/sprites/blob/master/sprites/items/air-balloon.png?raw=true
// @downloadURL  https://github.com/ChrisDaDerp/Pokemon-Showdown-Air-Balloon-Injector/blob/1ba4e644bd822926579fbd945c9578fd728f32e2/code.user.js
// @updateURL    https://github.com/ChrisDaDerp/Pokemon-Showdown-Air-Balloon-Injector/blob/1ba4e644bd822926579fbd945c9578fd728f32e2/code.user.js
// @grant        none
// ==/UserScript==

// Air Balloon image setup.
const airBalloonImg = new Image();
airBalloonImg.src = 'https://github.com/PokeAPI/sprites/blob/master/sprites/items/air-balloon.png?raw=true';

// Left balloon setup.
const airBalloon1 = document.createElement('img');
airBalloon1.src = airBalloonImg.src;
airBalloon1.width = 50;
let balloon1 = false;

// Right balloon setup.
const airBalloon2 = document.createElement('img');
airBalloon2.src = airBalloonImg.src;
airBalloon2.width = 50;
let balloon2 = false;

// Checks for balloon status and then either adds or removes balloon from the side of the field.
function checkBalloon(pokeElements, balloonStatus, airBalloon) {
    // Loop through the pokeElements.
    for (let i = 0; i < pokeElements.length; i++) {
        // Check if the current pokeElements's innerText contains the string "Balloon". Updates balloon status if present.
        if (pokeElements[i].innerText.includes('Balloon')) {
            pokeElements[i].appendChild(airBalloon);
            balloonStatus = true;
            console.log(pokeElements[i]);
        }
        // Remove balloon if no longer active. Updates balloon status when removed.
        else if (!(pokeElements[i].innerText.includes('Balloon')) && balloonStatus) {
            pokeElements[i].removeChild(airBalloon);
            balloonStatus = false;
        }
    }
}

// Checks left and right sides for balloons.
function checkForBalloon() {
    const leftElements = document.querySelectorAll('div.statbar.lstatbar.leftstatbar');
    checkBalloon(leftElements, balloon1, airBalloon1);

    const rightElements = document.querySelectorAll('div.statbar.rstatbar.leftstatbar');
    checkBalloon(rightElements, balloon2, airBalloon2);
}

// Runs every second.
setInterval(checkForBalloon, 1000);
