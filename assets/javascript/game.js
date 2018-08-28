// CHARACTER OBJECT

function Fighter(name, level, faction, attackPts, defencePts, imgSource) {
    
        // BASIC PROPS
        this.name = name;
        this.level = level;
        this.faction = faction;
        this.attackPts = attackPts;
        this.defencePts = defencePts;
        this.counterAttack = Math.floor(attackPts * .2);
    
        // DISPLAY PROPS
    //     this.img = "<img id='char_img' src='" + imgSource + "' />";
        this.img = "style='background: #444 url(" + imgSource + ") no-repeat center'";
        this.char_card_name = "<h3>" + name + "</h3>";
        this.char_card_hitdef = "<h4>" + attackPts + "/" + defencePts + "</h4>";
    //     this.char_card = "<div class='fighter " +  faction + "' " + "id='" + this.name + "'>" + this.img + this.char_card_name + this.char_card_hitdef + "</div>";
        this.char_card = "<div class='fighter " +  faction + "' " + "id='" + this.name + "' " + this.img + ">" + this.char_card_name + this.char_card_hitdef + "</div>";
    //     this.char_card.attr("style", "background-img: " + this.imgSource ";");
    
        // BASIC FUNCTIONS
        this.attack = function() {}; //currentFoe -= attackPts; attackPts += 6}; // includes attackPts+=10;
        this.defend = function() {}; //defencePts -= currentFoe.counterAttack}; // defencePts-= incoming attack; 
        this.defeated = function() {return this.defencePts <= 0;}; // actions once currentHero defencePts <= 0; Including display changes/animations
        this.won = function() {}; // actions once currentFoe is defeated;  Including display changes/animations
    
        // optional game functions
        this.powerUp = function() {}; // higher likelihood of power up for lower level characters --> !! LATER FEATURE
        this.badLuck = function() {}; // higher likelihood of bad luck for lower level Imperial characters --> !! LATER FEATURE
    }
    
// PLAYER OBJECT TO TRACK A GAME'S PROGRESS AND USER STATS, END GAME STATUS

function Game() {
        this.gameOver = false;
        this.gameStage = ["BEGIN", "CHOOSE CHARACTER", "BATTLE STAGE", "GAME OVER"];
        this.battlesWon = 0;
        this.currentHero = ""; // user choice of Fighter, set to hold hero position and related game actions and display settings
        this.currentFoe = ""; // Foe, set first by choice and chosen by function later, sets related game actions and display settings
}


//////// VARIABLE AND OBJECT PROCLAMATION  -  EASY MODE: initialize game characters from static sets

let show = "hide show"; // WORKS! and good place to define animations later
let hide = "show hide"; // WORKS! and good place to define animations later
let startOver = $(" <span id='start_over'>");
$(startOver).text("START OVER")

// CREATE GAME INSTANCE
let game = {};

// REBEL ALLIANCE CHARACTERS
let luke = new Fighter("Luke", 3, "rebel_char", 25, 125, "assets/images/luke.jpg");
let hanSolo = new Fighter("Han Solo", 3, "rebel_char", 20, 150, "assets/images/han.jpg");
let leia = new Fighter("Leia", 5, "rebel_char", 30, 200, "assets/images/leia.jpg");
let rebelAlliance = [luke, hanSolo, leia];
// EMPIRE CHARACTERS
let darthVader = new Fighter("Darth Vader", 7, "empire_char", 40, 250, "assets/images/darth.jpg");
let stormTrooper = new Fighter("Storm Trooper", 2, "empire_char", 15, 100, "assets/images/trooper.jpg");
let badDroid = new Fighter("Imperial Droid", 2, "empire_char", 10, 75, "assets/images/droid.jpg");
let empire = [darthVader, stormTrooper, badDroid];


////////// GAME HELPER FUNCTIONS

// Function called in the character card writing loop that appends selection row divs
let createCard = function(character) {
        // pulls from the character object's property that defines the <div> element.
        return character.char_card;
}

let chooseHero = function(id) {
        console.log("CHOOSE HERO FIRE: " + id);
        switch (id) {
                case "Luke":
                        console.log("LUKE");
                        game.currentHero = luke;
                        console.log(game.currentHero);
                        break;
                case "Leia":
                        console.log("LEIA");
                        game.currentHero = leia;
                        console.log(game.currentHero);
                        break;
                case "Han Solo":
                        console.log("Han Solo");
                        game.currentHero = hanSolo;
                        console.log(game.currentHero);
                        break;
                case "Darth Vader":
                        console.log("Darth Vader");
                        game.currentHero = darthVader;
                        console.log(game.currentHero);
                        break;
                case "Storm Trooper":
                        console.log("Storm Trooper");
                        game.currentHero = stormTrooper;
                        console.log(game.currentHero);
                        break;
                case "Imperial Droid":
                        console.log("Imperial Droid");
                        game.currentHero = badDroid;
                        console.log(game.currentHero);
                        break;
                default:
                        console.log("DEFAULT");
                        break;
        }
};

let chooseFoe = function(id) {
        console.log("CHOOSE HERO FIRE: " + id);
        switch (id) {
                case "Luke":
                        console.log("LUKE");
                        game.currentFoe = luke;
                        console.log(game.currentFoe);
                        break;
                case "Leia":
                        console.log("LEIA");
                        game.currentFoe = leia;
                        console.log(game.currentFoe);
                        break;
                case "Han Solo":
                        console.log("Han Solo");
                        game.currentFoe = hanSolo;
                        console.log(game.currentFoe);
                        break;
                case "Darth Vader":
                        console.log("Darth Vader");
                        game.currentFoe = darthVader;
                        console.log(game.currentFoe);
                        break;
                case "Storm Trooper":
                        console.log("Storm Trooper");
                        game.currentFoe = stormTrooper;
                        console.log(game.currentFoe);
                        break;
                case "Imperial Droid":
                        console.log("Imperial Droid");
                        game.currentFoe = badDroid;
                        console.log(game.currentFoe);
                        break;
                default:
                        console.log("DEFAULT");
                        break;
        }
};

let gameSetup = function () {
        $("#start_button").toggleClass(hide);
        $("#top_aux").append("CHOOSE YOUR HERO FIRST, YOUR FOE SECOND, OR&nbsp;").append(startOver);
        $(startOver).on("click", function () {location.reload(true);});
        // sets up the character selection screen, resets the character and game stats                
        // Loop to write the avaialable Rebel Alliance characters to select_rebel <div>
        for (let i = 0; i < rebelAlliance.length; i++) {
                $("#select_rebel").append(createCard(rebelAlliance[i]));
        }
        // Loop to write the avaialable Empire characters to select_empire <div>
        for (let i = 0; i < empire.length; i++) {
                $("#select_empire").append(createCard(empire[i]));
        }
        
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

// ------------------------------------------------------------
 
$(document).ready(function () {
        let start_button = $("#start_button");
        let test_button = $("#test_button");
        let rebel_col = $("#select_rebel");
        let empire_col  = $("#select_empire");
        let stage_indicator = $("#stage_indicator");
        let stage = 0;
        game = new Game();

        // MAIN GAME LOGIC

        if (stage === 0) {
                console.log("STAGE 1: BEGIN");
                console.log("STAGE: " + game.gameStage[stage]);
                stage_indicator.text("");
        };

        start_button.on("click", function() { // this is the main trigger to increment the stage and move the game along, but not a Test button
                stage++; // !!! KEY INCREMENTER TO FORCE GAME STATUS ALONG !!!
                
                if (stage === 1) {
                        console.log("STAGE 2: CHOOSE CHARACTER");
                        console.log("STAGE: " + game.gameStage[stage]);
                        stage_indicator.text(game.gameStage[stage]);
                        gameSetup();
                        // FOLLOWING IS THE SELECTION FOR BATTLE
                        let current_choice = "hero";
                        let hero, foe;
                        $(".fighter").on("click", function() {
                                let newSpot;
                                
                                // all fighter divs are listening
                                // deactivate other faction options when one is chosen to prevent same-side fights
                                // if when clicked current_choice === hero,  --> ASSIGN HERO
                                // if when clicked current_choice === foe,  --> ASSIGN FOE
                                console.log("CURRENT CHOICE: " + current_choice);
                                if (current_choice === "hero") {
                                        chooseHero(this.id);
                                        hero = this.id;
                                        current_choice = "foe";
                                }
                                if (current_choice === "foe") {
                                        chooseFoe(this.id);
                                        foe = this.id;
                                        // move to next game stage
                                        stage++;
                                }
                                
                                // the following is useful for deactivating similar faction selections
                                // can be peeled of into helper function that checks the click element
                                if ($(this).hasClass("rebel_char")) {
                                        // chooseHero(this.id);
                                        $("#select_rebel").addClass(hide); 
                                        // newSpot = $(".current_hero");
                                } else if ($(this).hasClass("empire_char")) {
                                        // chooseFoe(this.id);
                                        $("#select_empire").addClass(hide); 
                                        // newSpot = $(".current_hero");
                                }
                                console.log(hero + ":" + foe);
                                console.log("CURRENT CHOICE ALT: " + current_choice);
                                // the following is useful to move selection to the placeholder spot. needs to be broken up into hero/foe
                                // console.log("newspot set");
                                $(this).appendTo(newSpot);
                                console.log(game);
                                // TOGGLE IS WRONG, IT WILL GO BACK AND FORTH WITH ANOTHER CLICK
                                $(".fighter").off("click", function() {});
                        });
                };

                if (stage === 2) {
                        console.log("STAGE 3: BATTLE MODE");
                        console.log("STAGE: " + game.gameStage[stage]);
                        stage_indicator.text(game.gameStage[stage]);
                };

                if (stage === 3) {
                        console.log("STAGE 4: GAME OVER");
                        console.log("STAGE: " + game.gameStage[stage]);
                        stage_indicator.text(game.gameStage[stage]);
                };
        });
});

// There will be basic DOM structure and ID zones to append

// There will be lots of chunks of dynamic DOM content that is created within the game code
        // think about which stages of the gameplay look like what, and how that wouls be marked up and styled
        // think about what properties and DOM elements can be stored in nimble variables. IMG src? <div>?

// Use CSS class states to enable as much of the visual changes as possible


// PRIORITIES AND APPROACH

// Create dyanmic jQuery DOM elements that create and write Character elements. 
                // break it all out into div sections and house the text nodes that relate inside

// CURRENT STATUS:
// I can have the board look the way I need, or at least close to it, but I don't know how to get the control flow of the game out of the event listener. I want to SELECT HERO then CLEAR that faction's line, and my NEXT selection SET FOE, and exit into the BATTLE STAGE of the game.
// This is the wall I have hit and need class support.

// WHAT CAN I WORK ON IN THE MEANTIME?
// I can protoype the BATTLE STAGE LAYOUT, the ATTACK / DEFEND MECHANICS, test out ANIMATION STYLES, 



////////// !!! CODE GRAVEYARD !!! //////////////


        // let gamePreview = function() {
        //         // essentially a splash page with the rules and a START button
        //         // FIRST write to display a static game mesage, present start button
        //         $("#start_button").on("click", function() {gameSetup()});
        // };



// while (!game.gameOver) {
//         if (game.gameStage === "setup") {
//                 // start_button.on("click", function() {gameSetup()});
//                 // keep running the game here
//                 console.log(game.gameStage);
//                 $("#test_button").on("click", function () { charChoose() })

//         } else if (game.gameStage === "char_choose") {
//                 console.log(game.gameStage);
//                 test_button.on("click", function () { game.gameStage = "battle_stage"})


//         } else if (game.gameStage === "battle_stage")  {
//                 console.log(game.gameStage);
//                 test_button.on("click", function () { game.gameStage = "game_end"})
                
        
//         } else if (game.gameStage === "game_end") {
//                 console.log(game.gameStage);
//                 test_button.on("click", function () { game.gameStage = "setup"})


//         } else { console.log("ERROR"); break;};
//         game.gameOver = true;
// }