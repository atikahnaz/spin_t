// collect user input

const prompt = require('prompt-sync')(); // we can use prompt to ask user for input

const deposit = () => {
    while (true){
        const depositAmount = parseFloat(prompt("Enter the amount: "));
        if (isNaN(depositAmount) || depositAmount <= 0) {
            console.log("Invalid number. Enter number");
        } else{
            return depositAmount;
        }
    }
    
};
deposit();
