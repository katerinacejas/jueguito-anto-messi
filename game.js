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
    bullets.push({ x: player.x + player.width / 2 - 25, y: player.y, width: 50, height: 50 });
}

function draw() {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar jugador
    ctx.drawImage(player_image, player.x, player.y, player.width, player.height);

    // Dibujar balas
    bullets.forEach(bullet => {
        ctx.drawImage(bullet_image, bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bulletSpeed;
    });

    // Dibujar enemigos
    enemies.forEach(enemy => {
        ctx.drawImage(enemy_image, enemy.x, enemy.y, enemy.width, enemy.height);
        enemy.y += enemySpeed;

        // Colisiones entre jugador y enemigos
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            gameOver = true;
        }

        // Colisiones entre balas y enemigos
        bullets.forEach((bullet, bulletIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemy, 1);
            }
        });
    });

    requestAnimationFrame(draw);
}

function generateEnemies() {
    setInterval(() => {
        if (!gameOver) {
            const enemy = {
                x: Math.random() * (canvas.width - 60),
                y: 0,
                width: 60,
                height: 60
            };
            enemies.push(enemy);
        }
    }, 1000);
}

// Iniciar el juego
generateEnemies();
draw();
