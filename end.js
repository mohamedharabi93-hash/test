const finalScore = document.getElementById("finalScore");
const highScoreMessage = document.getElementById("highScoreMessage");
const playedCategory = document.getElementById("playedCategory");

let mostRecentScore = 0;
let highScore = 0;

try {
  mostRecentScore = parseInt(localStorage.getItem("mostRecentScore")) || 0;
  highScore = parseInt(localStorage.getItem("highScore")) || 0;
} catch (e) {
  console.warn("localStorage not available:", e);
}

finalScore.innerText = `Your Score: ${mostRecentScore}`;

if (mostRecentScore > highScore) {
  highScore = mostRecentScore;
  try { localStorage.setItem("highScore", String(highScore)); } catch (e) {}
  highScoreMessage.innerText = "🎉 New High Score!";
} else {
  highScoreMessage.innerText = `Your best score remains: ${highScore}`;
}

function playAgain() {
  window.location.href = "game.html";
}
function goHome() {
  window.location.href = "index.html";
}
function showHighScore() {
  alert(`🏆 Your Best Score Ever: ${highScore}`);
}
