// FIGHTER CHARACTER OBJECT // $$$ OPERATES AS INTENDED
function Fighter(name, id, level, faction, attackPts, defencePts, imgSource) {
    
        // BASIC PROPS
        this.name = name;
        this.id = id;
        this.level = level;
        this.faction = faction;
        this.attackPts = attackPts;
        this.defencePts = defencePts;
        this.counterAttack = Math.floor(defencePts * .25);
    
        // DISPLAY PROPS
        this.img = "style='background: #444 url(" + imgSource + ") no-repeat center'";
        this.char_card_name = "<h3>" + name + "</h3>";
        this.char_card_hitdef = "<h4>" + this.attackPts + "/" + this.defencePts + "</h4>";
        this.char_card = "<div class='fighter " +  faction + "' " + "id='" + id + "' " + this.img + ">" + this.char_card_name + this.char_card_hitdef + "</div>";
    
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
        this.round = 1;
        this.battlesWon = 0;
        this.currentHero = ""; // user choice of Fighter, set to hold hero position and related game actions and display settings
        this.currentFoe = ""; // Foe, set first by choice and chosen by function later, sets related game actions and display settings
        this.battle_display = "<div class = 'row battle_display' id='battle_display'>" + this.currentHero + this.currentFoe + "</div>";

/////// BATTLE FUNCTIONS
        this.attack = function(hero, foe) { // CHANGES HERO AND FOR ATTACK AND DEFENCE POINTS
            foe.defencePts -= hero.attackPts;
            hero.defencePts -= foe.counterAttack;
            hero.attackPts += 5;
            hero.char_card_hitdef = "<h4>" + hero.attackPts + "/" + hero.defencePts + "</h4>";
            foe.char_card_hitdef = "<h4>" + foe.attackPts + "/" + foe.defencePts + "</h4>";
            console.log("end of game.attack method. HERO: " + hero.char_card_hitdef + "  -  " + "FOE: " + foe.char_card_hitdef)
        }; 
        this.defeated = function (character) {  // CHANGE DEFEATED PROPERTY IF DEFENCE PTS <= ZERO
            if (character.defencePts <= 0) {
                character.defeated = true;
                console.log("end of game.defeated method");
                return true;
            }
        };
        this.nextFoe = function(foe) { // THIS IS LIKELY NOT NECESSARY AND NEEDS TO BE TRIMMED
                $("#next_battle_button").toggleClass(hide);
                var foeFaction = window[this.currentFoe.faction]; // gets the array of all characters
                game.currentFoe = foeFaction.find(function(element) {
                        if (element.defeated !== true) {
                                return element;
                        };
                });
                // GAME WON WHEN NO FOE LEFT TO CHOOSE FROM ENEMY FACTION ARRAY
                if (game.currentFoe == undefined) {
                        alert("YOU WIN!");
                } else {$("#battle_display div:last-child").replaceWith(game.currentFoe.char_card);}
                
                game.round++;
                console.log("end of game.nextFoe method: " + game.currentFoe);
                battleStage() //RETURN TO BATTLE STAGE
        };
};

//////// VARIABLE AND OBJECT PROCLAMATION  -  EASY MODE: initialize game characters from static sets

var show = "hide show"; // WORKS! and good place to define animations later
var hide = "show hide"; // WORKS! and good place to define animations later
var startOver = $(" <span id='start_over'>");
$(startOver).text("START OVER")

var $progress_button = "<a class='btn btn-light' id='progress_button'>PROGRESS BUTTON</a>"
var $battle_button = "<a class='btn btn-light' id='battle_button'>BATTLE BUTTON</a>"
var $next_battle = "<a class='btn btn-light' id='next_battle_button'>NEXT BATTLE</a>"

// CREATE GAME INSTANCE
var game = new Game;

// REBEL ALLIANCE CHARACTERS
var luke = new Fighter("Luke", "luke", 3, "rebel", 25, 125, "assets/images/luke.jpg");
var hanSolo = new Fighter("Han Solo", "hanSolo", 3, "rebel", 20, 150, "assets/images/han.jpg");
var leia = new Fighter("Leia", "leia", 5, "rebel", 30, 200, "assets/images/leia.jpg");
var rebel = [luke, hanSolo, leia];
// EMPIRE CHARACTERS
var darthVader = new Fighter("Darth Vader", "darthVader", 7, "empire", 40, 250, "assets/images/darth.jpg");
var stormTrooper = new Fighter("Storm Trooper", "stormTrooper", 2, "empire", 15, 100, "assets/images/trooper.jpg");
var imperialDroid = new Fighter("Imperial Droid", "imperialDroid", 2, "empire", 10, 75, "assets/images/droid.jpg");
var empire = [imperialDroid, stormTrooper, darthVader];


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
var testCase = false;
var chooseHero = function(id) { // $$$ OPERATES AS INTENDED
        switch (id) {
                case "luke":
                        game.currentHero = luke;
                        break;
                case "leia":
                        game.currentHero = leia;
                        break;
                case "hanSolo":
                        game.currentHero = hanSolo;
                        break;
                case "darthVader":
                        game.currentHero = darthVader;
                        break;
                case "stormTrooper":
                        game.currentHero = stormTrooper;
                        break;
                case "imperialDroid":
                        game.currentHero = imperialDroid;
                        break;
                default:
                        break;
        }
};

var chooseFoe = function(id) { // $$$ OPERATES AS INTENDED
        switch (id) {
                case "luke":
                        game.currentFoe = luke;
                        break;
                case "leia":
                        game.currentFoe = leia;
                        break;
                case "hanSolo":
                        game.currentFoe = hanSolo;
                        break;
                case "darthVader":
                        game.currentFoe = darthVader;
                        break;
                case "stormTrooper":
                        game.currentFoe = stormTrooper;
                        break;
                case "imperialDroid":
                        game.currentFoe = imperialDroid;
                        break;
                default:
                        break;
        }
};

var charChoose = function() {  // $$$ OPERATES AS INTENDED
        var current_choice = "hero";
        $(".fighter").on("click", function() {
                if (current_choice === "hero") {
                        chooseHero(this.id);
                        // FADE OUT SIBLINGS WITHIN SAME FACTION
                        $(this).addClass("highlight").siblings().fadeTo(500, .5);
                        current_choice = "foe";
                }
                else if (current_choice === "foe") {
                        chooseFoe(this.id);
                        // FADE OUT SIBLINGS WITHIN SAME FACTION
                        $(this).addClass("highlight_foe").siblings().fadeTo(500, .5);
                        // TRANSITION TO BATTLE STAGE
                        $("#select_rebel").fadeTo(800, 0);
                        $("#select_empire").fadeTo(300, 0);
                        setTimeout(battleStage, 1800);
                }
        });
        
}

// 3. Exectue attack/defend/powerup/badluck functions until win or loss state
var battleStage = function() {
        // WRITE THE DOM FOR VERSUS DISPLAY
        console.log("BATTLE STAGE BEGIN, ROUND: " + game.round);
        var $hero = game.currentHero;
        var $heroCard = game.currentHero.char_card;
        var $foe = game.currentFoe;
        var $foeCard = game.currentFoe.char_card; // check other members of faction, make array with current foe first
        var $versus = "<h1 id='versus'>VS.</h1>";
        var $battle_display = "<div class='row battle_display' id='battle_display'>" + $heroCard + $versus + $foeCard + "</div>";

        var hitDefUpdate = function() {
                //THEN CALL STATUS CHECKS
                if (game.defeated($hero) || $hero.defeated) {
                        // GAME OVER LOSE
                        console.log("hero defeated condition met");
                        $("#alerts").html("HERO HAS BEEN DEFEATED!");
                        // INITIATE THE GAME OVER MESSAGE AND STATE!!
                } else if (game.defeated($foe) || $foe.defeated) {
                        // CHANGE FOE
                        console.log("foe defeated condition triggered - " + $foe)
                        $("#alerts").empty().html("YOU HAVE DEFEATED " + $foe.name);
                        $("#battle_button").remove(); // REMOVE BATTLE BUTTON
                        $("#bottom_aux").html($next_battle); // ADD NEXT FOE BUTTON
                        $("#next_battle_button").on("click", function() {
                                game.nextFoe();
                        });
                } else if (game.round === 4) {
                        // GAME OVER WIN, CURRENTLY TRIGGERED WITHIN NEXTFOE()
                        // INITIATE THE GAME OVER WIN MESSAGE AND STATE!!
                        console.log("hero wins condition met");
                        $("#alerts").html("YOU ARE THE CHAMPION!");
                }

                $ref = game.currentHero.attackPts + "/" + game.currentHero.defencePts;
                $ref2 = game.currentFoe.attackPts + "/" + game.currentFoe.defencePts;
                
                $("#battle_display div:first-child h4").empty().html($ref);
                $("#battle_display div:last-child h4").empty().html($ref2);
                console.log("end of hiDefUpdate function from Battle Stage: " + $ref, + "  |  " + $ref2);
        };
        var nextRoundsPrint = function() {
                $("#battle_display div:last-child").empty().html($foeCard);
                console.log("end of nextRoundPrint function in Battle Stage");
        };

        if (game.round === 1 && !$foe.defeated) {
                $("#progress_button").addClass(hide).empty();
                $(".main_area").empty().append($battle_display);
                console.log("game round for initial battle DOM write checked");
        } else if (game.round >= 2  && $foe.defeated){
                console.log("game round for other rounds battle DOM write checked");
                nextRoundsPrint();
        }
        $("#bottom_aux").html($battle_button);

        
        $("#battle_button").on("click", function() {
                // WHEN CLICKED CALL ATTACK/DEFEND FUNCTION
                console.log("ATTACK INITIATED");
                game.attack($hero,$foe); // run atack and defence points adjustments
                hitDefUpdate();
        })
};

// ---------------------------INITIALIZE GAME---------------------------------
 
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
// var testText = $("#battle_display div:first-child h4").html();
// var testText2 = $("#battle_display div:last-child h4").html();
// console.log(testText + " " + testText2);
// console.log("DISPLAY HIT/DEFENSE UPDATED and DEFEAT TRIGGER");
// $("#alerts").html("HERO: " + $hero.char_card_hitdef + "  |  " + "FOE: " + $foe.char_card_hitdef);