// Holen des Canvas-Elements und des 2D-Kontextes
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Startbildschirm und Spiel starten
const startScreen = document.getElementById('start-screen');
const dialogBox = document.getElementById('dialog-box');
const backgroundMusic = document.getElementById('backgroundMusic');
const minimap = document.getElementById('minimap');
const minimapCtx = minimap.getContext('2d');
const inventory = [];
const inventoryList = document.getElementById('inventory-list');

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
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'red', // Roter Kreis für den Spieler
    speed: 5,
    direction: '',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    },
    move: function() {
        if (this.direction === 'up') this.y = Math.max(0, this.y - this.speed);
        if (this.direction === 'down') this.y = Math.min(canvas.height - this.height, this.y + this.speed);
        if (this.direction === 'left') this.x = Math.max(0, this.x - this.speed);
        if (this.direction === 'right') this.x = Math.min(canvas.width - this.width, this.x + this.speed);
    }
};

// NPCs Liste mit Bildern, Aufgaben und Informationen
const npcs = [
    { 
        x: 50, 
        y: 50, 
        width: 50, 
        height: 50, 
        imgSrc: 'img/npc1.png', 
        task: 'Bringe mir ein Schwert!', 
        info: 'Ich bin der Schmied des Dorfes.',
        quest: 'Finde das Schwert im Nordwald.'
    },
    { 
        x: canvas.width - 100, 
        y: 50, 
        width: 50, 
        height: 50, 
        imgSrc: 'img/npc2.png', 
        task: 'Sammle 10 Äpfel!', 
        info: 'Ich bin der Händler hier.',
        quest: 'Sammle die Äpfel im Obstgarten.'
    }
];

// Laden der NPC-Bilder
npcs.forEach(npc => {
    const img = new Image();
    img.src = npc.imgSrc;
    npc.img = img;
});

// Zeichnen der NPCs
function drawNPCs() {
    npcs.forEach(npc => {
        ctx.drawImage(npc.img, npc.x, npc.y, npc.width, npc.height);
        // NPC-Informationen werden in der Dialogbox angezeigt
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

// Funktion zum Zeichnen der Minimap
function drawMinimap() {
    minimapCtx.clearRect(0, 0, minimap.width, minimap.height); // Minimap leeren
    minimapCtx.fillStyle = 'lightblue';
    minimapCtx.fillRect(0, 0, minimap.width, minimap.height);

    // Zeichne eine kleine Darstellung des Spielbereichs
    minimapCtx.fillStyle = 'blue';
    minimapCtx.fillRect(
        (player.x / canvas.width) * minimap.width,
        (player.y / canvas.height) * minimap.height,
        player.width / canvas.width * minimap.width,
        player.height / canvas.height * minimap.height
    );
}

function updateInventory(item) {
    inventory.push(item);
    inventoryList.innerHTML = inventory.map(i => `<li>${i}</li>`).join('');
}

// Haupt-Game-Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.move();
    player.draw();
    drawNPCs();
    checkInteraction();
    drawMinimap();
    requestAnimationFrame(gameLoop);
}

// Steuerung des Spielers
document.addEventListener('keydown', (e) => {
    switch (e.key) {
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

document.addEventListener('keyup', () => {
    player.direction = '';
});
