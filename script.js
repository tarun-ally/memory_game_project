const gameContainer = document.getElementById("game");

const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple"
];

// Shuffle function
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    [array[counter], array[index]] = [array[index], array[counter]];
  }
  return array;
}

let shuffledColors;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let clickCount = 0;

// Create card elements
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.color = color;

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.style.background = color; // color side

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back"); // hidden back

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener("click", handleCardClick);
    gameContainer.append(card);
  }
}

// Handle card click
function handleCardClick(e) {
  if (lockBoard) return;

  const card = e.currentTarget;

  // Prevent double click on same card
  if (card === firstCard || card.classList.contains("flipped")) return;

  // Count this click
  clickCount++;
  updateClickDisplay();

  // Flip card
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  checkForMatch();
}

// Check if two cards match
function checkForMatch() {
  const isMatch = firstCard.dataset.color === secondCard.dataset.color;

  if (isMatch) {
    disableCards();
    matchedPairs++;
    if (matchedPairs === COLORS.length / 2) {
      setTimeout(() => alert(`🎉 Game Over! You matched all pairs in ${clickCount} clicks.`), 400);
    }
  } else {
    unflipCards();
  }
}

// If cards match, keep them revealed
function disableCards() {
  firstCard.classList.add("done");
  secondCard.classList.add("done");
  resetBoard();
}

// If not a match, flip them back
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

// Reset temporary variables
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Show clicks live
function updateClickDisplay() {
  let counterEl = document.getElementById("click-counter");
  if (!counterEl) {
    counterEl = document.createElement("p");
    counterEl.id = "click-counter";
    counterEl.style.fontSize = "18px";
    counterEl.style.fontWeight = "bold";
    counterEl.style.margin = "10px 0";
    document.body.insertBefore(counterEl, gameContainer);
  }
  counterEl.textContent = `Clicks: ${clickCount}`;
}

// Restart game
function restartGame() {
  gameContainer.innerHTML = ""; // clear old cards
  shuffledColors = shuffle([...COLORS]); // reshuffle
  matchedPairs = 0;
  clickCount = 0;
  updateClickDisplay();
  resetBoard();
  createDivsForColors(shuffledColors);
}

// Create restart button
function createRestartButton() {
  let restartBtn = document.getElementById("restart-btn");
  if (!restartBtn) {
    restartBtn = document.createElement("button");
    restartBtn.id = "restart-btn";
    restartBtn.textContent = "🔄 Restart Game";
    document.body.insertBefore(restartBtn, gameContainer);
    restartBtn.addEventListener("click", restartGame);
  }
}

// Start game
function initGame() {
  shuffledColors = shuffle([...COLORS]);
  createRestartButton();
  restartGame();
}

initGame();
