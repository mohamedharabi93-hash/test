document.addEventListener("DOMContentLoaded", function() {
  const question = document.getElementById("question");
  const choices = Array.from(document.getElementsByClassName("choice-text"));
  const scoreText = document.getElementById("scoreText");
  const progressText = document.getElementById("progressText");
  const categoryName = document.getElementById("categoryName");
  const startBtn = document.getElementById("start-btn");
  const startContainer = document.getElementById("start-container");
  const quizContainer = document.getElementById("quiz-container");

  let currentQuestion = {};
  let acceptingAnswers = false;
  let score = 0;
  let questionCounter = 0;
  let availableQuestions = [];

  const CORRECT_BONUS = 10;

  // Questions by category
  let questions = {
    general: [
      { question: "Capital of Tunisia?", choice1: "Tunis", choice2: "Sfax", choice3: "Gabes", choice4: "Sousse", answer: 1 },
      { question: "Smallest country?", choice1: "Malta", choice2: "Monaco", choice3: "Vatican City", choice4: "Luxembourg", answer: 3 }
    ],
    science: [
      { question: "H2O is?", choice1: "Oxygen", choice2: "Water", choice3: "Hydrogen", choice4: "Helium", answer: 2 },
      { question: "Red Planet?", choice1: "Venus", choice2: "Mars", choice3: "Jupiter", choice4: "Mercury", answer: 2 }
    ],
    history: [
      { question: "WWII ended in?", choice1: "1940", choice2: "1945", choice3: "1950", choice4: "1939", answer: 2 },
      { question: "First US president?", choice1: "Thomas Jefferson", choice2: "Abraham Lincoln", choice3: "George Washington", choice4: "John Adams", answer: 3 }
    ],
    sports: [
      { question: "2018 FIFA World Cup winner?", choice1: "Brazil", choice2: "France", choice3: "Germany", choice4: "Argentina", answer: 2 },
      { question: "Players on basketball court?", choice1: "5", choice2: "6", choice3: "7", choice4: "11", answer: 1 }
    ]
  };

  // Get category from localStorage or fallback
  let selectedCategory = null;
  try {
    selectedCategory = localStorage.getItem("selectedCategory");
  } catch (e) {
    console.warn("localStorage error:", e);
  }
  if (!selectedCategory || !questions[selectedCategory]) {
    console.warn("⚠️ Invalid or missing category in localStorage. Defaulting to 'general'.");
    selectedCategory = "general";
  }

  categoryName.innerText = "Category: " + selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
  let MAX_QUESTIONS = questions[selectedCategory].length;

  // Start button
  startBtn.addEventListener("click", startGame);

  function startGame() {
    console.log("✅ Starting quiz in category:", selectedCategory);

    startContainer.style.display = "none";
    quizContainer.style.display = "block";

    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions[selectedCategory]];
    scoreText.innerText = "Score: 0";
    progressText.innerText = `Question: 0/${MAX_QUESTIONS}`;
    getNewQuestion();
  }

  function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      try {
        localStorage.setItem('mostRecentScore', String(score));
      } catch (e) {
        console.warn("Could not save mostRecentScore:", e);
      }
      window.location.href = "end.html";
      return;
    }

    questionCounter++;
    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  }

  function incrementScore(num) {
    score += num;
    scoreText.innerText = "Score: " + score;
  }

  choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;

      const selectedChoice = e.target;
      const selectedAnswer = parseInt(selectedChoice.dataset["number"]);
      const isCorrect = selectedAnswer === currentQuestion.answer;
      const classToApply = isCorrect ? "correct" : "incorrect";

      selectedChoice.parentElement.classList.add(classToApply);
      if (isCorrect) incrementScore(CORRECT_BONUS);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });
});
