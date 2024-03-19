const cells = document.querySelectorAll('.cell');
const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X'; // Start with player X
let isTwoPlayer = true; // Flag to indicate two-player mode

let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cellIndex = parseInt(event.target.dataset.cellIndex);
  if (gameOver || cells[cellIndex].textContent !== '') {
    return;
  }
  cells[cellIndex].textContent = currentPlayer;
  checkWinner();
  if (!gameOver) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players for two-player mode
  }
}

function checkWinner() {
  for (let condition of winningConditions) {
    const cell1 = cells[condition[0]].textContent;
    const cell2 = cells[condition[1]].textContent;
    const cell3 = cells[condition[2]].textContent;

    if (cell1 !== '' && cell1 === cell2 && cell2 === cell3) {
      gameOver = true;
      message.textContent = `Player ${cell1} Wins!`;
      return;
    }
  }

  // Check for a tie (all cells filled)
  let isTie = true;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === '') {
      isTie = false;
      break;
    }
  }

  if (isTie) {
    gameOver = true;
    message.textContent = `It's a Tie!`;
  }
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', () => {
  currentPlayer = 'X';
  gameOver = false;
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
});
