//Game states
//"WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enemy robot
//"Lose" - Player robot's health is zero or less

var fightOrSkip = function() {
    //ask the user if they'd like to fight or skip using function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle?');

    //conditional recursive function call
    if(promptFight === '' || promptFight === null){
        window.alert('You need to enter a valid answer! Please try again.');
        return fightOrSkip;
    };

    //if user picks the 'skip' confirm and then stop the loop
    if (promptFight === 'skip' || promptFight === 'SKIP'){
        //confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip?");
        //if yes (true), leave fight
        if(confirmSkip){
            window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye.');
            //subtract money from playerMoney for skipping
            playerInfo.playerMoney = playerInfo.money - 10;
            shop();
        };
    };
};

var fight = function(enemy){
    while(enemy.health > 0 && playerInfo.health > 0){
        // ask user if they'd like to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if a player chooses to skip
        fightOrSkip();

            //generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            //Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            //check enemy health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                // award money for winning
                playerInfo.money = playerInfo.money + 20;
                //leave while loop because enemy is dead
                break;
            } 
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

            //generate random damage value based on enemy's attack power
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);

            //Log a resulting message to the console so we know that it works.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            //check player's health
            if(playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave while loop because player is dead
                break;
            }
            else{
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
};

// function to start a new game
var startGame = function(){
    //reset player stats
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0){
            //let user know what round they are in, remember that arrays start at 0
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1));
            debugger;
            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];
            //reset enemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            //pass the pickedEnemyName variables's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);
            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if user wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the shop before the next round?");
                //if yes, take them to the store() function
                if (storeConfirm){
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
};

var endGame = function(){
    //if player is still alive, player wins!
    if (playerInfo.health > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    //ask player if they would like to play again
    var playerAgainConfirm = window.confirm("Would you like to play again?");
    if (playerAgainConfirm){
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }

};

var shop  = function(){
    //ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    //use switch to carry out action
    switch (shopOptionPrompt){
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            //do nothing so function will break
            break;

        default:
            window.alert("You did not pick a valid option, Try again");

            //call shop() again to force the player to pick a valid option
            shop();
            break;
    }
};

//functon to create a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min +1) + min);

    return value;
};

var getPlayerName = function() {
    var name = '';
    while (name === "" || name === null){
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        // keyword THIS allows the function to self-reference its owner, in this case, the playerInfo object
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function(){
        if (this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            // this is shorthand for (this.health = this.health + 20) or (this.money = this.money - 7)
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function(){
        if (this.money >= 7){
            window.alert("Upgrading player's attak by 6 for 7 dollars");
            this.attack += 6;
            this.money -= 7;
        }
        else{
            window.alert("You don't have enough money!");
        }
    }
};

// creates an ARRAY object. can access the robots by using enemyInfo[0], and getting the properties is as simple as enemyInfo[0].name
var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];


startGame();