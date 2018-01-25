console.log("helloworld");
//create game board
//X's turn
//X O O
//   
//X O X
//create a tic tac toe game where the computer never loses:
let compP = "X";
let player = "O";
let currentBoard = ["X", "O", "O", 
                    "X",   4,    5,    
                    "X", "O", "X"];
let score;
//define rules of the game by indices:
//3 in a row horiz
    //col 1
        //if index 0 and 3 and 6 = compP:
        if(currentBoard[0] == compP && currentBoard[3] == compP && currentBoard[6] == compP) {
            //comp score = +10
            score = 10;
            //return score;
        }
            
        //if index 0 and 3 and 6 = player:
        if(currentBoard[0] == player && currentBoard[3] == player && currentBoard[6] == player) {
            //player score = -10
            score = -10;
            //return score;
        }    
        
    //col 2
        //if index 1 and 4 and 7 = compP:
            //comp score = +10
        //if index 1 and 4 and 7 = player:
            //player score = -10
    //col 3
        //if index 2 and 5 and 8 = compP:
            //comp score = +10
        //if index 2 and 5 and 8 = player:
            //player score = -10
//3 in a row vert
    //row 1
        //if index 0 and 1 and 2 = compP:
            //comp score = +10
        //if index 0 and 1 and 2 = player:
            //player score = -10
    //row 2
        //if index 3 and 4 and 5 = compP:
            //comp score = +10
        //if index 3 and 4 and 5 = player:
            //player score = -10
    //row 3
        //if index 6 and 7 and 8 = compP:
            //comp score = +10
        //if index 6 and 7 and 8 = player]:
            //player score = -10
//3 in a row diag
    //if index 0 and 4 and 8 = compP
        //comp score = +10
    //if index 0 and 4 and 8 = player
        //player score = -10
    //if index 2 and 4 and 6 = compP
        //comp score = +10
    //if index 2 and 4 and 6 = player
        //player score = -10

//Define win conditions
//if score = 10;
if(score == 10) {
    //comp wins
    console.log("comp wins!");
}
    
//if player score = -10
if(score == -10) {
   //player wins
    console.log("player wins!");
}
    
//game ends and display if winner:

// //Loop through the board and get each value:
// for(i=0; i<currentBoard.length; i++) {
//     console.log(currentBoard[i]);
// }
//create score board
//create logic that chooses final store
//create function that generates possible states
    //create function that generates possible moves
    //create function that assigns scores
