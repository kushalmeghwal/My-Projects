let messageContainer = document.querySelector(".message");
let msg = document.querySelector("#msg");
let currentPlayer = 'X';
let array = Array(9).fill(null);
let gameActive = true; 

const checkWinner=() =>{
    if (!gameActive) return; 

    if (
        // Check rows
        (array[0] !== null && array[0] == array[1] && array[1] == array[2]) ||
        (array[3] !== null && array[3] == array[4] && array[4] == array[5]) ||
        (array[6] !== null && array[6] == array[7] && array[7] == array[8]) ||
        // Check columns
        (array[0] !== null && array[0] == array[3] && array[3] == array[6]) ||
        (array[1] !== null && array[1] == array[4] && array[4] == array[7]) ||
        (array[2] !== null && array[2] == array[5] && array[5] == array[8]) ||
        // Check diagonals
        (array[0] !== null && array[0] == array[4] && array[4] == array[8]) ||
        (array[2] !== null && array[2] == array[4] && array[4] == array[6])
    ) {
        gameActive = false; 
        messageContainer.style.display = "flex";
        msg.innerText = `Winner is ${currentPlayer}`;
        return;
    }

    if (!array.some(e => e === null)) {  //lambda used | single condition checked for if there any null value
        gameActive = false; 
        messageContainer.style.display = "flex";
        msg.innerText = `Match Draw!!`;
        return;
    }
}

const handleClick=(el)=> {
    if (!gameActive) return; 

    const id = Number(el.id);
    if (array[id] !== null) return;

    array[id] = currentPlayer;
    el.innerText = currentPlayer;
 

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


const restartGame=()=> {
    array.fill(null);
    gameActive = true; 
    currentPlayer = 'X';
    messageContainer.style.display = "none";
    document.querySelectorAll(".col").forEach(cell => cell.innerText = "");//lamda used with single statement
}
