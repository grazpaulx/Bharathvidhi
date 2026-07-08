const questions = [
    {
        question: "Which part of the Indian Constitution deals with Fundamental Rights?",
        options: ["Part I", "Part III", "Part IV", "Part V"],
        answer: "Part III"
    },
    {
        question: "Who is known as the chief architect of the Indian Constitution?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "B. R. Ambedkar", "Sardar Patel"],
        answer: "B. R. Ambedkar"
    },
    {
        question: "Which article of the Constitution abolishes untouchability?",
        options: ["Article 14", "Article 17", "Article 21", "Article 32"],
        answer: "Article 17"
    },
    {
        question: "The President of India is elected by?",
        options: [
            "Direct election by citizens",
            "Elected Members of Lok Sabha & Rajya Sabha",
            "Elected Members of Parliament & State Legislatures",
            "Only Rajya Sabha Members"
        ],
        answer: "Elected Members of Parliament & State Legislatures"
    },
    {
        question: "Which amendment is known as the ‘Mini Constitution’?",
        options: ["42nd Amendment", "44th Amendment", "73rd Amendment", "101st Amendment"],
        answer: "42nd Amendment"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreValue = document.getElementById("score-value");

// Load question function
function loadQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
        optionsElement.appendChild(button);
    });
}

// Reset options
function resetState() {
    nextButton.style.display = "none";
    optionsElement.innerHTML = "";
}

// Answer selection
function selectAnswer(button, correctAnswer) {
    const isCorrect = button.textContent === correctAnswer;
    if (isCorrect) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
    }

    Array.from(optionsElement.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
    scoreValue.textContent = score;
}

// Next question function
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

// Show final score
function showFinalScore() {
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = `<p>Your final score is ${score} out of ${questions.length}.</p>`;
    nextButton.textContent = "Restart Quiz";
    nextButton.onclick = restartQuiz;
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreValue.textContent = score;
    nextButton.textContent = "Next";
    nextButton.onclick = nextQuestion;
    loadQuestion();
}

// Load first question when the page loads
loadQuestion();
