//Game states
//"WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enemy robot
//"Lose" - Player robot's health is zero or less


var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


var fight = function(enemyName){
    while(enemyHealth > 0 && playerHealth > 0){
        // ask user if they'd like to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if a player chooses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit");

            //if yes (true), leave fight
            if (confirmSkip){
                window.alert(playerName + " has chosen to skip this fight!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
                }  
            }

            //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in 'enemyHealth' variable
            enemyHealth = enemyHealth - playerAttack;
            //Log a resulting message to the console so we know that it worked.
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            //check enemy health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                // award money for winning
                playerMoney = playerMoney + 20;
                //leave while loop because enemy is dead
                break;
            } 
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable
            playerHealth = playerHealth - enemyAttack;

            //Log a resulting message to the console so we know that it works.
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

            //check player's health
            if(playerHealth <= 0) {
                window.alert(playerName + " has died!");
                // leave while loop because player is dead
                break;
            }
            else{
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        }
}

for (var i = 0; i < enemyNames.length; i++) {
    //call fight function with enemy robot
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}