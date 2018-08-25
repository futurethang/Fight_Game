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

    // BASIC FUNCTIONS
    this.attack = function() {}; // includes attackPts+=10;
    this.defend = function() {}; // defencePts-= incoming attack; 
    this.defeated = function() {}; // actions once currentHero defencePts <= 0; Including display changes/animations
    this.won = function() {}; // actions once currentFoe is defeated;  Including display changes/animations

    // optional game functions
    this.powerUp = function() {}; // higher likelihood of power up for lower level characters
    this.badLuck = function() {}; // higher likelihood of bad luck for lower level Imperial characters
}

// EASY MODE: initialize game characters from static sets

// REBEL ALLIANCE
let luke = new Fighter("Luke", 3, "Rebel Alliance", 25, 125, "assets/images/luke.jpg");
let hanSolo = new Fighter("Han Solo", 3, "Rebel Alliance", 20, 150, "assets/images/han.jpg");
let leia = new Fighter("Leia", 5, "Rebel Alliance", 30, 200, "assets/images/leia.jpg");
// EMPIRE
let darthVader = new Fighter("Darth Vader", 7, "Empire", 40, 250, "assets/images/darth.jpg");
let stormTrooper = new Fighter("Storm Trooper", 2, "Empire", 15, 100, "assets/images/trooper.jpg");
let badDroid = new Fighter("Imperial Droid", 2, "Empire", 10, 75, "assets/images/droid.jpg");

// HARD MODE: at game initialize create random characters from the properties


// GAMEPLAY CODE

// 1. Write out DOM for all avaialable characters and prompt selections to begin
        // highlight with border animation
// 2. Re-write the DOM into current matchup mode, only 2 characters larger on the screen

// 3. Exectue attack/defend/powerup/badluck functions until win or loss state
        // trigger DOM text for each result, like a eased in rise up w/ opacity change and *pop* effect.
// 4. Animate winner and loser, allow winner to take visual dominance.
// 5. Write DOM to allow choice of remaining enemy faction Foes for next battle

let currentHero; // user choice of Fighter, set to hold hero position and related game actions and display settings
                 // Based on selection, don't fight people on your own side
let currentFoe; // Foe, set first by choice and chosen by function later, sets related game actions and display settings





// DOM SETUP

// There will be basic DOM structure and ID zones to append

// There will be lots of chunks of dynamic DOM content that is created within the game code
        // think about which stages of the gameplay look like what, and how that wouls be marked up and styled
        // think about what properties and DOM elements can be stored in nimble variables. IMG src? <div>?

// Use CSS class states to enable as much of the visual changes as possible
