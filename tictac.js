
//create game board
//X's turn
//X O O
//   
//X O X
//create a tic tac toe game where the computer never loses:
let compP = "X";
let realP = "O";
let currentBoard = [ 0,   1,  "X", 
                     3,  "O",  5,    
                     6,   "O", "X"];
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
    //console.log(result);
    //board positions =   [0, 1, 2, 
    //                     3, 4, 5,    
    //                     6, 7, 8];
    // let currentBoard = ["O",  1,   2, 
    //                     "X", "X",  5,    
    //                     "X", "O", "X"];
    
   //get open positions
   //check each position to see if win
    getOpenPos(currentBoard);
    //for each position:
    openPositions.forEach(function (position) {
        //create copy of main board
        tempBoard = Array.from(currentBoard);
        //console.log(tempBoard);
        //console.log(position); 
        //place an x at the position
        tempBoard[position] = "X";
        //console.log(tempBoard);
        //test if win condition
        //console.log(winningBoard(compP, tempBoard));
        if(winningBoard(compP, tempBoard) === 10) {
            winningPosition = position;
            //if a comp win is found pick spot and update base board
            currentBoard[winningPosition] = compP;
            console.log(currentBoard + ` compwins`)
            result = winningPosition + " " + compP;
            compPWon = true;
            displayMsg(result);
            isRunning = false;
            return result;
        }
    });
    
    //if no comp wins are found check all open spots for real player wins
    //for each position:
    //if there is no result from the first check:
        if (result == undefined) {
            openPositions.forEach(function (position) {
                //create copy of main board
                
                tempBoard = Array.from(currentBoard);
                //console.log(tempBoard);
                //console.log(position); 
                //place an x at the position
                tempBoard[position] = "O";

                //console.log(tempBoard);
                //test if win condition
                //console.log(winningBoard(realP, tempBoard));
                if(winningBoard(realP, tempBoard) === 10) {
                    winningPosition = position;
                    //if real player win is found block that location:
                    currentBoard[position] = compP;
                    console.log(currentBoard + ` compblocking realp`)
                    // result = winningPosition + " " + realP;
                    // displayMsg(result);
                    return result;
                }
                //else if not a win check if enemy player can win
            });
        };
    
    
    
    //if no enemy wins are found continue searching down another level
    //console.log(result);
    //go to player turn
    return result;
}
    
//Real player move function:
function realPMove(index) {
    let errorM = "Must be an open position";
    getOpenPos(currentBoard);
    //console.log(currentBoard.includes(index))
    
    //throw an error if input is not a whole number between 0 and 8:
    if(!currentBoard.includes(index)){
        console.log(errorM);
        throw errorM;
    }
    //player moves in input arg index location:
    currentBoard[index] = realP;
    //if player wins:
    if(winningBoard(realP, currentBoard) === 10) {
        console.log(currentBoard + ` realp wins!`)
        realPWon = true;
        displayMsg("realP wins" + realPWon);
        isRunning = false;
        
    }
    else {
        console.log(currentBoard);
        
    }
    
    
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
isRunning = false;
determineTurn("real");
while(isRunning === true) {
    //Decide which player goes first:
    //comp player goes first:
    if(compPWon == true || realPWon == true) {
        isRunning = false;
        
    }
    //win game state:
    if(compPTurn == true) {
        compMove();
        determineTurn("real");
    }
    if(realPTurn == true) {
        
        realPInput = document.getElementById("pInput").value;
        //console.log(realPInput);
        //document.getElementById("submitButton").addEventListener("click", realPMove(realPInput));
        //need to add an event listener here and a submit button to collect the value each time
        realPMove(0);
        determineTurn("comp");
        
    } 
    
    
    
    //no open spots remaining:
    if(openPositions.length == 0) {
        displayMsg("The game ends in a tie!");
        console.log(currentBoard);
    }
   
    
    
    //alternate turns:
   
    
    // else {
    //     let errorM = "neither player won";
    //     console.log(errorM);
    //     throw error;
    // }
    //displayMsg(realPTurn + " " + compPTurn);
//end event when a player wins or tie:
}



//Call main game function:
//console.log(winningBoard(realP, currentBoard));
compMove();
//console.log(realPMove(1));
//console.log(displayMsg("wtfmate"));

//Function to display messages to the screen:

//window.onload = displayMsg;   

//Define win conditions
//game ends and display if winner:
// if(winningBoard(compP, currentBoard) && score == 10) {
//     //comp wins
//     console.log("comp wins!")
//     //displayMsg("comp wins!");
// }
    
// //if player score = -10
// if(winningBoard(player, currentBoard) && score == 10) {
//    //player wins
//     console.log("player wins!")
//     //displayMsg("player wins!");
// }
// else if(score != 10) {
//     console.log("neither wins");
// }

// console.log(score + ` score`);

//create score board
//create logic that chooses final store
//create function that generates possible states
    //create function that generates possible moves
    //create function that assigns scores
