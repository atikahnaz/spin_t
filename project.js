// collect user input

const prompt = require('prompt-sync')(); // we can use prompt to ask user for input

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
};

const SYMBOL_VALUE = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
};

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

// get number of lines

const numberOfLines = () => {
    while (true) {
        const getNumber = parseFloat(prompt("How many lines (1-3): ")); 
        if (isNaN(getNumber) || getNumber <= 0 || getNumber > 3) {
            console.log("Invalid number of lines, try again");
        } else {
            return getNumber;
        }
    }
};

// collect number of bet

const numberOfBet = (balance, lines) => {
    while (true) {
        const bet = parseFloat(prompt("How many bets: ")); 

        if (isNaN(bet) || bet <= 0 || bet > (balance / lines)) {
            console.log("Invalid bet. Enter new bet");
        } else {
            return bet;
        }
    }

};

// spin number

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
        // console.log(symbol, count);
        
        // insert symbol times count into symbols array
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
            // console.log(symbols);
        }
    }

    // create reels
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const newsymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const newindex = Math.floor(Math.random() * newsymbols.length);
            reels[i].push(newsymbols[newindex]);
            newsymbols.splice(newindex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = []
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            const newsymbol = reels[j][i];
            rows[i].push(newsymbol);
        }
    }

};


let balance = deposit();
const totalLines = numberOfLines();
const amountBet = numberOfBet(balance, totalLines);
const reels = spin();
const rows = transpose(reels);
console.log(reels);
console.log(rows);

