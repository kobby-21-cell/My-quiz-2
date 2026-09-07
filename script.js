// ---------- QUIZ DATA ----------
const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
    { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: 1 },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
    { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 },
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
    { question: "In which year did World War II end?", options: ["1943", "1945", "1947", "1950"], answer: 1 }
];

let currentQuestion = 0;
let score = 0;

// ---------- ELEMENTS ----------
const loginScreen = document.getElementById('login-screen');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const loginBtn = loginForm.querySelector('.main-btn');
const passwordGroup = passwordInput.closest('.input-group');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const logoutBtn = document.getElementById('logout-btn');
const logoutBtn2 = document.getElementById('logout-btn-2');

const questionNumberEl = document.getElementById('question-number');
const scoreDisplayEl = document.getElementById('score-display');
const progressFillEl = document.getElementById('progress-fill');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');

const resultTextEl = document.getElementById('result-text');
const finalScoreEl = document.getElementById('final-score');
const resultEmojiEl = document.getElementById('result-emoji');

function showScreen(screen) {
    [loginScreen, startScreen, quizScreen, resultScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// ---------- LOGIN ----------
togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    loginBtn.classList.add('loading');

    setTimeout(() => {
        loginBtn.classList.remove('loading');

        if (email === "user@example.com" && password === "123456") {
            showScreen(startScreen);
        } else {
            alert("Incorrect email or password. (Try: user@example.com / 123456)");
            passwordGroup.classList.add('shake');
            setTimeout(() => passwordGroup.classList.remove('shake'), 400);
        }
    }, 400);
});

function logout() {
    emailInput.value = '';
    passwordInput.value = '';
    showScreen(loginScreen);
}

logoutBtn.addEventListener('click', logout);
logoutBtn2.addEventListener('click', logout);

// ---------- QUIZ ----------
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showScreen(quizScreen);
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];

    questionNumberEl.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    scoreDisplayEl.textContent = `Score: ${score}`;
    progressFillEl.style.width = `${(currentQuestion / questions.length) * 100}%`;

    questionTextEl.textContent = q.question;
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    nextBtn.style.display = 'none';

    optionsContainerEl.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(index, btn));
        optionsContainerEl.appendChild(btn);
    });
}

function selectAnswer(selectedIndex, selectedBtn) {
    const q = questions[currentQuestion];
    const allBtns = optionsContainerEl.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.answer) {
        selectedBtn.classList.add('correct');
        feedbackEl.textContent = "Correct! 🎉";
        feedbackEl.className = 'feedback correct-text';
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        allBtns[q.answer].classList.add('correct');
        feedbackEl.textContent = "Wrong ❌";
        feedbackEl.className = 'feedback wrong-text';
    }

    scoreDisplayEl.textContent = `Score: ${score}`;
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    progressFillEl.style.width = '100%';
    showScreen(resultScreen);

    const percentage = Math.round((score / questions.length) * 100);
    resultTextEl.textContent = `You scored ${score} out of ${questions.length}`;
    finalScoreEl.textContent = `${percentage}%`;

    if (percentage >= 80) {
        resultEmojiEl.textContent = '🏆';
    } else if (percentage >= 50) {
        resultEmojiEl.textContent = '👍';
    } else {
        resultEmojiEl.textContent = '📚';
    }
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', startQuiz);
