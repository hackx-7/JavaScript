clutterOfBubbles = "";
var score = 0;
hitRndm = 0;
trackGameState = false;
timerVal = 60;
var timerInterval;

function increaseScore() {
  score += 10;
  document.querySelector("#Score").textContent = score;
}

function createBubbles() {
  clutterOfBubbles = ""; // Clearing existing bubbles
  for (i = 1; i <= 35; i++) {
    randInt = Math.floor(Math.random() * 10);
    clutterOfBubbles += `<div class="bubbles">${randInt}</div>`;
  }
  document.querySelector(".bubblesWindow").innerHTML = clutterOfBubbles;
}

function genNewHit() {
  hitRndm = Math.floor(Math.random() * 10);
  document.querySelector("#Hit").textContent = hitRndm;
}

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval); // Clears existing Timer Interval
  }
  timerVal = 60; // Reset Timer Value
  document.querySelector("#Timer").textContent = timerVal;

  timerInterval = setInterval(function () {
    if (timerVal > 0) {
      timerVal--;
      document.querySelector("#Timer").textContent = timerVal;
    } else {
      clearInterval(timerInterval);
      document.querySelector("#BW").innerHTML = `<h1>GAME OVER!</h1>`;
      trackGameState = false;
    }
  }, 1000);
}

// EventBubbling
document.querySelector("#BW").addEventListener("click", function (details) {
  if (!trackGameState) return; // Ignore clicks if the game isn't running
  var clickedNum = Number(details.target.textContent);
  if (clickedNum === hitRndm) {
    increaseScore();
    createBubbles();
    genNewHit();
  }
});

function gameStart() {
  if (trackGameState) return; // Exits the function if game is already running.

  trackGameState = true;
  score = 0;
  document.querySelector("#Score").textContent = score;
  createBubbles();
  genNewHit();
  startTimer();
}

document.querySelector(".bubblesWindow").innerHTML=`<p>Instructions: Hit the bubble containing the same number that
pops up on the hit counter under 60 seconds.</p>`
document.querySelector(".Button").addEventListener("click", function () {
  gameStart();
});
