// PSEUDO CODE FOR FIGHT GAME

// 5 CHARACTERS AVAIALABLE, BASED ON COMMON CHARACTER OBJECT, INHERIT FUNCTIONS FROM PROTOTYPE

function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
    this.name = function() {return this.firstName + " " + this.lastName;};
}

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
    this.attack = function() {};
    this.defend = function() {};
    this.defeated = function() {};
    this.won = function() {};

    // optional game functions
    this.powerUp = function() {};
    this.badLuck = function() {};
}


// at game initialize 