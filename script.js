const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => handleClick(cell));
});

function handleClick(cell) {
    const index = cell.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Add color classes
    cell.classList.add(currentPlayer);

    // Play pop animation
    cell.classList.add("clicked");

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a Draw! 😃";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winningPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
    board.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O", "clicked");
    });
    
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
}
