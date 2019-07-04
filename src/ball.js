import { detectCollision } from "/src/detectCollision.js";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("imgBall");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.reset();

    this.size = 16;
  }

  reset() {
    this.position = { x: 10, y: 400 };
    this.speed = { x: 4, y: -2 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //Bouncing off lefg and right walls
    if (this.position.x + this.size >= this.gameWidth || this.position.x <= 0) {
      this.speed.x = -this.speed.x;
    }

    //Bouncing off top wall
    if (this.position.y <= 0) {
      this.speed.y = -this.speed.y;
    }

    //Bouncing from Paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      //this.speed.x += this.speed.x > 0 ? 1 : -1;
      this.position.y = this.game.paddle.position.y - this.size;
    }

    //Ball falling to bottom floor
    if (this.position.y + this.size >= this.gameHeight) {
      this.game.lives--;
      this.reset();
    }
  }
}
