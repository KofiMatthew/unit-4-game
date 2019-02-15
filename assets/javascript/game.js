// Global variables:
var wizard;
var foe;
var spell;

// Wizards:
var wizArray = [
{
    name: "Luna Lovegood",
    baseAttack: [0,30],
    attackGrowth: 1.1,
    HP: 150,
},
{
    name: "Ron Weasley",
    baseAttack: [0,35],
    attackGrowth: 1.08,
    HP: 175,
},
{
    name: "Hermoine Granger",
    baseAttack: [10,50],
    attackGrowth: 1.15,
    HP: 100
},
{
    name: "Harry Potter",
    baseAttack: [5,40],
    attackGrowth: 1.1,
    HP: 125,
}]

// Foes:
var foeArray = [
    {
    name: "Draco Malfoy",
    HP: 60,
    baseAttack: [5,25],
    wing: 1.25,
    stup: 1,
    sect: 1.15,
    god: 1.2,
},{

    name: "Peter Pettigrew",
    HP: 90,
    baseAttack: [10,35],
    wing: 1.2,
    stup: 1.25,
    sect: 1,
    god: 1.15,
},{
    name: "Bellatrix Lestrange",
    HP: 120,
    baseAttack: [10,40],
    wing: 1.15,
    stup: 1.2,
    sect: 1.25,
    god: 1,
},{
    name: "Voldemort",
    HP: 150,
    baseAttack: [15,50],
    wing: 1,
    stup: 1.15,
    sect: 1.2,
    god: 1.25,
}]

var hogwartsArray = ['assets/images/luna0.jpg', 'assets/images/ron0.jpg', 'assets/images/herm0.jpg', 'assets/images/harry0.jpg']
var deatheaterArray = ['assets/images/draco.jpg', 'assets/images/wormtail.jpg', 'assets/images/bellatrix.jpg', 'assets/images/tom.jpg']

function displayImage(Array, ID, ref) {
    for (var i = 0; i < Array.length; i++) {
    console.log(ref[i].name);
    ID.append("<img src=" + Array[i] + " class='rounded wiz-images' id=" +ref[i].name+  " width='108px' height='144px'>");
  }};






//temporary - replace with listener
wizard = "ron";
foe = "draco";
spell = "wing";

//temp

function randomnumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min));
}

//attack function - calculates the attack power and adjusts hit points (and display).  If hit points zero, sends to win or loss function
let duel = function () {
    var test = draco.HP;
    console.log(test);
    test1 = foe.HP;
    console.log(test1);

    /* var basepower = randomnumber([[wizard][baseAttack[0]]],[[wizard][baseAttack[1]]]); */
var basePower = randomnumber(wizArray[wizard].baseAttack[0], wizArray[wizard].baseAttack[1]);
    /* console.log (basePower); */
  /*   var spellPower = [foeArray[foe].[];
    console.log(spellPower);
    var attack1 = (basePower)*(spellPower);
    console.log(attack1);
    alert(wizard+" attacked "+foe+" with "+spell+" for "+attack1+" hit points."); */
}
/* duel() */

//win function - displays message, animates win, allows for new opponent selection
//lose function - displays message, animates loss, allows for new game
//reset function - empties variables, counters, resets display
//victory function - all foes defeated 


//Activators:
$(document).ready(function(){

    $('#start').on('click', function() {
        displayImage(hogwartsArray, $("#wiz-images"), wizArray);
        displayImage(deatheaterArray, $("#DE-images"), foeArray);
       });

});

//listener for selection of the wizard - animates wizard on stage


//listener for selection of foe - animates foe on stage

//listener for Wizards duel - locks wizard and foe selection.  Calls attack function.  Animate wand blast?
