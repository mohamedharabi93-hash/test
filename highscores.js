const bestScore = document.getElementById("bestScore");
bestScore.innerText = `Your Best Score: ${localStorage.getItem("highScore") || 0}`;

function goHome() {
  window.location.href = "index.html";
}
