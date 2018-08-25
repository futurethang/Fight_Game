// PSEUDO CODE FOR FIGHT GAME

// 5 CHARACTERS AVAIALABLE, BASED ON COMMON CHARACTER OBJECT, INHERIT FUNCTIONS FROM PROTOTYPE

function Fighter(name, level, faction, attackPts, defencePts, imgSource) {
    
    // BASIC PROPS
    this.name = name;
    this.level = level;
    this.faction = faction;
    this.attackPts = attackPts;
    this.defencePts = defencePts;

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
let luke = new Fighter("Luke", 3, "Rebel Alliance", 25, 125, "assets/images/luke.jpg");
let hanSolo = new Fighter("Han Solo", 3, "Rebel Alliance", 20, 150, "assets/images/han.jpg");
let leia = new Fighter("Leia", 5, "Rebel Alliance", 30, 200, "assets/images/leia.jpg");

let darthVader = new Fighter("Darth Vader", 7, "Empire", 40, 250, "assets/images/darth.jpg");
let stormTrooper = new Fighter("Storm Trooper", 2, "Empire", 15, 100, "assets/images/trooper.jpg");
let badDroid = new Fighter("Imperial Droid", 2, "Empire", 10, 75, "assets/images/droid.jpg");

// HARD MODE: at game initialize create random characters from the properties


// GAMEPLAY CODE
let currentHero; // user choice of Fighter, set to hold hero position and related game actions and display settings
                 // Based on selection, don't fight people on your own side
let currentFoe; // Foe, set first by choice and chosen by function later, sets related game actions and display settings
