// Setting up the canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Canvas size
const width = 700;
const height = 775;
canvas.width = width;
canvas.height = height;
canvas.style.border = "1px solid #000";

// Load images
const player_image = new Image();
player_image.src = "imgs/messi.png";

const bullet_image = new Image();
bullet_image.src = "imgs/corazón.png";

const enemy_image = new Image();
enemy_image.src = "imgs/antonela.png";

const background_image = new Image();
background_image.src = "imgs/fondo_amor.jpg";

// Player
let player_x = width / 2 - 30;
let player_y = height - 70;
const player_speed = 15;

// Bullet
const bullets = [];

// Enemy
const enemies = [];
const enemy_speed = 5;

// Key press state
const keys_pressed = { 'left': false, 'right': false };

// Handle key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        keys_pressed['left'] = true;
    } else if (event.key === 'ArrowRight') {
        keys_pressed['right'] = true;
    } else if (event.key === ' ') {
        bullets.push({ x: player_x + 30, y: player_y });
    }
});

// Handle key release
document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft') {
        keys_pressed['left'] = false;
    } else if (event.key === 'ArrowRight') {
        keys_pressed['right'] = false;
    }
});

// Main game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.drawImage(background_image, 0, 0, width, height);

    // Update player position
    if (keys_pressed['left'] && player_x > 0) {
        player_x -= player_speed;
    }
    if (keys_pressed['right'] && player_x < width - 60) {
        player_x += player_speed;
    }

    // Update bullets position
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= 10;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }

    // Generate random enemies
    if (Math.random() < 0.05) {
        const enemy_x = Math.random() * (width - 60);
        enemies.push({ x: enemy_x, y: 0 });
    }

    // Update enemies position
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += enemy_speed;
        if (enemies[i].y > height) {
            enemies.splice(i, 1);
            i--;
        }
    }

    // Check collision between bullets and enemies
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (bullets[i] && enemies[j] &&
                bullets[i].x < enemies[j].x + 60 &&
                bullets[i].x + 20 > enemies[j].x &&
                bullets[i].y < enemies[j].y + 60 &&
                bullets[i].y + 20 > enemies[j].y) {
                bullets.splice(i, 1);
                enemies.splice(j, 1);
                i--;
                break;
            }
        }
    }

    // Check collision between player and enemies
    for (let i = 0; i < enemies.length; i++) {
        if (player_x < enemies[i].x + 60 &&
            player_x + 60 > enemies[i].x &&
            player_y < enemies[i].y + 60 &&
            player_y + 60 > enemies[i].y) {
            alert("Game Over!");
            document.location.reload();
        }
    }

    // Draw player
    ctx.drawImage(player_image, player_x, player_y, 60, 60);

    // Draw bullets
    for (let i = 0; i < bullets.length; i++) {
        ctx.drawImage(bullet_image, bullets[i].x, bullets[i].y, 20, 20);
    }

    // Draw enemies
    for (let i = 0; i < enemies.length; i++) {
        ctx.drawImage(enemy_image, enemies[i].x, enemies[i].y, 60, 60);
    }

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
