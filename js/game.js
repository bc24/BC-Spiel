// Holen des Canvas-Elements und des 2D-Kontextes
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Startbildschirm und Spiel starten
const startScreen = document.getElementById('start-screen');
startScreen.addEventListener('click', startGame);

function startGame() {
    startScreen.style.display = 'none'; // Startbildschirm ausblenden
    canvas.style.display = 'block'; // Canvas sichtbar machen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gameLoop(); // Spiel Schleife starten
}

// Spieler Objekt
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
    direction: ''
};

// NPCs Liste mit Bildern, Aufgaben und Informationen
const npcs = [
    { 
        x: 100, 
        y: 100, 
        width: 50, 
        height: 50, 
        imgSrc: 'img/npc1.png', 
        task: 'Bringe mir ein Schwert!', 
        info: 'Ich bin der Schmied des Dorfes.' 
    },
    { 
        x: 300, 
        y: 200, 
        width: 50, 
        height: 50, 
        imgSrc: 'img/npc2.png', 
        task: 'Finde den verlorenen Schatz!', 
        info: 'Ich bin der Händler hier.' 
    }
];

// Laden der NPC-Bilder
npcs.forEach(npc => {
    const img = new Image();
    img.src = npc.imgSrc;
    npc.img = img;
});

// Zeichnen des Spielers
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Zeichnen der NPCs mit Aufgaben und Informationen
function drawNPCs() {
    npcs.forEach(npc => {
        // NPC-Bild zeichnen
        ctx.drawImage(npc.img, npc.x, npc.y, npc.width, npc.height);

        // Text über dem NPC anzeigen (Aufgabe und Info)
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';

        // Aufgabe anzeigen
        ctx.fillText(npc.task, npc.x, npc.y - 10);

        // Information anzeigen (über der Aufgabe)
        ctx.fillText(npc.info, npc.x, npc.y - 30);
    });
}

// Funktion zum Überprüfen von Kollisionen zwischen Spieler und NPCs
function checkInteraction() {
    npcs.forEach(npc => {
        if (player.x < npc.x + npc.width &&
            player.x + player.width > npc.x &&
            player.y < npc.y + npc.height &&
            player.y + player.height > npc.y) {
            alert("Aufgabe erhalten: " + npc.task);
        }
    });
}

// Spiel Schleife
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen

    drawPlayer();
    drawNPCs();
    checkInteraction(); // Überprüfe, ob der Spieler mit einem NPC interagiert

    // Spieler Bewegung
    if (player.direction === 'up') player.y -= player.speed;
    if (player.direction === 'down') player.y += player.speed;
    if (player.direction === 'left') player.x -= player.speed;
    if (player.direction === 'right') player.x += player.speed;

    requestAnimationFrame(gameLoop);
}

// Spielersteuerung
window.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            player.direction = 'up';
            break;
        case 'ArrowDown':
            player.direction = 'down';
            break;
        case 'ArrowLeft':
            player.direction = 'left';
            break;
        case 'ArrowRight':
            player.direction = 'right';
            break;
    }
});

window.addEventListener('keyup', function(event) {
    player.direction = '';
});
