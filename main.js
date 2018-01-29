
//create game board
//X's turn
//X O O
//   
//X O X
//create a tic tac toe game where the computer never loses:
let compP = "X";
let player = "O";
let currentBoard = ["O", 1, 2, 
                    "X", "X", 5,    
                    "X", "O", "X"];
let tempBoard = [];
let score;
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



//create compMove function:
function compMove() {
    //loop through the game board
    for(i=0; i<currentBoard.length; i++){
        //find first open spot:
        if (currentBoard[i]!="X" && currentBoard[i]!="O") {
            console.log(i);
            //check if each open spot results in win:
            //map currentboard to temp board:
            tempBoard = currentBoard;
            console.log(tempBoard);
            //input player mark in open spot:
            tempBoard[i] = "X";
            //run test win function //Check problem here -----<<<<<
            if (winningBoard(compP,tempBoard) == 10); {
                return console.log(tempBoard);
            }
            //reset tempBoard to empty after each check;
            tempBoard = [];
            //if win update main board with comp mark and end loop

        }
        
    }
}
    //if so pick spot and update board
    //if not continue checking open spots for a win
    //if a win is found pick spot and update board
    //if no wins are found check all open spots for enemyplayer wins
    //if win is found block that location
    //if no enemy wins are found continue searching down another level



//Call main game function:
//winningBoard(compP, currentBoard);
compMove();

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
