
//create game board
//X's turn
//X O O
//   
//X O X
//create a tic tac toe game where the computer never loses:
let compP;
let realP;
let currentBoard = [];
let tempBoard = [];
let score;
let openPositions = [];
let isReset;
let realPTurn;
let realPInput;
let compPTurn;
let result;
let realPWon;
let compPWon;
//define rules of the game by indices:
//create winning board function:

        //if index 0 and 3 and 6 = compP:

function choosePlayer(player) {
    if(player === "X"){
        console.log("playerisX");
        realP = player;
        compP = "O";
    }
    if(player === "O"){
        console.log("playerisO");
        realP = player;
        compP = "X";
    }
    //Remove the two select player buttons from the html:
    if(document.getElementById("chooseX")!= null) {
        removeButtons();
    }

    populateBoard(currentBoard);
    
};
     
function winningBoard(player, board) {   
        //3 in a row vertical
        //col 1
    openPositions = [];
    getOpenPos(board);
    //console.log(openPositions);
    
    //no open spots remaining:
    if(openPositions.length == 0) {
        displayMsg("The game ends in a tie!");
        console.log(board + "game ends in a tie!");
        return 0;
    }
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
    for(i=0; i<9; i++){
        if (board[i]!="X" && board[i]!="O") {
            openPositions.push(i);
        }
    }
    //console.log(openPositions);
}

//create compMove function:
function compMove() {
    let winningPosition;
    let result;
    let hasMoved = false;
    
    openPositions = [];
    //get open positions
    getOpenPos(currentBoard);
    //check each open position:
    openPositions.every(function (position) {
        //create copy of main board
        tempBoard = Array.from(currentBoard);
        //console.log(tempBoard);
        //console.log(position); 
        //place an x at the position
        tempBoard[position] = compP;
        //console.log(tempBoard);
        // //test if win condition
        // if(compPWon === true){
        //     console.log("compwontrue");
        //     return false;
        // }
        //console.log(winningBoard(compP, tempBoard));
        if(winningBoard(compP, tempBoard) === 10) {
            winningPosition = position;
            //if a comp win is found pick spot and update base board
            currentBoard[position] = compP;
            changeBColor(compP, position);
            hasMoved = true;
            console.log(currentBoard + winningPosition + ` compwins`)
            result = `Computer Wins!`;
            compPWon = true;
            //go to determine winner function:
            displayMsg(result);
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
            console.log(position);
            console.log(openPositions); 
            //Test real player move at position:
            tempBoard[position] = realP;
            
            console.log(tempBoard + "temp");
            //test if real player would win:
            console.log(winningBoard(realP, tempBoard));
            if(winningBoard(realP, tempBoard) === 10) {
                //winningPosition = position;
                //if real player win is found block that location:
                currentBoard[position] = compP;
                changeBColor(compP, position);
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
            //console.log(randomOpen);
            //place X in that location
            currentBoard[randomOpen] = compP;
            changeBColor(compP, randomOpen);
            console.log(currentBoard + "compMoved" + randomOpen);
    }
        
    //if no enemy wins are found continue searching down another level
    //console.log(result);
    //go to player turn
    determineTurn("real");
    return compPWon;
}

// function testButton() {
//     realPInput = document.getElementById("pInput").value;
//     realPInput = parseInt(realPInput);
    
//     realPMove(realPInput);
// }

function changeBColor (player, index) {
    let dispColor = "index" + index;
    
    //If real player
    if(document.getElementById(dispColor) === null) {
        return;
    }
    if(player === realP) {
        
        document.getElementById(dispColor).style.backgroundColor = "#6d1818";
    }
    if(player === compP) {
        
        document.getElementById(dispColor).style.backgroundColor = "#f0f0f0";
    }
    // 
    
}
//Real player move function:
function realPMove(index) {
    
    
    let errorM = "Must be an open position";
    //realPInput = document.getElementById("pInput").value;
    //index = realPInput; 
    //console.log(realPInput);
    getOpenPos(currentBoard);
    
    //console.log(currentBoard);
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
    if(realPWon === true || compPWon === true) {
        let message = "Game is over. Reset game.";
        displayMsg(message);
        return;
    }
    if(compPTurn === true) {
        errorM = "Wait your turn!";
        return;
    }
    //player moves in input arg index location:
    currentBoard[index] = realP;
    changeBColor(realP, index);
    console.log(currentBoard + ` realpmoved` + index);
    //check if player wins:
    if(winningBoard(realP, currentBoard) === 10) {
        console.log(currentBoard + ` realp wins!`)
        realPWon = true;
        displayMsg("You Win!");
        isRunning = false;
        
    }
    determineTurn("comp");
    setTimeout(compMove, 2000);
    return realPWon;
}  

function displayMsg(msg) {
    document.getElementById("outputP").innerHTML = msg;
}
function populateBoard(board){
    for(i=0; i<9; i++) {
        currentBoard[i] = i;
    }
    updateDisplay(currentBoard);
    changeBColor();
}
function resetGame(){
    //reset currentboard state
    currentBoard = [];
    isReset = true;
    compPWon = false;
    realPWon = false;
    compP = undefined;
    realP = undefined;
    displayMsg("");
    if(document.getElementById("chooseX")!= null) {
        removeButtons();
    }
    
    //add choose player paragraph and text
    let para = document.createElement("chooseP"); 
    para.className += "chooseP";                     
    
    var t = document.createTextNode("Choose Your Side!");
    para.setAttribute("id", "chooseP");
    para.appendChild(t);
    document.getElementById("choose-div").appendChild(para); 
    //Add choose player buttons
    let button1 = document.createElement("chooseX");
    let button2 = document.createElement("chooseO");
    //add button ids:
    button1.setAttribute("id", "chooseX");
    button2.setAttribute("id", "chooseO");
    
    
    

    button1.innerHTML = `<input type = 'button' class='btn btn-primary chooseX' value = 'X' onClick = 'choosePlayer("X")'>`;
    button2.innerHTML = `<input type = 'button' class='btn btn-primary chooseO' value = 'O' onClick = 'choosePlayer("O")'>`;

    document.getElementById("choose-div").appendChild(button1);
    document.getElementById("choose-div").appendChild(button2); 
    
    //add on click functionality:
    // button1.onclick = choosePlayer("X");
    // button2.onclick = choosePlayer("O");

    //reset background colors to blue:
    for(i=0; i<9; i++){
        let addColor = "index" + i;
        document.getElementById(addColor).style.backgroundColor = "#5c8f65";
    }
    //populate board:
    populateBoard(currentBoard);
    //update display
    updateDisplay();
    isReset = false;
}

function determineTurn(turn) {
    openPositions = [];
    getOpenPos(currentBoard);
    //console.log(openPositions.length);
    if(openPositions.length === 0) {
        //console.log("no open positions");
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
function updateDisplay(board) {
    //let dispId = "index" + 1;
    //document.getElementById(dispId).innerHTML = "X";
    //loop through the currentboard
    for(i=0; i<currentBoard.length; i++) {
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
function removeButtons() {
    //Remove the two select player buttons from the html:
    document.getElementById('chooseX').parentNode
    .removeChild(document.getElementById('chooseX'));
    document.getElementById('chooseO').parentNode
    .removeChild(document.getElementById('chooseO'));
    //Remove the character select paragraph from the html:
    document.getElementById('chooseP').parentNode
    .removeChild(document.getElementById('chooseP'));
}
//Call main game function:
//console.log(winningBoard(realP, currentBoard));
//compMove();
//updateDisplay();
//realPMove(2);
//console.log(displayMsg("wtfmate"));



//create score board
//create logic that chooses final store
//create function that generates possible states
    //create function that generates possible moves
    //create function that assigns scores
