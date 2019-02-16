// Global variables:

//wizard oriented variables
var wizard;
var isWizChosen = false;
var activeWizard;
var activeMin;
var activeMax;
var growth;
var HP;
var HPbase;
var lifeBar;
var winCount = 0;

//foe Death Eater oriented variables
var foe;
var chosenFoe;
var isFoeChosen = false;
var activeSpell;
var count = 1;
var foeMin;
var foeMax;
var FoeHP;
var FoeHPbase;
var foeLifeBar;

//spell oriented variables
var isSpellChosen = false;
var spell;
var expel;
var conf;
var sect;
var petr;


// Wizards:
var wizArray = [
    {
        name: "Luna",
        baseMin: 1,
        baseMax: 25,
        attackGrowth: 0.1,
        HP: 200,
    },
    {
        name: "Ron",
        baseMin: 3,
        baseMax: 30,
        attackGrowth: .08,
        HP: 190,
    },
    {
        name: "Hermoine",
        baseMin: 5,
        baseMax: 30,
        attackGrowth: .15,
        HP: 180,
    },
    {
        name: "Harry",
        baseMin: 1,
        baseMax: 30,
        attackGrowth: .1,
        HP: 175,
    }]

// Foes:
var foeArray = [
    {
    name: "Draco",
    HP: 60,
    min: 5,
    max: 25,
    expel: 1.75,
    conf: 1.5,
    sect: 1.25,
    petr: 1.15,
},{

    name: "Peter",
    HP: 70,
    min: 10,
    max: 35,
    expel: 1.5,
    conf: 1.25,
    sect: 1.15,
    petr: 1.75,
},{
    name: "Bellatrix",
    HP: 80,
    min: 10,
    max: 40,
    expel: 1.25,
    conf: 1.15,
    sect: 1.75,
    petr: 1.5,
},{
    name: "Voldemort",
    HP: 90,
    min: 10,
    max: 45,
    expel: 1.15,
    conf: 1.75,
    sect: 1.5,
    petr: 1.25,
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


//Okay, so I was originally planning for a single loop to populate all the images.  But then I realized that I wanted different classes applied to each group of images.
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

//duel function - calculates the attack power and adjusts hit points (and display).  If hit points zero, sends to win or lose function
let duel = function () {
    var counterAttack = randomnumber(foeMin, foeMax);
    console.log("foe attack: " + counterAttack);
    HP = Math.floor(HP - counterAttack);
    console.log("Wiz HP: " + HP);
    $('#foeMove').text(foe + ' attacks ' + wizard + ' for ' + counterAttack + ' hit points.');
    lifeBar = Math.floor(((HP)/HPbase)*100);
    console.log("wiz life bar: " + lifeBar);
    console.log("wiz HP base: " + HPbase);
    $('.bg-success').width(lifeBar + "%");
    $('.bg-success').text(lifeBar + "%");

    var attack = randomnumber(activeMin, activeMax);
    console.log("base attack: " + attack);
    attack = Math.floor((attack * (growth * count + 1) * activeSpell));
    console.log("final attack: " + attack);
    FoeHP = Math.floor(FoeHP - attack);
    console.log("Foe HP: " + FoeHP);
    $('#wizMove').text(wizard + ' attacks ' + foe + ' for ' + attack + ' hit points.');
    foeLifeBar = Math.floor(((FoeHP)/FoeHPbase)*100);
    console.log("foe life bar: " + foeLifeBar);
    console.log("foe HP base: " +FoeHPbase);
    $('.bg-info').width(foeLifeBar + "%");
    $('.bg-info').text(foeLifeBar + "%");
    count++
    
    if (HP <= 0) {
        gameOver()
    }
    if (FoeHP <= 0) {
        winCount++
        if (winCount == 4){
            gameComplete();
            return;
        }
        else if (winCount >= 2) {
        $('#active-wiz').html("<img src=assets/images/" + wizard + 2 + ".jpg class='rounded mx-auto d-block spell-images' id=" + wizard +  " width = '400px' height='400px'>");
        }
        gameCont()
    }
}

//win function - displays message, animates win, allows for new opponent selection
let gameCont = function() {
    isFoeChosen = false;
    $('#active-DE').hide('#' + foe);
    $('#wizMove').text(wizard + ' has defeated ' + foe + '!');
    $('#foeMove').text('Choose another opponent');
    $('.btn-danger').attr("disabled", "disabled");

}

//lose function - displays message, animates loss, allows for new game
let gameOver = function() {
    $('#active-wiz').hide('#' + wizard);
    $('#active-DE').hide('#' + foe);
    $('#active-spell').hide('#' + spell);
    $('#active-wiz').html("<img src=assets/images/cemetery.jpg class='rounded mx-auto d-block spell-images' id='cemetery'  width = 'auto' height='400px'>");
    $('#active-wiz').show('#cemetery');
    $('#wizMove').text(wizard + ' has been defeated by ' + foe + '!');   
    setTimeout(refresh,10000);
    function refresh () {
        location.reload();
    }    
}

//victory function - all foes defeated 
let gameComplete = function () {
    $('#wizMove').text(wizard + ' has defeted all the Death Eaters!!!');
    setTimeout(refresh,5000)
    function refresh () {
        location.reload();
    }    
}

//Activators:
$(document).ready(function(){

    //start button sets the board
    $('#start').on('click', function() {
        displayWiz(hogwartsArray, $("#wiz-images"), wizArray);
        displayFoes(deatheaterArray, $("#DE-images"), foeArray);
        displaySpells(spellArray, $("#spell-images"), spells);
        $('#start').attr("disabled", "disabled");
       });

    //function for the selection of wizard on click event
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
            HPbase = activeWizard.HP;
            lifeBar = "100";
            console.log("HP: " + HP);

        
        $('#' + wizard).hide();
        $('#active-wiz').html("<img src=assets/images/" + wizard + 1 + ".jpg class='rounded mx-auto d-block spell-images' id=" + wizard +  " width='400px' height='300px'>");
        isWizChosen = true;
        $('.bg-success').width(lifeBar + "%");
        $('.bg-success').text(lifeBar + "%");
        }
    });
    //function for the selection of foe or Death Eater
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
            FoeHPbase = chosenFoe.HP;
            foeLifeBar = "100";
            console.log("HP: " + HP);
            foeMin = chosenFoe.min;
            console.log("Foe Min: " + foeMin);            
            foeMax = chosenFoe.max;
            console.log("Foe Max: " + foeMax);

        $('#' + foe).hide();
        $('#active-DE').html("<img src=assets/images/" + foe + ".jpg class='rounded mx-auto d-block spell-images' id=" + foe +  " width='250px' height='300px'>");
        $('#active-DE').show('#' + foe);

        isFoeChosen = true;
        $('.btn-danger').removeAttr("disabled");
        $('.bg-info').width(foeLifeBar + "%");
        $('.bg-info').text(foeLifeBar + "%");
    }});

    //function for the selection of spell
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
            isSpellChosen = true;
            }
            });
//function for what happens when the attack button is clicked
$('#attackBtn').on('click', function(event) {
    if (isSpellChosen === true){
    duel();
    }
    else {
    $('#wizMove').text('Select a spell to attack with.');
    }
});
});
