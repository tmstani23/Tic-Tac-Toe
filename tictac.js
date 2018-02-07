
//create game board
//X's turn
//X O O
//   
//X O X
//create a tic tac toe game where the computer never loses:
let compP = "X";
let realP = "O";
let currentBoard = [ 0,    "X",   2, 
                      3,    "O",   "O",    
                     "X",   "O", "X"];
let tempBoard = [];
let score;
let openPositions = [];
let isRunning;
let realPTurn;
let realPInput;
let compPTurn;
let result;
let realPWon;
let compPWon;
//define rules of the game by indices:
//create winning board function:

        //if index 0 and 3 and 6 = compP:


     
function winningBoard(player, board) {   
        //3 in a row vertical
        //col 1
    if(board[0] == player && board[3] == player && board[6] == player) {
        score = 10;
        return score;
    }
    
    //col 2
    if(board[1] == player && board[4] == player && board[7] == player) {
        score = 10;
        return score;
    }
    //col 3
    if(board[2] == player && board[5] == player && board[8] == player) {
        score = 10;
        return score;
    }
//3 in a row horizontal:
//row 1
    if(board[0] == player && board[1] == player && board[2] == player) {
        score = 10;
        return score;
    }
//row 2
    if(board[3] == player && board[4] == player && board[5] == player) {
        score = 10;
        return score;
    }
//row 3
    if(board[6] == player && board[7] == player && board[8] == player) {
        score = 10;
        return score;
    }
//3 in a row diag
    if(board[0] == player && board[4] == player && board[8] == player) {
        score = 10;
        return score;
    }
    if(board[2] == player && board[4] == player && board[6] == player) {
        score = 10;
        return score;
    }   
}

function getOpenPos(board) {
    openPositions = [];
    for(i=0; i<board.length; i++){
        if (board[i]!="X" && board[i]!="O") {
            openPositions.push(i);
        }
    }
}

//create compMove function:
function compMove() {
    let winningPosition;
    let result;
    let hasMoved = false;
    //console.log(result);
    //board positions =   [0, 1, 2, 
    //                     3, 4, 5,    
    //                     6, 7, 8];
    // let currentBoard = ["O",  1,   2, 
    //                     "X", "X",  5,    
    //                     "X", "O", "X"];
    
   //get open positions
    getOpenPos(currentBoard);
    //check each open position:
    openPositions.every(function (position) {
        //create copy of main board
        tempBoard = Array.from(currentBoard);
        //console.log(tempBoard);
        //console.log(position); 
        //place an x at the position
        tempBoard[position] = "X";
        //console.log(tempBoard);
        // //test if win condition
        // if(compPWon === true){
        //     console.log("compwontrue");
        //     return false;
        // }
        //console.log(winningBoard(compP, tempBoard));
        if(winningBoard(compP, tempBoard) === 10) {
            //winningPosition = position;
            //if a comp win is found pick spot and update base board
            currentBoard[position] = compP;
            hasMoved = true;
            //console.log(currentBoard + ` compwins`)
            //result = winningPosition + " " + compP;
            compPWon = true;
            //go to determine winner function:
            determineWin();
            //displayMsg(result);
            //isRunning = false;
            return false;
        }
        else {
            return true;
        }
    });
    
    //if no comp wins are found check all open spots for real player wins
    //for each position:
    //if there is a possible win location block it:
    if (!compPWon) {
        openPositions.every(function (position) {
            //create copy of main board
            
            tempBoard = Array.from(currentBoard);
            //console.log(tempBoard);
            //console.log(position); 
            //place an x at the position
            tempBoard[position] = "O";
            
            // if(compPWon === true){
            //     console.log("compwontrue");
            //     return false;
            // }
            //console.log(tempBoard);
            //test if win condition
            //console.log(winningBoard(realP, tempBoard));
            if(winningBoard(realP, tempBoard) === 10) {
                //winningPosition = position;
                //if real player win is found block that location:
                currentBoard[position] = compP;
                hasMoved = true;
                console.log(currentBoard + ` compblocking realp` + position);
                // result = winningPosition + " " + realP;
                // displayMsg(result);
                return false;
            }
            
            else {
                
                return true;
            }
            //else if not a win check if enemy player can win
        });
        
    };
    //Else pick a random location and move there
    if(hasMoved == false) {
        hasMoved = true;
        //pick random location and move there: 
        let randomOpen = openPositions[Math.floor(Math.random()*openPositions.length)];
            console.log(randomOpen);
            //place X in that location
            currentBoard[randomOpen] = compP;
            console.log(currentBoard + "compMoved" + randomOpen);
    }
        
    //if no enemy wins are found continue searching down another level
    //console.log(result);
    //go to player turn
    return compPWon;
}
    
//Real player move function:
function realPMove(index) {
    let errorM = "Must be an open position";
    //realPInput = document.getElementById("pInput").value;
    //console.log(realPInput);
    getOpenPos(currentBoard);


    //console.log(currentBoard.includes(index))
    
    //throw an error if input is not a whole number between 0 and 8:
    if(!currentBoard.includes(index)){
        console.log(errorM + index);
        throw errorM;
    }
    //player moves in input arg index location:
    currentBoard[index] = realP;
    console.log(currentBoard + ` realpmoved` + index);
    //check if player wins:
    determineWin();
    
    // if(winningBoard(realP, currentBoard) === 10) {
    //     console.log(currentBoard + ` realp wins!`)
    //     realPWon = true;
    //     displayMsg("realP wins" + realPWon);
    //     isRunning = false;
        
    // }
}  

function displayMsg(msg) {
    document.getElementById("outputP").innerHTML = msg;
}

function determineTurn(turn) {
    if(turn === "real") {
        realPTurn = true;
        compPTurn = false;
    }
    else if (turn === "comp") {
        realPTurn = false;
        compPTurn = true;
    }
}


//Create an event loop:
//Begin loop:
//While game is running loop:
//isRunning = true;
//determineTurn("real");


// while(isRunning === true) {
//     //Decide which player goes first:
//     //comp player goes first:
//     getOpenPos(currentBoard);
//     //console.log(openPositions);
    
//     //no open spots remaining:
//     if(openPositions.length == 0) {
//         displayMsg("The game ends in a tie!");
//         console.log(currentBoard + "game ends in a tie!");
//         break;
//     }
//     if(compPWon == true || realPWon == true) {
//         isRunning = false;
//         break;
        
//     }
//     //win game state:
//     else if(compPTurn == true) {
//         if(!compPWon == true || !realPWon == true) {
//             compMove();
//             determineTurn("real");
//         }
        
        
//     }
    
//     else if(realPTurn == true) {
//         if(!compPWon == true || !realPWon == true) {
//         //realPInput = document.getElementById("pInput").value;
//         //console.log(realPInput);
//         //document.getElementById("submitButton").addEventListener("click", realPMove(realPInput));
//         //need to add an event listener here and a submit button to collect the value each time
//         realPMove(0);
//         //determineTurn("comp");
//         }
        
//         console.log("waiting");    
        
//     }
     
//     else {
//         console.log("end loop");
//         break;
//     }    
// }

function determineWin() {
    let winner;
    
    getOpenPos(currentBoard);
    //console.log(openPositions);
    
    //no open spots remaining:
    if(openPositions.length == 0) {
        displayMsg("The game ends in a tie!");
        console.log(currentBoard + "game ends in a tie!");
    }
    
    if(winningBoard(realP, currentBoard) === 10) {
        console.log(currentBoard + ` realp wins!`)
        realPWon = true;
        displayMsg("realP wins" + realPWon);
        winner = realP;
    }
    if(winningBoard(compP, currentBoard) === 10) {
        console.log(currentBoard + ` compP Wins!`)
        compPWon = true;
        displayMsg("compP wins" + compPWon);
        winner = compP;
    }

return winner;   
}


//Call main game function:
//console.log(winningBoard(realP, currentBoard));
compMove();
//realPMove(1);
//console.log(displayMsg("wtfmate"));



//create score board
//create logic that chooses final store
//create function that generates possible states
    //create function that generates possible moves
    //create function that assigns scores
