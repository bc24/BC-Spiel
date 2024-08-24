document.addEventListener('DOMContentLoaded', () => {
    const nameEntryScreen = document.getElementById('name-entry-screen');
    const gameContainer = document.getElementById('game-container');
    const playerNameInput = document.getElementById('player-name');
    const submitNameBtn = document.getElementById('submit-name-btn');
    const levelTitle = document.getElementById('level-title');
    const timerElement = document.getElementById('timer');
    const puzzleElement = document.getElementById('puzzle');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const highscoreList = document.getElementById('highscore-list');

    let currentLevel = 1;
    let timer;
    let timeLeft = 10;
    let score = 0;
    let playerName = '';
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    let currentQuestions = [];
    let currentAnswer = '';

    updateHighscores();

    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            currentQuestions = data;
            initializeGame();
        })
        .catch(error => console.error('Fehler beim Laden der Fragen:', error));

    function initializeGame() {
        submitNameBtn.addEventListener('click', () => {
            playerName = playerNameInput.value.trim();
            if (playerName) {
                nameEntryScreen.style.display = 'none';
                gameContainer.style.display = 'flex';
                startLevel(currentLevel);
            } else {
                alert('Bitte gib deinen Namen ein!');
            }
        });

        submitAnswerBtn.addEventListener('click', () => {
            checkAnswer();
        });

        nextLevelBtn.addEventListener('click', () => {
            currentLevel++;
            if (currentLevel <= currentQuestions.length) {
                startLevel(currentLevel);
            } else {
                alert('Herzlichen Gl&uuml;ckwunsch! Du hast alle Level abgeschlossen.');
                endGame();
            }
        });
    }

    function startLevel(level) {
        levelTitle.textContent = `Level ${level}`;
        const puzzle = currentQuestions[level - 1];
        puzzleElement.innerHTML = `<p>${puzzle.question}</p><input type="text" id="answer" placeholder="Antwort eingeben">`;
        currentAnswer = puzzle.answer.toLowerCase();
        timeLeft = 10;
        timerElement.textContent = timeLeft;

        if (timer) clearInterval(timer);
        timer = setInterval(updateTimer, 1000);

        submitAnswerBtn.disabled = false;
        nextLevelBtn.style.display = 'none';
    }

    function updateTimer() {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswerBtn.disabled = true;
            nextLevelBtn.style.display = 'block';
            recordScore();
        }
    }

    function checkAnswer() {
        const answerInput = document.getElementById('answer');
        const userAnswer = answerInput.value.trim().toLowerCase();

        if (userAnswer === currentAnswer) {
            score++;
            alert('Richtig!');
            nextLevelBtn.style.display = 'block';
        } else {
            alert('Falsch! Versuche es erneut.');
        }
    }

    function recordScore() {
        highScores.push({ name: playerName, score: score });
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        updateHighscores();
    }

    function updateHighscores() {
        highscoreList.innerHTML = '<h2>Highscores</h2>';
        highScores.forEach(score => {
            highscoreList.innerHTML += `<p>${score.name}: ${score.score}</p>`;
        });
    }

    function endGame() {
        localStorage.setItem('highScores', JSON.stringify(highScores));
        updateHighscores();
        gameContainer.style.display = 'none';
        nameEntryScreen.style.display = 'block';
    }
});
