// FIGHTER CHARACTER OBJECT // $$$ OPERATES AS INTENDED
function Fighter(name, level, faction, attackPts, defencePts, imgSource) {
    
        // BASIC PROPS
        this.name = name;
        this.level = level;
        this.faction = faction;
        this.attackPts = attackPts;
        this.defencePts = defencePts;
        this.counterAttack = Math.floor(attackPts * .2);
    
        // DISPLAY PROPS
        // this.img = "<img id='char_img' src='" + imgSource + "' />";
        this.img = "style='background: #444 url(" + imgSource + ") no-repeat center'";
        this.char_card_name = "<h3>" + name + "</h3>";
        this.char_card_hitdef = "<h4>" + this.attackPts + "/" + this.defencePts + "</h4>";
        this.char_card = "<div class='fighter " +  faction + "' " + "id='" + name + "' " + this.img + ">" + this.char_card_name + this.char_card_hitdef + "</div>";
        
        // this.char_card.attr("style", "background-img: " + this.imgSource ";");
    
        // BASIC FUNCTIONS 
        this.defeated = false; // actions once currentHero defencePts <= 0; Including display changes/animations
        this.won = function() {}; // actions once currentFoe is defeated;  Including display changes/animations
    
        // optional game functions
        this.powerUp = function() {}; // higher likelihood of power up for lower level characters --> !! LATER FEATURE
        this.badLuck = function() {}; // higher likelihood of bad luck for lower level Imperial characters --> !! LATER FEATURE
    }
    
// PLAYER OBJECT TO TRACK A GAME'S PROGRESS AND USER STATS, END GAME STATUS
function Game() { // $$$ OPERATES AS INTENDED
        this.gameOver = false;
        this.gameStage = "";
        this.battlesWon = 0;
        this.currentHero = ""; // user choice of Fighter, set to hold hero position and related game actions and display settings
        this.currentFoe = ""; // Foe, set first by choice and chosen by function later, sets related game actions and display settings
        this.battle_display = "<div class = 'row battle_display' id='battle_display'>" + this.currentHero + this.currentFoe + "</div>";

/////// BATTLE FUNCTIONS
        this.foeQueue = function() { // CHOOSES NEXT OPPONENT FROM FOE FACTION ARRAY
                var foeFaction = window[this.currentFoe.faction]; // gets the array of all characters
                game.currentFoe = foeFaction.find(function(element) {
                        if (element.defeated !== true) {
                                return element;
                        };
                });
                battleStage() //RETURN TO BATTLE STAGE
        };
        this.attack = function(hero, foe) { // CHANGES HERO AND FOR ATTACK AND DEFENCE POINTS
            foe.defencePts -= hero.attackPts;
            hero.defencePts -= foe.counterAttack;
            hero.attackPts += 6;
            hero.char_card_hitdef = "<h4>" + hero.attackPts + "/" + hero.defencePts + "</h4>";
            foe.char_card_hitdef = "<h4>" + foe.attackPts + "/" + foe.defencePts + "</h4>";
        }; 
        this.defeated = function (character) {  // CHANGE DEFEATED PROPERTY IF DEFENCE PTS <= ZERO
            if (character.defencePts <= 0) {
                character.defeated = true;
                return true;
            }
        };
        this.nextFoe = function(foe) { // THIS IS LIKELY NOT NECESSARY AND NEEDS TO BE TRIMMED
                game.foeQueue(foe);
        };
};

//////// VARIABLE AND OBJECT PROCLAMATION  -  EASY MODE: initialize game characters from static sets

var show = "hide show"; // WORKS! and good place to define animations later
var hide = "show hide"; // WORKS! and good place to define animations later
var startOver = $(" <span id='start_over'>");
$(startOver).text("START OVER")

// CREATE GAME INSTANCE
var game = new Game;

// REBEL ALLIANCE CHARACTERS
var luke = new Fighter("Luke", 3, "rebel", 25, 125, "assets/images/luke.jpg");
var hanSolo = new Fighter("Han Solo", 3, "rebel", 20, 150, "assets/images/han.jpg");
var leia = new Fighter("Leia", 5, "rebel", 30, 200, "assets/images/leia.jpg");
var rebel = [luke, hanSolo, leia];
// EMPIRE CHARACTERS
var darthVader = new Fighter("Darth Vader", 7, "empire", 40, 250, "assets/images/darth.jpg");
var stormTrooper = new Fighter("Storm Trooper", 2, "empire", 15, 100, "assets/images/trooper.jpg");
var badDroid = new Fighter("Imperial Droid", 2, "empire", 10, 75, "assets/images/droid.jpg");
var empire = [badDroid, stormTrooper, darthVader];


////////// GAME HELPER FUNCTIONS

var createCard = function(character) { // IS THIS REALLY NEEDED?
        return character.char_card;
}

var gameSetup = function () { // $$$ OPERATES AS INTENDED
        $("#start_button").toggleClass(hide);
        $("#top_aux").append("CHOOSE YOUR HERO FIRST, YOUR FOE SECOND, OR&nbsp;").append(startOver);
        $(startOver).on("click", function () {location.reload(true);});

        // Loop to write the avaialable Rebel Alliance characters to select_rebel <div>
        for (var i = 0; i < rebel.length; i++) {
                $("#select_rebel").delay(500).append(createCard(rebel[i])).hide().fadeIn(700);
        }
        // Loop to write the avaialable Empire characters to select_empire <div>
        for (var i = 0; i < empire.length; i++) {
                $("#select_empire").delay(1200).append(createCard(empire[i])).hide().fadeIn(700);
        }

        charChoose(); // BEGIN FUNCTION TO SELECT HERO AND FOE CHARACTERS
};

var chooseHero = function(id) { // $$$ OPERATES AS INTENDED
        switch (id) {
                case "Luke":
                        game.currentHero = luke;
                        break;
                case "Leia":
                        game.currentHero = leia;
                        break;
                case "Han Solo":
                        game.currentHero = hanSolo;
                        break;
                case "Darth Vader":
                        game.currentHero = darthVader;
                        break;
                case "Storm Trooper":
                        game.currentHero = stormTrooper;
                        break;
                case "Imperial Droid":
                        game.currentHero = badDroid;
                        break;
                default:
                        break;
        }
};

var chooseFoe = function(id) { // $$$ OPERATES AS INTENDED
        switch (id) {
                case "Luke":
                        game.currentFoe = luke;
                        break;
                case "Leia":
                        game.currentFoe = leia;
                        break;
                case "Han Solo":
                        game.currentFoe = hanSolo;
                        break;
                case "Darth Vader":
                        game.currentFoe = darthVader;
                        break;
                case "Storm Trooper":
                        game.currentFoe = stormTrooper;
                        break;
                case "Imperial Droid":
                        game.currentFoe = badDroid;
                        break;
                default:
                        break;
        }
};

var charChoose = function() {  // $$$ OPERATES AS INTENDED
        game.gameStage = "CHOOSE YOUR PLAYERS";
        var current_choice = "hero";
        $(".fighter").on("click", function() {
                if (current_choice === "hero") {
                        chooseHero(this.id);
                        // this bit fades other options of the same faction and highlights for hero
                        // var card = $(this);
                        $(this).addClass("highlight").siblings().fadeTo(500, .5);
                        // $(this).addClass("highlight"); 
                        current_choice = "foe";
                }
                else if (current_choice === "foe") {
                        chooseFoe(this.id);
                        // this bit fades other options of the same faction and highlights for foe
                        $(this).addClass("highlight_foe").siblings().fadeTo(500, .5);
                        delay(1000);
                        battleStage();
                }
        });
        
}

// 3. Exectue attack/defend/powerup/badluck functions until win or loss state
var battleStage = function() {
        // WRITE THE DOM FOR VERSUS DISPLAY
        var $hero = game.currentHero;
        var $heroCard = game.currentHero.char_card;
        var $foe = game.currentFoe;
        var $foeCard = game.currentFoe.char_card; // check other members of faction, make array with current foe first
        var $versus = "<h1 id='versus'>VS.</h1>";
        var $battle_display = "<div class='row battle_display' id='battle.display'>" + $heroCard + $versus + $foeCard + "</div>";
        $(".main_area").empty().append($battle_display);

        $("#progress_button").addClass(show).removeClass(hide).html("ATTACK");
        // CHANGE BOTTOM AUX TO ATTACK BUTTON

            // WHEN CLICKED CALL ATTACK/DEFEND FUNCTION
            $("#progress_button").on("click", function() {
                //THEN CALL STATUS CHECKS

                if (!$hero.defeated && !$foe.defeated) {
                    // ATTACK
                    
                    game.attack($hero,$foe); // run atack and defence points adjustments
                    game.defeated($foe); // check if foe is defeated
                    
                    if (game.defeated($foe)) {
                        // change foe
                        
                        $("#alerts").empty().html("YOU HAVE DEFEATED " + $foe.name);
                        $("#progress_button").empty().html("NEXT BATTLE").on("click", function() {
                            game.nextFoe();
                        });
                        
                    } else {
                        $("#alerts").html("CHARACTER STATUS UPDATE - HERO: " + $hero.char_card_hitdef + " FOE: " + $foe.char_card_hitdef);
                        
                        $battle_display = "<div class='row battle_display' id='battle.display'>" + $heroCard + $versus + $foeCard + "</div>";
                        $(".main_area").empty().append($battle_display);                        
                    }

                    
                } else if ($foe.defeated) {
                    // NEXT FOE
                    
                }
                else {
                    // GAME OVER
                    
                    
                }
            })
};

// ------------------------------------------------------------
 
$(document).ready(function () {
        var start_button = $("#start_button");
        var test_button = $("#test_button");
        var rebel_col = $("#select_rebel");
        var empire_col  = $("#select_empire");
        var stage_indicator = $("#stage_indicator");

        var stage = 0;

        $("#start_button").on('click',function(){
        gameSetup();
        });
});

// There will be basic DOM structure and ID zones to append

// There will be lots of chunks of dynamic DOM content that is created within the game code
        // think about which stages of the gameplay look like what, and how that wouls be marked up and styled
        // think about what properties and DOM elements can be stored in nimble variables. IMG src? <div>?

// Use CSS class states to enable as much of the visual changes as possible


////// STASH CONSOLE LOG SCRIPTS:

// console.log("FOE QUEUE FUNCTION CALLED: " + this.currentFoe.faction);
// console.log(window[this.currentFoe.faction]);
// console.log("FOE UPDATED");
// 

// console.log("CHARACTER STATUS UPDATE - HERO: " + hero.defencePts + " FOE: " + foe.defencePts);
// console.log("GAME ATTACK FIRES");
// console.log("FOE DEFEATED");
// console.log("NEXT FOE FIRES");
// console.log("GAME SETUP FUNCTION RAN");
// console.log("CURRENT CHOICE: " + current_choice);

// console.log($hero);
// console.log($hero.defencePts);
// console.log($foe);
// console.log($foe.defencePts);
// console.log("BATTLE DISPLAY UPDATED");
// console.log("BUTTON UPDATED");
// console.log("CALL STATUS CHECKS");
// console.log("ATTACK CONDITION MET");
// console.log("FOE DEFEAT RETURN TRUE")
// console.log("CHARACTER STATUS UPDATE - HERO: " + $hero.char_card + " FOE: " + $foe.char_card);
// console.log("FOE DEFEATED #2");
// console.log("HERO DEFEATED");