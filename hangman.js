const words = ["javascript", "hangman", "programming", "computer", "algorithm"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(selectedWord.length).fill('_');
let guessedLetters = [];
let remainingTries = 6;

const hangmanFigure = document.getElementById('hangman-figure');
const wordDisplay = document.getElementById('word-display');
const guessedLettersDisplay = document.getElementById('guessed-letters');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const resetButton = document.getElementById('reset');

const hangmanFigures = [
    `
      +---+
      |   |
          |
          |
          |
          |
    ========`,
    `
      +---+
      |   |
      O   |
          |
          |
          |
    ========`,
    `
      +---+
      |   |
      O   |
      |   |
          |
          |
    ========`,
    `
      +---+
      |   |
      O   |
     /|   |
          |
          |
    ========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
          |
          |
    ========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
     /    |
          |
    ========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
     / \\  |
          |
    ========`
];

// Modal Logic
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.getElementById('modal-close');

function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

function hideModal() {
    modal.style.display = 'none';
}

modalClose.addEventListener('click', hideModal);

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

function updateDisplay() {
    wordDisplay.textContent = guessedWord.join(' ');
    guessedLettersDisplay.textContent = `Guessed Letters: ${guessedLetters.join(', ')}`;
    hangmanFigure.textContent = hangmanFigures[6 - remainingTries];
}

function checkWin() {
    return guessedWord.join('') === selectedWord;
}

function checkLose() {
    return remainingTries === 0;
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill('_');
    guessedLetters = [];
    remainingTries = 6;
    updateDisplay();
}

guessButton.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        showModal('Invalid Input', 'Please enter a single letter.');
        return;
    }

    if (guessedLetters.includes(guess)) {
        showModal('Invalid Input', 'You already guessed that letter.');
        return;
    }

    guessedLetters.push(guess);

    if (selectedWord.includes(guess)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                guessedWord[i] = guess;
            }
        }
    } else {
        remainingTries--;
    }

    updateDisplay();

    if (checkWin()) {
        showModal('Congratulations!', 'You won!');
        resetGame();
    } else if (checkLose()) {
        showModal('Game Over', `The word was "${selectedWord}".`);
        resetGame();
    }
});

resetButton.addEventListener('click', resetGame);

updateDisplay();