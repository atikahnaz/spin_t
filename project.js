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
    return rows;

};

const printRows = (rows) => {
    for (const row of rows) {
        let newRows = "";
        for (const [index, value] of row.entries()) {
            newRows += value;
            if (index != (row.length - 1)) {
                newRows += " | ";
            }
        }
        console.log(newRows);
    }
    
};

// give the user their winning

const totalWin = (rows, bet, lines) => {
    let win = 0;
    // check/iterate the rows for same symbol based on how many lines
    for (let row = 0; row < lines; row++) {
        const symbolRow = rows[row]
        let sameRow = true;
        for (const symbol of symbolRow) {
            if (symbol != symbolRow[0]) {
                sameRow = false;
                break;
            }
        }
        if (sameRow) {
            win += bet * SYMBOL_VALUE[symbolRow[0]];
        }       
    }
    return win;
};

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have $" + balance);
        const totalLines = numberOfLines();
        const amountBet = numberOfBet(balance, totalLines);
        balance -= amountBet * totalLines;
        const reels = spin();
        const rows = transpose(reels);
        console.log(reels);
        console.log(rows);
        printRows(rows);
        const win = totalWin(rows, amountBet, totalLines);
        balance += win;
        console.log("You won $" + win);
        console.log("Your balance $" + balance);

        if (balance <= 0) {
            console.log("You ran out of money");
            break;
        }

        const playAgain = prompt("You want to play again? (y / n) ");
        if (playAgain != "y") {
            break;
        }
    }
    
}

game();

