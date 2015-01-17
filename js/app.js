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

    // Define enemy coordinates for collision
    this.left = x+2;
    this.right = x + 99;
    this.top = y + 76;
    this.bottom = y + 143;
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

  // Define player coordinates for collision
  this.left = x + 17;
  this.right = x + 84;
  this.top = y + 60;
  this.bottom = y + 140;
}

Player.prototype.update = function(dt) {
  // TODO add functionality
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
  //TODO add functionality for goal reset and block movement offscreen
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
    new Enemy(200, 230, 0)
];

var player = new Player (200, 400);


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
