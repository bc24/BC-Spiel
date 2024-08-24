document.addEventListener('DOMContentLoaded', () => {
    const nameEntryScreen = document.getElementById('name-entry-screen');
    const gameContainer = document.getElementById('game-container');
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

    nextLevelBtn.addEventListener('click', () => {
        currentLevel++;
        if (currentLevel <= 100) {
            startLevel(currentLevel);
        } else {
            alert('Herzlichen Glückwunsch! Du hast alle Level abgeschlossen.');
            endGame();
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
        const puzzles = [
            { question: 'Was ist 5 + 3?', answer: '8' },
            { question: 'Wie lautet die Hauptstadt von Deutschland?', answer: 'berlin' },
            { question: 'Welcher Planet ist der Sonne am nächsten?', answer: 'merkur' },
            { question: 'Wie viele Kontinente gibt es auf der Erde?', answer: '7' },
            { question: 'Welches Element hat das chemische Symbol "O"?', answer: 'sauerstoff' },
            { question: 'Was ist die Quadratwurzel von 16?', answer: '4' },
            { question: 'Wie viele Bundesländer hat Deutschland?', answer: '16' },
            { question: 'Was ist die größte Insel der Welt?', answer: 'grönland' },
            { question: 'Wie viele Tasten hat ein Klavier?', answer: '88' },
            { question: 'Welches Land ist bekannt für seine Tulpen?', answer: 'niederlande' },
            // Füge hier weitere Fragen hinzu
            { question: 'Was ist die Hauptstadt von Frankreich?', answer: 'paris' },
            { question: 'Wie viele Minuten hat eine Stunde?', answer: '60' },
            { question: 'Was ist die chemische Formel für Wasser?', answer: 'h2o' },
            { question: 'Welcher Kontinent ist der größte?', answer: 'asien' },
            { question: 'Wie viele Planeten gibt es im Sonnensystem?', answer: '8' },
            { question: 'Wie viele Zähne hat ein erwachsener Mensch normalerweise?', answer: '32' },
            { question: 'Was ist die höchste Bergkette der Welt?', answer: 'himalaya' },
            { question: 'Wie viele Farben hat ein Regenbogen?', answer: '7' },
            { question: 'Wer hat die Relativitätstheorie entwickelt?', answer: 'einstein' },
            { question: 'Was ist das kleinste Knochen im menschlichen Körper?', answer: 'stapes' },
            { question: 'Wie heißt der höchste Wasserfall der Welt?', answer: 'angelfall' },
            { question: 'Wie heißt die größte Wüste der Welt?', answer: 'antarktis' },
            { question: 'Wer malte die Mona Lisa?', answer: 'da vinci' },
            { question: 'Wie viele Planeten hat unser Sonnensystem?', answer: '8' },
            { question: 'Was ist die chemische Formel für Salz?', answer: 'na cl' },
            { question: 'Wie viele Farben hat das Logo von Google?', answer: '4' },
            { question: 'Wie heißt der größte Ozean?', answer: 'pazifik' },
            { question: 'Wer schrieb „Die Verwandlung“?', answer: 'kafka' },
            { question: 'Wie viele Beine hat ein Insekt?', answer: '6' },
            { question: 'Was ist der größte Planet in unserem Sonnensystem?', answer: 'jupiter' },
            { question: 'Wie heißt die Hauptstadt von Italien?', answer: 'rom' },
            { question: 'Wie heißt die Hauptstadt von Spanien?', answer: 'madrid' },
            { question: 'Wie viele Stunden hat ein Tag?', answer: '24' },
            { question: 'Wie heißt der erste Mensch, der den Mond betreten hat?', answer: 'armstrong' },
            { question: 'Welches Tier ist das größte auf der Erde?', answer: 'blauwal' },
            { question: 'Wie viele Buchstaben hat das englische Alphabet?', answer: '26' },
            { question: 'Was ist die Hauptstadt von Kanada?', answer: 'ottawa' },
            { question: 'Wie heißt der drittlängste Fluss der Welt?', answer: 'jangtse' },
            { question: 'Wie viele Minuten hat ein Tag?', answer: '1440' },
            { question: 'Welches Land hat die meisten Inseln?', answer: 'schweden' },
            { question: 'Wie heißt der größte Fluss der Welt?', answer: 'amazonas' },
            { question: 'Was ist das schwerste Tier der Welt?', answer: 'blauwal' },
            { question: 'Wie viele Tasten hat ein Klavier?', answer: '88' },
            { question: 'Wie heißt die größte Stadt in den USA?', answer: 'new york' },
            { question: 'Wie viele Jahre dauert eine Lichtminute?', answer: '1' },
            { question: 'Wer ist der Erfinder des Telefons?', answer: 'bell' },
            { question: 'Wie heißt der höchste Berg in Afrika?', answer: 'kilimandscharo' },
            { question: 'Wie viele Menschen leben ungefähr auf der Erde?', answer: '7 milliarden' },
            { question: 'Wie heißt der längste Fluss in Europa?', answer: 'donau' },
            { question: 'Wie viele Kontinente gibt es auf der Erde?', answer: '7' },
            { question: 'Wie viele Planeten hat unser Sonnensystem?', answer: '8' },
            { question: 'Was ist der Hauptbestandteil von Erde?', answer: 'boden' },
            { question: 'Wie heißt der größte Vulkan auf der Erde?', answer: 'mauna loa' },
            { question: 'Wie viele Ecken hat ein Quadrat?', answer: '4' },
            { question: 'Was ist die Hauptwährung in Japan?', answer: 'yen' },
            { question: 'Wie viele Ozeane gibt es?', answer: '5' },
            { question: 'Wie heißt der schnellste Vogel?', answer: 'wanderruderer' },
            { question: 'Was ist die größte Insel der Welt?', answer: 'grönland' },
            { question: 'Wie viele Tage hat ein Jahr?', answer: '365' },
            { question: 'Wie heißt der größte Ozean?', answer: 'pazifik' },
            { question: 'Wie viele Farben hat das Regenbogen?', answer: '7' },
            { question: 'Wer ist der Autor von „Harry Potter“?', answer: 'rowling' },
            { question: 'Wie heißt das schnellste Tier an Land?', answer: 'gepard' },
            { question: 'Wie viele Sterne sind auf der Flagge der USA?', answer: '50' },
            { question: 'Was ist der kleinste Planet in unserem Sonnensystem?', answer: 'merkur' },
            { question: 'Wie heißt die längste Mauer der Welt?', answer: 'chinesische mauer' },
            { question: 'Wie viele Kontinente gibt es auf der Erde?', answer: '7' },
            { question: 'Was ist das meistgesprochene Sprache der Welt?', answer: 'mandarin' },
            { question: 'Wie heißt die Hauptstadt von Australien?', answer: 'canberra' },
            { question: 'Wie viele Monate hat ein Jahr?', answer: '12' },
            { question: 'Wie heißt der älteste Mensch der Welt?', answer: 'jeanne calment' },
            { question: 'Wie viele Zähne hat ein erwachsener Mensch?', answer: '32' },
            { question: 'Wie viele Muskeln hat der menschliche Körper?', answer: '650' },
            { question: 'Was ist die größte Tierart?', answer: 'blauwal' },
            { question: 'Wie viele Planeten hat unser Sonnensystem?', answer: '8' },
            { question: 'Wie viele Zähne hat ein Mensch normalerweise?', answer: '32' },
            { question: 'Wie heißt der größte Ozean?', answer: 'pazifik' },
            { question: 'Wie viele Minuten hat eine Stunde?', answer: '60' },
            { question: 'Wie heißt die höchste Bergkette der Welt?', answer: 'himalaya' },
            { question: 'Wie viele Beine hat ein Insekt?', answer: '6' },
            { question: 'Wer erfand das Telefon?', answer: 'alexander graham bell' },
            { question: 'Wie heißt die größte Wüste der Welt?', answer: 'antarktis' },
            { question: 'Wie viele Sprachen gibt es auf der Welt?', answer: 'etwa 7000' },
            { question: 'Wie heißt der schnellste Landtier?', answer: 'gepard' },
            { question: 'Was ist die größte Stadt der Welt?', answer: 'tokio' },
            { question: 'Wie viele Sterne sind auf der Flagge der USA?', answer: '50' },
            { question: 'Wie heißt der tiefste Punkt der Erde?', answer: 'marianengraben' },
            { question: 'Wie heißt der längste Fluss in Afrika?', answer: 'nil' },
            { question: 'Wie viele Knochen hat der menschliche Körper?', answer: '206' },
            { question: 'Wie heißt der größte Mensch der Welt?', answer: 'robert wadlow' },
            { question: 'Wie viele Schachfelder gibt es auf einem Schachbrett?', answer: '64' },
            { question: 'Wie heißt das größte Tier im Ozean?', answer: 'blauwal' },
            { question: 'Wie viele Stunden hat ein Tag?', answer: '24' },
            { question: 'Wie viele Minuten hat ein Jahr?', answer: '525600' },
            { question: 'Was ist der schnellste Vogel?', answer: 'wanderfalke' },
            { question: 'Wie viele Kontinente gibt es auf der Erde?', answer: '7' },
            { question: 'Was ist die Hauptstadt von Kanada?', answer: 'ottawa' },
            { question: 'Wie heißt der größte Fluss in Südamerika?', answer: 'amazonas' },
            { question: 'Wie viele Farben hat das Logo von Google?', answer: '4' },
            { question: 'Wie viele Zeit- und Raumdimensionen gibt es?', answer: '4' },
            { question: 'Wie viele Planeten gibt es im Sonnensystem?', answer: '8' },
            { question: 'Wie viele Monate hat ein Jahr?', answer: '12' },
            { question: 'Wie heißt die höchste Wasserfall?', answer: 'angel falls' },
            { question: 'Wie heißt der tiefste See der Welt?', answer: 'baikal' },
            { question: 'Wie viele Nieren hat der Mensch?', answer: '2' },
            { question: 'Wie viele Zähne hat ein erwachsener Mensch?', answer: '32' },
            { question: 'Was ist der kleinste Knochen im menschlichen Körper?', answer: 'stapes' },
            { question: 'Wie viele Farben hat ein Regenbogen?', answer: '7' },
            { question: 'Wie viele Länder gibt es in Europa?', answer: '44' },
            { question: 'Wie viele Buchstaben hat das englische Alphabet?', answer: '26' },
            { question: 'Wie heißt der größte bekannte Planet?', answer: 'jupiter' },
            { question: 'Wie heißt die höchste Bergkette in Europa?', answer: 'alpen' },
            { question: 'Wie heißt die größte Stadt in China?', answer: 'schanghai' },
            { question: 'Wie viele Kontinente gibt es auf der Erde?', answer: '7' },
            { question: 'Wie viele Elemente gibt es im Periodensystem?', answer: '118' },
            { question: 'Wie viele Kilometer beträgt der Erdumfang?', answer: '40075' },
            { question: 'Wie heißt der größte Ozean?', answer: 'pazifik' },
            { question: 'Wie viele Ecken hat ein Würfel?', answer: '8' },
            { question: 'Wie viele Tage hat ein Jahr?', answer: '365' },
            { question: 'Wie viele Planeten hat unser Sonnensystem?', answer: '8' },
            { question: 'Wie heißt die größte Stadt in Brasilien?', answer: 'são paulo' },
            { question: 'Wie viele Ringe sind im Olympischen Logo?', answer: '5' },
            { question: 'Wie viele Tasten hat ein Klavier?', answer: '88' },
            { question: 'Wie viele Farben hat die Nationalflagge der USA?', answer: '3' },
            { question: 'Wie viele Buchstaben hat das Alphabet?', answer: '26' },
            { question: 'Wie heißt der höchste Berg in den Alpen?', answer: 'mont blanc' },
            { question: 'Wie viele Planeten hat unser Sonnensystem?', answer: '8' },
            { question: 'Wie viele Tasten hat ein Klavier?', answer: '88' },
            { question: 'Wie heißt der längste Fluss der Welt?', answer: 'amazonas' },
            { question: 'Wie viele Zeitzonen gibt es weltweit?', answer: '24' },
            { question: 'Wie viele Stunden hat ein Tag?', answer: '24' },
            { question: 'Wie viele Sekunden hat eine Stunde?', answer: '3600' },
            { question: 'Wie heißt der kleinste Planet in unserem Sonnensystem?', answer: 'merkur' },
            { question: 'Wie viele Kontinente gibt es auf der Erde?', answer: '7' },
            { question: 'Wie viele Farben hat ein Regenbogen?', answer: '7' },
            { question: 'Wie viele Nieren hat ein Mensch?', answer: '2' },
            { question: 'Wie viele Planeten hat unser Sonnensystem?', answer: '8' },
            { question: 'Wie heißt der größte Ozean?', answer: 'pazifik' },
            { question: 'Wie viele Ecken hat ein Würfel?', answer: '8' },
            { question: 'Wie viele Tage hat ein Jahr?', answer: '365' },
            { question: 'Wie viele Tasten hat ein Klavier?', answer: '88' },
            { question: 'Wie viele Kontinente gibt es auf der Erde?', answer: '7' },
            { question: 'Wie viele Buchstaben hat das Alphabet?', answer: '26' },
            { question: 'Wie viele Länder gibt es auf der Welt?', answer: '195' },
            { question: 'Wie viele Buchstaben hat das englische Alphabet?', answer: '26' },
            { question: 'Wie viele Zähne hat ein Erwachsener Mensch?', answer: '32' },
            { question: 'Wie viele Meter hat ein Kilometer?', answer: '1000' },
            { question: 'Wie viele Minuten hat eine Stunde?', answer: '60' },
            { question: 'Wie heißt der größte Vulkan auf der Erde?', answer: 'mauna loa' },
            { question: 'Wie viele Planeten gibt es in unserem Sonnensystem?', answer: '8' },
            { question: 'Wie viele Tage hat ein Schaltjahr?', answer: '366' },
            { question: 'Wie heißt der größte Wasserfall der Welt?', answer: 'angel falls' },
            { question: 'Wie viele Tage hat ein Jahr?', answer: '365' },
            { question: 'Wie viele Kilometer hat der Erdumfang?', answer: '40075' },
            { question: 'Wie viele Farben hat ein Regenbogen?', answer: '7' },
            { question: 'Wie viele Beine hat eine Spinne?', answer: '8' },
            { question: 'Wie viele Knochen hat der menschliche Körper?', answer: '206' },
            { question: 'Wie heißt der größte Ozean?', answer: 'pazifik' },
            { question: 'Wie viele Monate hat ein Jahr?', answer: '12' },
            { question: 'Wie heißt der kleinste Planet?', answer: 'merkur' },
            { question: 'Wie viele Kontinente gibt es?', answer: '7' },
            { question: 'Wie viele Buchstaben hat das englische Alphabet?', answer: '26' },
            { question: 'Wie heißt die höchste Gebirgskette der Welt?', answer: 'himalaya' },
            { question: 'Wie viele Farben hat die Flagge von Frankreich?', answer: '3' },
            { question: 'Wie viele Planeten gibt es in unserem Sonnensystem?', answer: '8' },
            { question: 'Wie viele Wochen hat ein Jahr?', answer: '52' },
            { question: 'Wie heißt der größte Ozean?', answer: 'pazifik' },
            { question: 'Wie viele Stunden hat ein Tag?', answer: '24' },
            { question: 'Wie viele Minuten hat eine Stunde?', answer: '60' },
            { question: 'Wie viele Sekunden hat eine Stunde?', answer: '3600' },
            { question: 'Wie heißt die größte Stadt in Afrika?', answer: 'kairo' },
            { question: 'Wie heißt der größte Planet im Sonnensystem?', answer: 'jupiter' }
        ];

        if (level > puzzles.length) {
            return 'Keine Fragen mehr verfügbar!';
        }
        
        return `<div>
            <p>${puzzles[level - 1].question}</p>
            <input type="text" id="answer" placeholder="Antwort eingeben">
            <button id="submit-answer-btn">Antwort überprüfen</button>
        </div>`;
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
