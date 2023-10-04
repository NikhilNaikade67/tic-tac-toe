const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Create cells dynamically
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        
        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            status.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => gameBoard[index] === currentPlayer)
    );
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = 'Player X\'s turn';

    // Reset cell text content
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}
