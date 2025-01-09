const quizzes = [];
let currentQuiz = null;

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function addQuestion() {
    const container = document.getElementById('questions-container');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
        <label>Question:</label>
        <input type="text" class="question-text" required>
        <label>Options:</label>
        <input type="text" class="option" placeholder="Option 1" required>
        <input type="text" class="option" placeholder="Option 2" required>
        <input type="text" class="option" placeholder="Option 3" required>
        <input type="text" class="option" placeholder="Option 4" required>
        <label>Correct Answer (1-4):</label>
        <input type="number" class="correct-answer" min="1" max="4" required>
    `;
    container.appendChild(questionDiv);
}
document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('quiz-title').value;
    const questions = [...document.querySelectorAll('.question')].map(q => ({
        text: q.querySelector('.question-text').value,
        options: [...q.querySelectorAll('.option')].map(o => o.value),
        correct: parseInt(q.querySelector('.correct-answer').value, 10),
    }));
    quizzes.push({
        title,
        questions
    });
    alert('Quiz saved!');
    showSection('list');
    displayQuizList();
});

function displayQuizList() {
    const list = document.getElementById('quiz-list');
    list.innerHTML = quizzes.map((quiz, index) => `
        <li>
            ${quiz.title}
            <button onclick="startQuiz(${index})">Take Quiz</button>
        </li>
    `).join('');
}

function startQuiz(index) {
    currentQuiz = quizzes[index];
    const quizTitle = document.getElementById('quiz-title-display');
    const quizQuestions = document.getElementById('quiz-questions');
    quizTitle.textContent = currentQuiz.title;
    quizQuestions.innerHTML = currentQuiz.questions.map((q, i) => `
        <div>
            <p>${q.text}</p>
            ${q.options.map((opt, j) => `
                <label>
                    <input type="radio" name="question-${i}" value="${j + 1}" required>
                    ${opt}
                </label>
            `).join('')}
        </div>
    `).join('');
    showSection('quiz');
}

function submitQuiz() {
    const answers = [...document.querySelectorAll('#quiz-questions input:checked')];
    const score = answers.reduce((acc, answer, i) => (
        acc + (parseInt(answer.value, 10) === currentQuiz.questions[i].correct ? 1 : 0)
    ), 0);
    document.getElementById('score').textContent = `Your score: ${score}/${currentQuiz.questions.length}`;
    showSection('results');
}
