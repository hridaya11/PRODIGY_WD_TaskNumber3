const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.querySelector('.status');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X';
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const cell = e.target;
    if (cell.textContent || !gameActive) return;

    cell.textContent = currentPlayer;
    if (checkWin()) {
        statusDisplay.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if ([...cells].every(cell => cell.textContent)) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};

const checkWin = () => {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
};

const resetGame = () => {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    gameActive = true;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Initialize the game status
statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
