const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal (top-left to bottom-right)
    [2, 4, 6]  // Diagonal (top-right to bottom-left)
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || !isGameActive()) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        drawWinningLine();
        setTimeout(() => {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
        }, 100);
    } else if (isDraw()) {
        setTimeout(() => {
            alert('It\'s a draw!');
            resetGame();
        }, 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function isDraw() {
    return gameState.every(cell => cell !== '');
}

function isGameActive() {
    return !checkWin() && !isDraw();
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    clearWinningLine();
}

function drawWinningLine() {
    const winningCondition = winningConditions.find(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });

    if (!winningCondition) return;

    console.log("Winning Condition:", winningCondition); // Debugging
    const [a, b, c] = winningCondition;
    const cellA = cells[a];
    const cellB = cells[b];
    const cellC = cells[c];

    // Rest of the code...

    const rectA = cellA.getBoundingClientRect();
    const rectB = cellB.getBoundingClientRect();
    const rectC = cellC.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    const line = document.createElement('div');
    line.classList.add('winning-line');

    if (a === 0 && c === 2) { // Top row
        console.log("Drawing horizontal line for top row");
        line.style.width = `${rectC.right - rectA.left}px`;
        line.style.top = `${rectA.top - boardRect.top + rectA.height / 2}px`;
        line.style.left = `${rectA.left - boardRect.left}px`;
    } else if (a === 3 && c === 5) { // Middle row
        console.log("Drawing horizontal line for middle row");
        line.style.width = `${rectC.right - rectA.left}px`;
        line.style.top = `${rectA.top - boardRect.top + rectA.height / 2}px`;
        line.style.left = `${rectA.left - boardRect.left}px`;
    } else if (a === 6 && c === 8) { // Bottom row
        console.log("Drawing horizontal line for bottom row");
        line.style.width = `${rectC.right - rectA.left}px`;
        line.style.top = `${rectA.top - boardRect.top + rectA.height / 2}px`;
        line.style.left = `${rectA.left - boardRect.left}px`;
    } else if (a === 0 && c === 6) { // Left column
        console.log("Drawing vertical line for left column");
        line.style.height = `${rectC.bottom - rectA.top}px`;
        line.style.top = `${rectA.top - boardRect.top}px`;
        line.style.left = `${rectA.left - boardRect.left + rectA.width / 2}px`;
    } else if (a === 1 && c === 7) { // Middle column
        console.log("Drawing vertical line for middle column");
        line.style.height = `${rectC.bottom - rectA.top}px`;
        line.style.top = `${rectA.top - boardRect.top}px`;
        line.style.left = `${rectA.left - boardRect.left + rectA.width / 2}px`;
    } else if (a === 2 && c === 8) { // Right column
        console.log("Drawing vertical line for right column");
        line.style.height = `${rectC.bottom - rectA.top}px`;
        line.style.top = `${rectA.top - boardRect.top}px`;
        line.style.left = `${rectA.left - boardRect.left + rectA.width / 2}px`;
    } else if (a === 0 && c === 8) { // Diagonal (top-left to bottom-right)
        console.log("Drawing diagonal line (top-left to bottom-right)");
        const startX = rectA.left - boardRect.left + rectA.width / 2;
        const startY = rectA.top - boardRect.top + rectA.height / 2;
        const endX = rectC.left - boardRect.left + rectC.width / 2;
        const endY = rectC.top - boardRect.top + rectC.height / 2;
    
        const length = Math.hypot(endX - startX, endY - startY);
        const angle = Math.atan2(endY - startY, endX - startX);
    
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}rad)`;
        line.style.top = `${startY}px`;
        line.style.left = `${startX}px`;
    } else if (a === 2 && c === 6) { // Diagonal (top-right to bottom-left)
        console.log("Drawing diagonal line (top-right to bottom-left)");
        const startX = rectA.left - boardRect.left + rectA.width / 2;
        const startY = rectA.top - boardRect.top + rectA.height / 2;
        const endX = rectC.left - boardRect.left + rectC.width / 2;
        const endY = rectC.top - boardRect.top + rectC.height / 2;
    
        const length = Math.hypot(endX - startX, endY - startY);
        const angle = Math.atan2(endY - startY, endX - startX);
    
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}rad)`;
        line.style.top = `${startY}px`;
        line.style.left = `${startX}px`;
    }
    board.appendChild(line);
}

function clearWinningLine() {
    const line = document.querySelector('.winning-line');
    if (line) {
        line.remove();
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);