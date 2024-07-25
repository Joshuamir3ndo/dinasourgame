const readline = require("readline-sync");

class DinosaurGame {
  constructor() {
    this.isPlaying = true;
    this.dinoPosition = 0;
    this.obstaclePosition = 19;
    this.score = 0;
    this.isJumping = false;
  }

  printGame() {
    let gameLine = "";
    for (let i = 0; i < 20; i++) {
      if (i === this.dinoPosition) {
        gameLine += "🦖"; // Dinosaur emoji
      } else if (i === this.obstaclePosition) {
        gameLine += "🌵"; // Cactus emoji
      } else {
        gameLine += ".";
      }
    }
    console.clear();
    console.log(gameLine);
    console.log(`Score: ${this.score}`);
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.dinoPosition = 1;
      setTimeout(() => {
        this.dinoPosition = 0;
        this.isJumping = false;
      }, 500);
    }
  }

  moveObstacle() {
    this.obstaclePosition--;
    if (this.obstaclePosition < 0) {
      this.obstaclePosition = 19;
      this.score++;
    }
  }

  checkCollision() {
    if (this.dinoPosition === 0 && this.obstaclePosition === 0) {
      this.isPlaying = false;
    }
  }

  start() {
    console.log('Press "Enter" to jump');
    const gameLoop = setInterval(() => {
      this.printGame();
      if (
        readline.keyIn("", { hideEchoBack: true, mask: "", limit: " " }) === ""
      ) {
        this.jump();
      }
      this.moveObstacle();
      this.checkCollision();
      if (!this.isPlaying) {
        clearInterval(gameLoop);
        console.clear();
        console.log("Game Over!");
        console.log(`Final Score: ${this.score}`);
      }
    }, 200); // Adjusted game loop interval to make the game run more smoothly
  }
}

const game = new DinosaurGame();
game.start();
