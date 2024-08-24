document.addEventListener('DOMContentLoaded', () => {
    const levelTitle = document.getElementById('level-title');
    const timerElement = document.getElementById('time');
    const puzzleElement = document.getElementById('puzzle');
    const nextLevelBtn = document.getElementById('next-level-btn');

    let currentLevel = 1;
    let timer;
    let timeLeft = 360;

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
        }
    }

    function getPuzzle(level) {
        // Hier kannst du deine kreativen R�tsel implementieren
        // Beispielr�tsel f�r jedes Level:
        switch(level) {
            case 1:
                return '<p>R�tsel 1: Was ist 2 + 2?</p><input type="text" id="answer" /><button onclick="checkAnswer(1)">�berpr�fen</button>';
            case 2:
                return '<p>R�tsel 2: Wie lautet die Hauptstadt von Frankreich?</p><input type="text" id="answer" /><button onclick="checkAnswer(2)">�berpr�fen</button>';
            // F�ge hier weitere Levels hinzu
            default:
                return '<p>Level nicht gefunden.</p>';
        }
    }

    window.checkAnswer = function(level) {
        const answer = document.getElementById('answer').value.trim().toLowerCase();
        let correct = false;

        switch(level) {
            case 1:
                correct = (answer === '4');
                break;
            case 2:
                correct = (answer === 'paris');
                break;
            // F�ge hier die korrekten Antworten f�r andere Levels hinzu
        }

        if (correct) {
            nextLevelBtn.style.display = 'block';
        } else {
            alert('Falsche Antwort, versuche es noch einmal!');
        }
    };

    nextLevelBtn.addEventListener('click', () => {
        if (currentLevel < 5) {
            currentLevel++;
            startLevel(currentLevel);
        } else {
            alert('Herzlichen Gl�ckwunsch, du hast das Spiel beendet!');
        }
    });

    startLevel(currentLevel);
});
