// Holen des Canvas-Elements und des 2D-Kontextes
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Startbildschirm und Spiel starten
const startScreen = document.getElementById('start-screen');
const dialogBox = document.getElementById('dialog-box');
const backgroundMusic = document.getElementById('backgroundMusic');

startScreen.addEventListener('click', startGame);

function startGame() {
    startScreen.style.display = 'none'; // Startbildschirm ausblenden
    canvas.style.display = 'block'; // Canvas sichtbar machen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    backgroundMusic.play(); // Hintergrundmusik starten
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
    direction: '',
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    move: function() {
        if (this.direction === 'up') this.y = Math.max(10, this.y - this.speed);
        if (this.direction === 'down') this.y = Math.min(canvas.height - this.height - 10, this.y + this.speed);
        if (this.direction === 'left') this.x = Math.max(10, this.x - this.speed);
        if (this.direction === 'right') this.x = Math.min(canvas.width - this.width - 10, this.x + this.speed);
    }
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

// Zeichnen der NPCs mit Aufgaben und Informationen
function drawNPCs() {
    npcs.forEach(npc => {
        ctx.drawImage(npc.img, npc.x, npc.y, npc.width, npc.height);

        // Text über dem NPC anzeigen (Aufgabe und Info)
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(npc.task, npc.x, npc.y - 10);
        ctx.fillText(npc.info, npc.x, npc.y - 30);
    });
}

// Funktion zum Überprüfen von Kollisionen zwischen Spieler und NPCs
function checkInteraction() {
    let interacting = false;
    npcs.forEach(npc => {
        if (player.x < npc.x + npc.width &&
            player.x + player.width > npc.x &&
            player.y < npc.y + npc.height &&
            player.y + player.height > npc.y) {
            showDialog(npc);
            interacting = true;
        }
    });
    if (!interacting) {
        dialogBox.style.display = 'none';
    }
}

function showDialog(npc) {
    dialogBox.style.display = 'block';
    dialogBox.innerHTML = `<h2>${npc.task}</h2><p>${npc.info}</p>`;
}

// Spiel Schleife
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen
    player.move();
    player.draw();
    drawNPCs();
    checkInteraction(); // Überprüfe, ob der Spieler mit einem NPC interagiert

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
