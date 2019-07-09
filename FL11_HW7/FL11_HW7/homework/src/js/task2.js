const minRandLim = 8;
let randLim = minRandLim;
let prize;
let currPrize;
const maxAttempts = 3;
let numAttempts;
let isWin = false;
let randomNumber;
let totalPrize = 0;
let isGame;
let isError = false;

do {
    prize = 100;
    currPrize = prize;
    numAttempts = maxAttempts;

    isGame = confirm('Do you want to play a game?');

    if (!isGame) {
        alert('You did not become a billionaire, but can.');
    } else {
        let userNumber;
        randomNumber = Math.floor(Math.random() * (randLim + 1));

        do {
            userNumber = prompt(
                `Choose o roulette pocket number from 0 to ${randLim}
Attempts left: ${numAttempts}
Total prize: ${totalPrize}
Possible prize on current attempt: ${prize}`, '');
            userNumber = parseInt(userNumber, 10);
            isError = isNaN(userNumber);
            if (isError) {
                alert('Incorrect number. Try again.');
            }
            if (userNumber === randomNumber) {
                let isContinue = confirm(
                    `Congratulation, you won! Your prize is: ${currPrize}$. Do you want to continue?`);
                totalPrize += currPrize;
                if (isContinue) {
                    randLim += 4;
                    prize *= 2;
                    currPrize = prize;
                    numAttempts = maxAttempts + 1;
                    randomNumber = Math.floor(Math.random() * (randLim + 1));
                } else {
                    numAttempts = 1;
                }
                isWin = true;
            } else {
                currPrize /= 2;
                isWin = false;
                if (numAttempts === 1) {
                    totalPrize = 0;
                    randLim = minRandLim;
                }
            }
        } while (--numAttempts);

        alert(`Thank you for your participation. Your prize is: ${isWin ? totalPrize : 0}$`);

    }
} while (isGame);