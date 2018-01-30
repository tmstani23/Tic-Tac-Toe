
//create game board
//X's turn
//X O O
//   
//X O X
//create a tic tac toe game where the computer never loses:
let compP = "X";
let realP = "O";
let currentBoard = [0, 1, 2, 
                    "X", "O", 5,    
                    "X", "O", "X"];
let tempBoard = [];
let score;
let openPositions = [];
//define rules of the game by indices:
//create winning board function:

        //if index 0 and 3 and 6 = compP:

// function displayMsg(msg) {
//     document.getElementById("outputP").innerHTML = msg;
// }        
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
    console.log(result);
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
            result = winningPosition + " " + compP;
            return result;
        }
    });
    
    //else if not a win check if enemy player can win
    //getOpenPos(currentBoard);
    //for each position:
    //if there is no result from the first check:
    if (result == undefined) {
        openPositions.forEach(function (position) {
            //create copy of main board
            ;
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
                result = winningPosition + " " + realP;
                return result;
            }
            //else if not a win check if enemy player can win
        });
    };

    //console.log(result);
    return result;
    
}
    
    
    //if a win is found pick spot and update board
    //if no wins are found check all open spots for enemyplayer wins
    //if win is found block that location
    //if no enemy wins are found continue searching down another level



//Call main game function:
//console.log(winningBoard(realP, currentBoard));
console.log(compMove());

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
