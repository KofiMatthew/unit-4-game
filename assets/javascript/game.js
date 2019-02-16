// Global variables:
var wizard;
var foe;
var spell;
var chosenFoe;
var isWizChosen = false;
var isFoeChosen = false;
var activeSpell;
var activeWizard;
var count = 1;

var activeMin;
var activeMax;
var growth;
var HP;
var lifeBar;
var FoeHP;
var foeLifeBar;

var expel;
var conf;
var sect;
var petr;
var foeMin;
var foeMax;

// Wizards:
var wizArray = [
    {
        name: "Luna",
        baseMin: 1,
        baseMax: 30,
        attackGrowth: 0.1,
        HP: 150,
    },
    {
        name: "Ron",
        baseMin: 1,
        baseMax: 35,
        attackGrowth: .08,
        HP: 175,
    },
    {
        name: "Hermoine",
        baseMin: 10,
        baseMax: 50,
        attackGrowth: .15,
        HP: 100
    },
    {
        name: "Harry",
        baseMin: 5,
        baseMax: 40,
        attackGrowth: .1,
        HP: 125,
    }]

// Foes:
var foeArray = [
    {
    name: "Draco",
    HP: 60,
    min: 5,
    max: 25,
    expel: 1.25,
    conf: 1,
    sect: 1.15,
    petr: 1.25,
},{

    name: "Peter",
    HP: 90,
    min: 10,
    max: 35,
    expel: 1.2,
    conf: 1,
    sect: 1.25,
    petr: 1.15,
},{
    name: "Bellatrix",
    HP: 120,
    min: 10,
    max: 40,
    expel: 1.2,
    conf: 1.25,
    sect: 1.15,
    petr: 1,
},{
    name: "Voldemort",
    HP: 150,
    min: 15,
    max: 50,
    expel: 1.25,
    conf: 1,
    sect: 1.2,
    petr: 1.15,
}]

spells = [{
    name: "expel"
},{
    name: "conf"
},{
    name: "sect"
},{
    name: "petr"
}
]

var hogwartsArray = ['assets/images/luna0.jpg', 'assets/images/ron0.jpg', 'assets/images/herm0.jpg', 'assets/images/harry0.jpg']
var deatheaterArray = ['assets/images/Draco.jpg', 'assets/images/Peter.jpg', 'assets/images/Bellatrix.jpg', 'assets/images/Voldemort.jpg']
var spellArray = ['assets/images/expel.gif', 'assets/images/conf.gif', 'assets/images/sect.gif', 'assets/images/petr.gif']


//Okay, so I was originally planning for a single loop to populate all the images.  But then I realized that I wanted different classes for each group of images.
//So of course I could simplify the code below and specifically list the arrays that I'm using.  Still, it was a lot of work for me to make it work, and I'm leaving it.

function displayWiz(Array, ID, ref) {
    for (var i = 0; i < Array.length; i++) {
    ID.append("<img src=" + Array[i] + " class='rounded wiz-images' id=" +ref[i].name+  " width='108px' height='144px' value=" + i +" >");

    };
};

function displayFoes(Array, ID, ref) {
for (var i = 0; i < Array.length; i++) {
ID.append("<img src=" + Array[i] + " class='rounded foe-images' id=" +ref[i].name+  " width='108px' height='144px'>");
}
};

function displaySpells(Array, ID, ref) {
for (var i = 0; i < Array.length; i++) {
ID.append("<img src=" + Array[i] + " class='rounded spell-images' id=" +ref[i].name+  " width='200px' height='150px'>");
}
};

function randomnumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min));
};

//attack function - calculates the attack power and adjusts hit points (and display).  If hit points zero, sends to win or loss function
let duel = function () {
    var attack = randomnumber(activeMin, activeMax);
    console.log("base attack: " + attack);
    attack = (attack * (growth * count + 1) * activeSpell);
    console.log("final attack: " + attack);
    FoeHP = Math.floor(FoeHP - attack);
    foeLifeBar = Math.floor(((FoeHP - attack)/FoeHP)*100);
    console.log("Foe HP: " + FoeHP);
    $('.bg-info').width(foeLifeBar + "%");
    $('.bg-info').text(foeLifeBar + "%");

    count++

    
    /* $('div#somediv').width('70%'); */


    /* var basepower = randomnumber([[wizard][baseAttack[0]]],[[wizard][baseAttack[1]]]); */

    /*  */
  /*   var spellPower = [foeArray[foe].[];
    console.log(spellPower);
    var attack1 = (basePower)*(spellPower);
    console.log(attack1);
    alert(wizard+" attacked "+foe+" with "+spell+" for "+attack1+" hit points."); */
};
/* duel() */

//win function - displays message, animates win, allows for new opponent selection
//lose function - displays message, animates loss, allows for new game
//reset function - empties variables, counters, resets display
//victory function - all foes defeated 


//Activators:
$(document).ready(function(){

    //start button sets the board
    $('#start').on('click', function() {
        displayWiz(hogwartsArray, $("#wiz-images"), wizArray);
        displayFoes(deatheaterArray, $("#DE-images"), foeArray);
        displaySpells(spellArray, $("#spell-images"), spells);
        $('#start').attr("disabled", "disabled");
       });

    $("#wiz-images").on('click', function(event) {
        if (isWizChosen != true) {        
            wizard = (event.target.id);
            console.log("Wizard: " + wizard);
            
            switch (wizard) {
            case 'Luna':
                activeWizard = wizArray[0];
                break;
            case 'Ron':
            activeWizard = wizArray[1];
                break;
            case 'Hermoine':
            activeWizard = wizArray[2];
                break;
            case 'Harry':
            activeWizard = wizArray[3];
                break;
            }
            console.log("Active Wizard: " + activeWizard);              
            activeMin = activeWizard.baseMin;
            console.log("Active Min: " + activeMin);
            activeMax = activeWizard.baseMax;
            console.log("Active Max: " + activeMax);
            growth = activeWizard.attackGrowth;
            console.log("Growth: " + growth);
            HP = activeWizard.HP;
            console.log("HP: " + HP);

        
        $('#' + wizard).hide();
        $('#active-wiz').html("<img src=assets/images/" + wizard + 1 + ".jpg class='rounded mx-auto d-block spell-images' id=" + wizard +  " width='400px' height='300px'>");
        isWizChosen = true;
        }
    });

    $('#DE-images').on('click', function(event) {
        if (isFoeChosen != true) {
        foe = (event.target.id);
        console.log("Foe : " + foe);

        switch (foe) {
            case 'Draco':
                chosenFoe = foeArray[0];
                break;
            case 'Peter':
            chosenFoe = foeArray[1];
                break;
            case 'Bellatrix':
            chosenFoe = foeArray[2];
                break;
            case 'Voldemort':
            chosenFoe = foeArray[3];
                break;
            }
            console.log("Chosen Foe: " + chosenFoe);              
            expel = chosenFoe.expel;
            console.log("Expel: " + expel);
            conf = chosenFoe.conf;
            console.log("Conf: " + conf);
            sect = chosenFoe.sect;
            console.log("Sect: " + sect);
            petr = chosenFoe.petr;
            console.log("Petr: " + petr);
            FoeHP = chosenFoe.HP;
            console.log("HP: " + HP);
            foeMin = chosenFoe.min;
            console.log("Foe Min: " + foeMin);            
            foeMax = chosenFoe.max;
            console.log("Foe Max: " + foeMax);

        $('#' + foe).hide();
        $('#active-DE').html("<img src=assets/images/" + foe + ".jpg class='rounded mx-auto d-block spell-images' id=" + foe +  " width='250px' height='300px'>");
        isFoeChosen = true;
    }});

    $('#spell-images').on('click', function(event) {
        if (isFoeChosen === true) {
            spell = (event.target.id);
            console.log(spell);

            switch (spell) {
                case 'expel':
                activeSpell = expel;
                    break;
                case 'conf':
                activeSpell = conf;
                    break;
                case 'sect':
                activeSpell = sect;
                    break;
                case 'petr':
                activeSpell = petr;
                    break;
                }
            $('#active-spell').html("<img src=assets/images/" + spell + ".gif class='rounded mx-auto d-block spell-images' id=" + spell +  " width='200px' height='150px'>");
            }
            });

$('#attackBtn').on('click', function(event) {
    duel();
});
});



//listener for selection of the wizard - animates wizard on stage


//listener for selection of foe - animates foe on stage

//listener for Wizards duel - locks wizard and foe selection.  Calls attack function.  Animate wand blast?
