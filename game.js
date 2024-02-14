// Importing the needed libraries
const { loadImage, createCanvas } = require('canvas');
const fs = require('fs');

// Initialize the canvas and its context
const width = 700, height = 775;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Load images
const playerImageSrc = "imgs/messi.png";
const bulletImageSrc = "imgs/corazón.png";
const enemyImageSrc = "imgs/antonela.png";
const backgroundImageSrc = "imgs/fondo_amor.jpg";

let playerImage, bulletImage, enemyImage, backgroundImage;

// Function to load an image
function loadImagePromise(src) {
  return new Promise((resolve, reject) => {
    loadImage(src).then((image) => {
      resolve(image);
    }).catch(reject);
  });
}

// Function to scale an image
function scaleImage(image, width, height) {
  const scaledCanvas = createCanvas(width, height);
  const scaledCtx = scaledCanvas.getContext('2d');
  scaledCtx.drawImage(image, 0, 0, width, height);
  return scaledCanvas;
}

// Load all images and scale them
Promise.all([
  loadImagePromise(playerImageSrc),
  loadImagePromise(bulletImageSrc),
  loadImagePromise(enemyImageSrc),
  loadImagePromise(backgroundImageSrc)
]).then(images => {
  playerImage = scaleImage(images[0], 60, 60);
  bulletImage = scaleImage(images[1], 50, 50);
  enemyImage = scaleImage(images[2], 60, 60);
  backgroundImage = scaleImage(images[3], width, height);
  // Start the game loop after images are loaded
  gameLoop();
});

// Player setup
const playerRect = { x: width / 2 - 30, y: height - 70, width: 60, height: 60 };
const playerSpeed = 15;

// Bullet setup
const bulletSpeed = 10;
const bullets = [];

// Enemy setup
const enemySpeed = 5;
const enemies = [];

// Game loop variables
let keysPressed = { left: false, right: false };
let lastTime = 0;

// Game loop function
function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // Handle input
  // ... (input handling would be implemented here)

  // Update player position
  if (keysPressed.left && playerRect.x > 0) {
    playerRect.x -= playerSpeed;
  }
  if (keysPressed.right && playerRect.x + playerRect.width < width) {
    playerRect.x += playerSpeed;
  }

  // Update bullets
  bullets.forEach(bullet => {
    bullet.y -= bulletSpeed;
  });

  // Spawn enemies
  if (Math.random() < 0.05) {
    const enemyRect = { x: Math.random() * (width - 60), y: 0, width: 60, height: 60 };
    enemies.push(enemyRect);
  }

  // Update enemies
  enemies.forEach(enemy => {
    enemy.y += enemySpeed;
  });

  // Collision detection
  bullets.forEach(bullet => {
    enemies.forEach((enemy, enemyIndex) => {
      if (rectsCollide(bullet, enemy)) {
        bullets.splice(bullets.indexOf(bullet), 1);
        enemies.splice(enemyIndex, 1);
      }
    });
  });

  enemies.forEach((enemy, enemyIndex) => {
    if (rectsCollide(playerRect, enemy)) {
      // End game
      process.exit();
    }
  });

  // Draw everything
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(playerImage, playerRect.x, playerRect.y);
  bullets.forEach(bullet => {
    ctx.drawImage(bulletImage, bullet.x, bullet.y);
  });
  enemies.forEach(enemy => {
    ctx.drawImage(enemyImage, enemy.x, enemy.y);
  });

  // Save the frame (if needed)
  // const buffer = canvas.toBuffer('image/png');
  // fs.writeFileSync('./frame.png', buffer);

  // Request next frame
  requestAnimationFrame(gameLoop);
}

// Collision detection function
function rectsCollide(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// Request the first frame
requestAnimationFrame(gameLoop);
