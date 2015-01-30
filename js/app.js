// Goal that player must reach to win
var Goal = function(x, y) {
  // set goal sprite image
  this.sprite = 'images/Selector.png';

  // set goal position
  this.x = x;
  this.y = y;
}

// Check if player has reached goal
Goal.prototype.colliding = function(goal, player) {
  return !(player.left > goal.right ||
           player.right < goal.left ||
           player.top > goal.bottom ||
           player.bottom < goal.top);
}

// Reset player after reaching goal
Goal.prototype.detectCollision = function (goal, player) {
  if (this.colliding(goal, player)) {
    setTimeout(function(){player.reset()}, 600); // add some time lag so reset is a little smoother
  }
}

Goal.prototype.update = function(dt) {
    // Define goal box for collision detection
    this.left = this.x;
    this.right = this.x + 99;
    this.top = this.y + 88;
    this.bottom = this.y + 165;

    // Check if player has collided
    this.detectCollision(this, player);
}

// Draw goal on screen
Goal.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies the player must avoid
var Enemy = function(x, y, speed) {
    // set enemy start position and speed
    this.x = x;
    this.y = y;
    this.speed = speed;

    // set enemy image sprite
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplying any movement by the dt parameter
    // will ensure the game runs at the same speed for all computers.

    // Move enemy across screen at its given speed
    velocity = this.speed * dt;
    this.x += velocity;

    if (this.x > 500) {
      this.x = -120;
    }

    // Define enemy box for collision detection
    this.left = this.x + 2;
    this.right = this.x + 99;
    this.top = this.y + 76;
    this.bottom = this.y + 143;

    // Check if player has collided
    this.detectCollision(this, player);
}

// Function to check for Enemy Player collisions
Enemy.prototype.colliding = function(enemy, player) {
  return !(player.left > enemy.right ||
           player.right < enemy.left ||
           player.top > enemy.bottom ||
           player.bottom < enemy.top);
}

// Reset player position if collided with enemy
Enemy.prototype.detectCollision = function (enemy, player) {
  if (this.colliding(enemy, player)) {
    player.reset();
  }
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Dragonfly is second type of enemy, with different sprite and collision box
var Dragonfly = function(x, y, speed) {
  // get position and speed
  Enemy.call(this, x, y, speed);

  // set dragonfly sprite image
  this.sprite = 'images/enemy-dragonfly.png'
}

Dragonfly.prototype = Object.create(Enemy.prototype);
Dragonfly.prototype.constructor = Dragonfly;
Dragonfly.prototype.update = function(dt) {
    velocity = this.speed * dt;
    this.x += velocity;

    if (this.x > 500) {
      this.x = -120;
    }

    // Define enemy dragonfly box for collision detection
    this.left = this.x;
    this.right = this.x + 101;
    this.top = this.y;
    this.bottom = this.y + 123;

    // Check if player has collided
    this.detectCollision(this, player);
}

// Player Class
var Player = function (x, y) {
  // set player image sprite
  this.sprite = 'images/char-cat-girl.png';

  // set player start position
  this.x = x;
  this.y = y;
}

Player.prototype.update = function(dt) {
  // Define player box for collision detection
  this.left = this.x + 17;
  this.right = this.x + 84;
  this.top = this.y + 60;
  this.bottom = this.y + 140;
}

// Reset to start position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 570;
}

// Draw player on screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player movement, depending on what keys are pushed
Player.prototype.handleInput = function(key) {
  if (key === 'left') {
    if (this.x > 0) {
      this.x -= 101;
    }
  }

  if (key === 'right') {
    if (this.x < 400) {
      this.x += 101;
    }
  }

  if (key === 'up') {
    if (this.y > 20 ) {
      this.y -= 83;
    }
  }

  if (key === 'down') {
    if (this.y < 570 ) {
      this.y += 83;
    }
  }
}

// Instantiate enemies, player and goal
var allEnemies = [
    new Enemy(0, 227, 200),
    new Dragonfly(250, 340, 500),
    new Enemy(400, 397, 150),
    new Enemy(100, 397, 220)
];

var player = new Player (200, 570);

var goal = new Goal (202, 127);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
