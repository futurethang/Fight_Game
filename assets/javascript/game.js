let show = "hide show"; // WORKS! and good place to define animations later
let hide = "show hide"; // WORKS! and good place to define animations later

// Function called in the character card writing loop that appends selection row divs
let createCard = function(character) {
        // pulls from the character object's property that defines the <div> element.
        return character.char_card;
}
// PSEUDO CODE FOR FIGHT GAME

// 5 CHARACTERS AVAIALABLE, BASED ON COMMON CHARACTER OBJECT, INHERIT FUNCTIONS FROM PROTOTYPE

function Fighter(name, level, faction, attackPts, defencePts, imgSource) {
    
    // BASIC PROPS
    this.name = name;
    this.level = level;
    this.faction = faction;
    this.attackPts = attackPts;
    this.defencePts = defencePts;
    this.counterAttack = Math.floor(attackPts * .2);

    // DISPLAY PROPS
    this.imgSource = imgSource;
    this.char_card_name = "<h3>" + name + "</h3>";
    this.char_card_hitdef = "<h4>" + attackPts + "/" + defencePts + "</h4>";
    this.char_card = "<div class='fighter " +  faction + "' " + "id='" + this.name + "'>" + this.char_card_name + this.char_card_hitdef + "</div>";

    // BASIC FUNCTIONS
    this.attack = function() {currentFoe -= attackPts; attackPts += 6}; // includes attackPts+=10;
    this.defend = function() {defencePts -= currentFoe.counterAttack}; // defencePts-= incoming attack; 
    this.defeated = function() {return this.defencePts <= 0;}; // actions once currentHero defencePts <= 0; Including display changes/animations
    this.won = function() {}; // actions once currentFoe is defeated;  Including display changes/animations

    // optional game functions
    this.powerUp = function() {}; // higher likelihood of power up for lower level characters --> !! LATER FEATURE
    this.badLuck = function() {}; // higher likelihood of bad luck for lower level Imperial characters --> !! LATER FEATURE
}

// PLAYER OBJECT TO TRACK A GAME'S PROGRESS AND USER STATS, END GAME STATUS

function Game() {
        this.gameOver = false;
        this.battlesWon = 0;
        this.currentHero; // user choice of Fighter, set to hold hero position and related game actions and display settings
        this.currentFoe; // Foe, set first by choice and chosen by function later, sets related game actions and display settings
}

// EASY MODE: initialize game characters from static sets

// REBEL ALLIANCE
let luke = new Fighter("Luke", 3, "rebel_char", 25, 125, "assets/images/luke.jpg");
let hanSolo = new Fighter("Han Solo", 3, "rebel_char", 20, 150, "assets/images/han.jpg");
let leia = new Fighter("Leia", 5, "rebel_char", 30, 200, "assets/images/leia.jpg");
let rebelAlliance = [luke, hanSolo, leia];
// EMPIRE
let darthVader = new Fighter("Darth Vader", 7, "empire_char", 40, 250, "assets/images/darth.jpg");
let stormTrooper = new Fighter("Storm Trooper", 2, "empire_char", 15, 100, "assets/images/trooper.jpg");
let badDroid = new Fighter("Imperial Droid", 2, "empire_char", 10, 75, "assets/images/droid.jpg");
let empire = [darthVader, stormTrooper, badDroid];
// HARD MODE: at game initialize create random characters from the properties


// GAMEPLAY CODE

// 1. Write out DOM for all avaialable characters and prompt selections to begin
        // highlight with border animation

        let gamePreview = function() {
                // essentially a splash page with the rules and a START button
                // FIRST write to display a static game mesage, present start button
                console.log("Game Preview Fire");
                $("#start_button").on("click", function() {gameSetup()});
        };

        let gameSetup = function () {
                $("#start_button").toggleClass(hide);
                $("#top_aux").text("CHOOSE YOUR HERO")
                let game = new Game();
                // sets up the character selection screen, resets the character and game stats
                
                // Loop to write the avaialable Rebel Alliance characters to select_rebel <div>
                for (let i = 0; i < rebelAlliance.length; i++) {
                        $("#select_rebel").append(createCard(rebelAlliance[i]));
                }

                // Loop to write the avaialable Empire characters to select_empire <div>
                for (let i = 0; i < empire.length; i++) {
                        $("#select_empire").append(createCard(empire[i]));
                }
                
                $("#top_aux").text("CHOOSE YOUR HERO")
                $(".fighter").on("click", function() {console.log("current hero: " + this.id)})
                $(".fighter").on("click", function() {currentHero = this; console.log("DEEPER current hero: " + currentHero.name)})
                // Don't allow fight against own faction  --  game.currentHero = this.id; 
        };
// 2. Re-write the DOM into current matchup mode, only 2 characters larger on the screen
        let battleSetup = function (currentHero, currentFoe) {
                // sets up the Battle Stage screen view
        };
// 3. Exectue attack/defend/powerup/badluck functions until win or loss state
        let battleStage = function(currentHero,currentFoe) {
                // offer click to attack trigger
                // executes attack and defence points actions
                        // invoke powerups and bad luck !! LATER FEATURE
                // trigger DOM text for each result --> !! LATER FEATURE: like a eased in rise up w/ opacity change and *pop* effect.        
                // status check for current battleState and gameState
                        // trigger continued Battle, Battle Over, or Game Over
        };
// 4. Animate winner and loser, allow winner to take visual dominance.
        let battleWon = function () {
                // display state for a successful battle
                // check status for next Battle or Game Win
                        // invoke a Next Battle state to choose next currentFoe
                        // OR Trigger Game Win state
                // head back to Battle Stage with new characters
        };
        let battleLost = function() {
                // display state for Battle Lost
                // Game Over
                // button to reset the game
        };


// GAME HELPER FUNCTIONS




console.log("defeated function return: " + darthVader.defeated() + "- defence pts: " + darthVader.defencePts);
darthVader.defencePts -= 300;
console.log("defeated function return: " + darthVader.defeated() + "- defence pts: " + darthVader.defencePts);

// ------------------------------------------------------------
 
// DOM SETUP

// .toggleClass()
// .addClass()
// .removeClass()
// .switchClass(removeClass, addClass, [options])

$("#select_rebel"); // div container for Rebel char selection at start
$("#select_empire"); // div container for Empire char selection at start
$("#battlefield"); // //div container for battle stage

$(document).ready(function () {
        gamePreview();
});

// SIMPLE TEST TRIGGER 

// $("#start_button").on("click", function () {
//         // Loop to write the avaialable Rebel Alliance characters to select_rebel <div>
//         // move to correct game stage trigger later
//         for (let i = 0; i < rebelAlliance.length; i++) {
//                 $("#select_rebel").append(createCard(rebelAlliance[i]));
//         }
//         // Loop to write the avaialable Empire characters to select_empire <div>
//         // move to correct game stage trigger later
//         for (let i = 0; i < empire.length; i++) {
//                 $("#select_empire").append(createCard(empire[i]));
//         }

//         $("#battlefield").toggleClass(hide); // this works, will be  handy when triggered between game stages
// })

// There will be basic DOM structure and ID zones to append

// There will be lots of chunks of dynamic DOM content that is created within the game code
        // think about which stages of the gameplay look like what, and how that wouls be marked up and styled
        // think about what properties and DOM elements can be stored in nimble variables. IMG src? <div>?

// Use CSS class states to enable as much of the visual changes as possible


// PRIORITIES AND APPROACH

// Create dyanmic jQuery DOM elements that create and write Character elements. 
                // break it all out into div sections and house the text nodes that relate inside