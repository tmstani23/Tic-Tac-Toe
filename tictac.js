
//Initialize Global Variables:
let compP;
let realP;
let currentBoard = [];
let tempBoard = [];
let score;
let openPositions = [];
let isReset;
let realPTurn;
let compPTurn;
let result;
let realPWon;
let compPWon;

//A function that determines symbols and variables for each player:
function choosePlayer(player) {
    //Set real player to function input
    if(player === "X"){
        //console.log("playerisX");
        realP = player;
        //Set comp player to O
        compP = "O";
    }
    //Set real player to function input set comp to opposite:
    if(player === "O"){
        //console.log("playerisO");
        realP = player;
        compP = "X";
    }
    //Remove the two select player buttons from the html:
    if(document.getElementById("chooseX")!= null) {
        removeButtons();
    }
    //Populate the main board array with index values:
    populateBoard(currentBoard);
    
};

//Function that tests if win condition exists for a player and board:
function winningBoard(player, board) {   
    
    //Get open index positions from the input board:
    getOpenPos(board);
    //console.log(openPositions);
    
    //If the game board is filled with moves:
    if(openPositions.length == 0) {
        //Display tie message and return 0:
        displayMsg("The game ends in a tie!");
        //console.log(board + "game ends in a tie!");
        return 0;
    }
    //If three in a row vertical first column:
    if(board[0] == player && board[3] == player && board[6] == player) {
        //Return winning score:
        score = 10;
        return score;
    }
    
    //If three in a row vertical 2nd column:
    if(board[1] == player && board[4] == player && board[7] == player) {
        score = 10;
        return score;
    }
    //If three in a row vertical 3rd column:
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
//3 in a row opposite diagonal:
    if(board[2] == player && board[4] == player && board[6] == player) {
        score = 10;
        return score;
    }   
}

//Function that gets open positions from the input game board:
function getOpenPos(board) {
    openPositions = [];
    //Loop through the input board array:
    for(i=0; i<board.length; i++){
        //if the current position isn't an X or O:
        if(board[i]!="X" && board[i]!="O") {
            //push the position index into the open positions array:
            openPositions.push(i);
        }
    }
    //console.log(openPositions);
}

//Main function for computer player movement:
function compMove() {
    let winningPosition;
    let result;
    let hasMoved = false;
    
    //get open positions
    getOpenPos(currentBoard);
    //Check for possible computer player win state:
    //Loop through every position in the open positions array:
    openPositions.every(function (position) {
        //create copy of main board
        tempBoard = Array.from(currentBoard);
        //place comp symbol at the position:
        tempBoard[position] = compP;
        //End the loop if the computer has already moved:
        if(hasMoved === true) {
            return false;
        }
        //console.log(winningBoard(compP, tempBoard));
        //Check to see if current temp gameboard includes a win for the computer:
        if(winningBoard(compP, tempBoard) === 10) {
            winningPosition = position;
            //if a comp win is found place symbol at current location and update base board:
            currentBoard[position] = compP;
            //Change background color of that location to comp player background color:
            changeBColor(compP, position);
            //Mark that the comp has moved:
            hasMoved = true;
            //console.log(currentBoard + winningPosition + ` compwins`)
            //set the result message to computer wins:
            result = `Computer Wins!`;
            //set comp win flag to true:
            compPWon = true;
            //Display result message:
            displayMsg(result);
            //End the loop:
            return false;
        }
        //Else continue looping through the open positions array:
        else {
            return true;
        }
    });
    
    //If no comp wins are found check all open spots for real player wins
    if (!compPWon) {
       
        //Loop through all temp board positions:
        for(let position=0; position<tempBoard.length; position++) {

            //Copy the base game board into a temp board variable:
            tempBoard = Array.from(currentBoard);
            //Test real player move at current loop position:
            //If current position already contains a comp symbol?
            if(tempBoard[position] === compP) {
                //pass to the next round of loop check:
                //console.log("already blocked");
                continue;
            }
            
            //if there are not already a player or comp move at the location:
            if(tempBoard[position] != compP || tempBoard[position] != realP) {
                //put a real player symbol at the location:
                tempBoard[position] = realP;
            }
            //test current position to see if real player would win:
            if(winningBoard(realP, tempBoard) === 10) {
               
                //if real player win is found block that location:
                currentBoard[position] = compP;
                //change background color of the position to comp player background color:
                changeBColor(compP, position);
                hasMoved = true;
                //console.log(currentBoard + ` compblocking realp` + position);
                break;
            }
        };
        
    };
    //Else computer pick a location and move there:
    //If comp player hasn't moved yet:
    if(hasMoved == false) {
        //Reset comp has moved flag:
        hasMoved = true;
        //If the middle of base gameboard is open move there:
        if (currentBoard[4] === 4) {
            currentBoard[4] = compP;
            changeBColor(compP, 4);
        }
        else {
        //pick random location and move there: 
        let randomOpen = openPositions[Math.floor(Math.random()*openPositions.length)];
        //place comp symbol at random location:
        currentBoard[randomOpen] = compP;
        changeBColor(compP, randomOpen);
        console.log(currentBoard + "compMoved" + randomOpen);
        }
        
    }
    //Set turn to real player:
    determineTurn("real");
    //return comp won variable value:
    return compPWon;
}

//Function that changes background color of a location on the html grid:
//based on player and index location:
function changeBColor (player, index) {
    //create id selector variable:
    let dispColor = "index" + index;
    
    //If the id doesnt exist because buttons were removed:
    if(document.getElementById(dispColor) === null) {
        //end the function:
        return;
    }
    //If real player was passed into the function:
    if(player === realP) {
        //Set real player background color of the grid location in the html:
        document.getElementById(dispColor).style.backgroundColor = "#6d1818";
    }
    //If computer player was passed into the function:
    if(player === compP) {
        //Set computer player background color of the grid location in the html:
        document.getElementById(dispColor).style.backgroundColor = "#f0f0f0";
    }
}
//Real player move function:
function realPMove(index) {
    let errorM = "Must be an open position"; 
    //console.log(realPInput);
    getOpenPos(currentBoard);
    //console.log(currentBoard.includes(index))
    //Throw an error if user clicks a button before choosing a player:
    if(realP === undefined) {
        errorM = "Must choose a player before moving!";
        displayMsg(errorM);
        return;
    }
    //throw an error if user clicks on a non-empty button:
    if(!currentBoard.includes(index)){
        console.log(errorM + index);
        displayMsg(errorM);
        return;
    }
    //If game either player has won display game over message:
    if(realPWon === true || compPWon === true) {
        let message = "Game is over. Reset game.";
        displayMsg(message);
        return;
    }
    //Display an error message if user tries to move during comp turn:
    if(compPTurn === true) {
        errorM = "Wait your turn!";
        return;
    }
    //Place real player symbol at input location:
    currentBoard[index] = realP;
    changeBColor(realP, index);
    //console.log(currentBoard + ` realpmoved` + index);
    //check if player wins:
    if(winningBoard(realP, currentBoard) === 10) {
        //console.log(currentBoard + ` realp wins!`)
        realPWon = true;
        displayMsg("You Win!");
        updateDisplay();
        return;
    }
    //Set computer turn:
    determineTurn("comp");
    //Call main computer move function
    compMove();
    return realPWon;
}  
//Function to display messages to the screen:
function displayMsg(msg) {
    document.getElementById("outputP").innerHTML = msg;
}
//Function that populates a game board with index locations:
function populateBoard(board){
    //Loop for 9 iterations:
    for(i=0; i<9; i++) {
        //Create numbers for each board location:
        board[i] = i;
    }
    //Update the display with the current game board:
    updateDisplay(currentBoard);    
}
//Function that resets the game after the reset button is clicked:
function resetGame(){
    //reset global variables and current board array:
    currentBoard = [];
    isReset = true;
    compPWon = false;
    realPWon = false;
    compP = undefined;
    realP = undefined;
    displayMsg("");
    //If the choose players buttons exist:
    if(document.getElementById("chooseX")!= null) {
        //Remove choose player buttons:
        removeButtons();
    }
    //create titleDiv:
    let titleD = document.createElement("choose-div");
    //Set the title id:
    titleD.setAttribute("id", "choose-div");
    //Append the new div to the title header above it:
    document.getElementById("title-div").appendChild(titleD);
    //add choose player paragraph and text
    let para = document.createElement("chooseP"); 
    para.className += "chooseP";                     
    var t = document.createTextNode("Choose Your Side!");
    para.setAttribute("id", "chooseP");
    para.appendChild(t);
    //Append the new paragraph to the choose div:
    document.getElementById("choose-div").appendChild(para); 
    //Create choose player buttons
    let button1 = document.createElement("chooseX");
    let button2 = document.createElement("chooseO");
    //Create button ids:
    button1.setAttribute("id", "chooseX");
    button2.setAttribute("id", "chooseO");
    //Create class, display values and on click function calls for the buttons:
    button1.innerHTML = `<input type = 'button' class='btn btn-primary chooseX' value = 'X' onClick = 'choosePlayer("X")'>`;
    button2.innerHTML = `<input type = 'button' class='btn btn-primary chooseO' value = 'O' onClick = 'choosePlayer("O")'>`;
    //Append the buttons to the choose div:
    document.getElementById("choose-div").appendChild(button1);
    document.getElementById("choose-div").appendChild(button2); 
    //Reset grid button background colors to light green:
    for(i=0; i<9; i++){
        let addColor = "index" + i;
        document.getElementById(addColor).style.backgroundColor = "#5c8f65";
    }
    //Populate the main game board:
    populateBoard(currentBoard);
    //Update display
    updateDisplay();
    //Remove the reset flag:
    isReset = false;
}
//Function that sets which player's turn it is:
function determineTurn(turn) {
    //Get the open positions from the main board
    getOpenPos(currentBoard);
    //If there are no open positions display tie game message:
    if(openPositions.length === 0) {
        displayMsg("The Game Ends in a Tie!");
    }
    if(turn === "real") {
        realPTurn = true;
        compPTurn = false;
    }
    else if(turn === "comp") {
        realPTurn = false;
        compPTurn = true;
    }
    updateDisplay(currentBoard);
}
//Function that updates the display buttons:
function updateDisplay() {
    //loop through the currentboard
    for(i=0; i<currentBoard.length; i++) {
        //Set an id selector variable:
        let dispId = "index" + i;
        //if the game was just reset:
        if(isReset === true) {
            //set the display html text for each game button to empty:
            document.getElementById(dispId).innerHTML = "";    
        }
        //if the current spot is an X or O
        if(currentBoard[i]===realP || currentBoard[i] === compP) {
            //Display the current value to the html at correct button div:
            document.getElementById(dispId).innerHTML = currentBoard[i];
        }
        
    }
}
//Function that removes choose player buttons from the html:
function removeButtons() {
    //Remove choose div:
    document.getElementById("choose-div").parentNode
    .removeChild(document.getElementById('choose-div'));
    // //Remove chooseX button:
    // document.getElementById('chooseX').parentNode
    // .removeChild(document.getElementById('chooseX'));
    // document.getElementById('chooseO').parentNode
    // //Remove chooseO button:
    // .removeChild(document.getElementById('chooseO'));
    // //Remove the character select paragraph from the html:
    // document.getElementById('chooseP').parentNode
    // .removeChild(document.getElementById('chooseP'));
}




