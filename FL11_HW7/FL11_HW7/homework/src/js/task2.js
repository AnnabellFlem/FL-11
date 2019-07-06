let randLim = 1;//
let prize;
let currPrize;
let numAttempts;
let isWin = false;
let randomNumber;
let totalPrize = 0;
let isGame;

do {
    prize = 100;
    currPrize = prize;
    numAttempts = 1;//
    
    isGame = confirm("Do you want to play a game?");

    if (!isGame) {
        alert("You did not become a billionaire, but can.");
    } else {
        let userNumber = "";

        do {
            randomNumber = Math.floor(Math.random() * randLim);
            userNumber = prompt("Enter a number of pocket on which the ball could land", "");
            alert(`${userNumber}:${randomNumber}:${userNumber == randomNumber}`);
            //console.log(randomNumber, userNumber, userNumber === randomNumber, userNumber == randomNumber);
            if (userNumber == randomNumber) {
                let isContinue = confirm(`Congratulation, you won! Your prize is: ${currPrize}$. Do you want to continue?`);
                totalPrize += currPrize;
                if (isContinue) {
                    randLim += 4;
                    prize *= 4;
                    currPrize = prize;
                    numAttempts = 2;//
                } else {
                    numAttempts = 1;
                }
                isWin = true;
            } 
            currPrize -= currPrize / 2;
        } while (--numAttempts);

        alert(`Thank you for your participation. Your prize is: ${ isWin ? totalPrize : 0 }$`); 
    }
} while (isGame);

// for (let i = numAttempts; i < 0; i--) {
//     if (userNumber === randomNumber) {
//         alert(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`);
//     } else {
//         prize -= prize / 2;
//         i--;
//         userNumber = prompt("Enter a number of pocket on which the ball could land", "");
//     }
//     if (numAttempts === 0) {
//         alert(`Thank you for your participation. Your prize is: ${prize}$`);
//     }
// }
//}
