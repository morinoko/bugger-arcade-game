// Goal that player must reach to win
var Goal = function(x, y) {
  this.sprite = 'images/Selector.png';

  this.x = x;
  this.y = y;
}

//
Goal.prototype.colliding = function(goal, player) {
  return !(player.left > goal.right ||
           player.right < goal.left ||
           player.top > goal.bottom ||
           player.bottom < goal.top);
}

Goal.prototype.detectCollision = function (goal, player) {
  if (this.colliding(goal, player)) {
    player.reset();
  }
}

Goal.prototype.update = function(dt) {
    // Define goal box for collision detection
    this.left = this.x;
    this.right = this.x + 99;
    this.top = this.y + 88;
    this.bottom = this.y + 170;

    // Check if player has collided
    this.detectCollision(this, player);
}

Goal.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {

  this.sprite = 'images/char-cat-girl.png';

  this.x = x;
  this.y = y;
  console.log(x);
}

Player.prototype.update = function(dt) {
  // Define player box for collision detection
  this.left = this.x + 17;
  this.right = this.x + 84;
  this.top = this.y + 60;
  this.bottom = this.y + 140;
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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
      this.y -= 84;
    }
  }

  if (key === 'down') {
    if (this.y < 400 ) {
      this.y += 84;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(0, 60, 200),
    new Enemy(250, 145, 400),
    new Enemy(200, 230, 100)
];

var player = new Player (200, 400);

var goal = new Goal (202, -39);


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
