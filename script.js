document.addEventListener('DOMContentLoaded', () => {
    const nameEntryScreen = document.getElementById('name-entry-screen');
    const gameContainer = document.getElementById('game-container');
    const displayName = document.getElementById('display-name');
    const playerNameInput = document.getElementById('player-name');
    const submitNameBtn = document.getElementById('submit-name-btn');
    const levelTitle = document.getElementById('level-title');
    const timerElement = document.getElementById('time');
    const puzzleElement = document.getElementById('puzzle');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const highscoreList = document.getElementById('highscore-list');

    let currentLevel = 1;
    let timer;
    let timeLeft = 360;
    let score = 0;
    let playerName = '';
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Highscores aktualisieren
    updateHighscores();

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

    function startLevel(level) {
        levelTitle.textContent = `Level ${level}`;
        puzzleElement.innerHTML = getPuzzle(level);
        timeLeft = 360;
        timerElement.textContent = timeLeft;

        if (timer) clearInterval(timer);
        timer = setInterval(updateTimer, 1000);

        nextLevelBtn.style.display = 'none';
    }

    function updateTimer() {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextLevelBtn.style.display = 'block';
            recordScore();
        }
    }

    function getPuzzle(level) {
        // Beispielrätsel für jedes Level
        switch(level) {
            case 1:
                return '<p>R&auml;tsel 1: Was ist 5 + 3?</p><input type="text" id="answer" /><button onclick="checkAnswer(1)">&Uuml;berpr&uuml;fen</button>';
            case 2:
                return '<p>R&auml;tsel 2: Wie lautet die Hauptstadt von Deutschland?</p><input type="text" id="answer" /><button onclick="checkAnswer(2)">&Uuml;berpr&uuml;fen</button>';
            // Weitere R&auml;tsel f&uuml;r alle 100 Levels
            default:
                return '<p>Level nicht gefunden.</p>';
        }
    }

    window.checkAnswer = function(level) {
        const answer = document.getElementById('answer').value.trim().toLowerCase();
        let correct = false;

        switch(level) {
            case 1:
                correct = (answer === '8');
                break;
            case 2:
                correct = (answer === 'berlin');
                break;
            // Weitere Level
        }

        if (correct) {
            score++;
            nextLevelBtn.style.display = 'block';
        } else {
            alert('Falsche Antwort, versuche es noch einmal!');
        }
    };

    function recordScore() {
        if (timeLeft <= 0) {
            const highscoreEntry = { name: playerName, score: score };
            highScores.push(highscoreEntry);
            highScores.sort((a, b) => b.score - a.score).splice(10); // Hält die besten 10 Scores
            localStorage.setItem('highScores', JSON.stringify(highScores));
            updateHighscores();
            saveHighscoresToFile();
        }
    }

    function updateHighscores() {
        highscoreList.innerHTML = '';
        highScores.forEach((entry, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${entry.name}: ${entry.score} Punkte`;
            highscoreList.appendChild(li);
        });
    }

    function saveHighscoresToFile() {
        fetch('save_highscores.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(highScores)
        });
    }
});
