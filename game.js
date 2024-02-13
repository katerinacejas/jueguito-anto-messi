// Inicializar canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Cargar imágenes
const player_image = new Image();
player_image.src = 'imgs/messi.png';

const bullet_image = new Image();
bullet_image.src = 'imgs/corazón.png';

const enemy_image = new Image();
enemy_image.src = 'imgs/antonela.png';

// Definir variables
let player = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 70,
    width: 60,
    height: 60,
    speed: 15
};

let bullets = [];
let bulletSpeed = 10;

let enemies = [];
let enemySpeed = 5;

let gameOver = false;

// Event Listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (event.key === 'Left' || event.key === 'ArrowLeft') {
        player.x -= player.speed;
    } else if (event.key === 'Right' || event.key === 'ArrowRight') {
        player.x += player.speed;
    } else if (event.key === 'Space' && !gameOver) {
        fireBullet();
    }
}

function keyUpHandler(event) {
    if (event.key === 'Left' || event.key === 'ArrowLeft') {
        player.x += 0;
    } else if (event.key === 'Right' || event.key === 'ArrowRight') {
        player.x -= 0;
    }
}

function fireBullet() {
    bullets.push({ x: player.x 
