import Paddle from "/src/paddle.js";
import inputHandler from "/inputHandler.js";
import Ball from "/src/ball.js";
import { buildLevel, level1 } from "/src/levels.js";

export const gameMode = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gameMode = gameMode.MENU;
    this.paddle = undefined;
    this.ball = undefined;
    this.gameObjects = [];
    new inputHandler(this);

    this.lives = 3;
  }

  start() {
    if (this.gameMode === gameMode.MENU) {
      this.gameMode = gameMode.RUNNING;
      this.paddle = new Paddle(this);
      this.ball = new Ball(this);

      let bricks = buildLevel(this, level1);

      this.gameObjects = [this.ball, this.paddle, ...bricks];
    }
  }

  update(deltaTime) {
    if (
      this.gameMode === gameMode.PAUSED ||
      this.gameMode === gameMode.MENU ||
      this.gameMode === gameMode.GAMEOVER
    )
      return;
    if (this.lives <= 0) {
      this.gameMode = gameMode.GAMEOVER;
    }
    this.gameObjects.forEach(object => {
      object.update(deltaTime);
    });
    this.gameObjects = this.gameObjects.filter(obj => {
      return !obj.beenHit;
    });
  }

  draw(ctx) {
    if (
      this.gameMode === gameMode.RUNNING ||
      this.gameMode === gameMode.PAUSED
    ) {
      this.gameObjects.forEach(object => {
        object.draw(ctx);
      });
      ctx.font = "15px Voltaire,sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("LIVES REMAINING : " + this.lives, this.gameWidth - 95, 15);
    }

    if (this.gameMode === gameMode.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "32px Voltaire,sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameMode === gameMode.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "32px Voltaire,sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "PRESS ENTER TO START",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gameMode === gameMode.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "50px Voltaire,sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAMEOVER !!", this.gameWidth / 2, this.gameHeight / 2);
      ctx.font = "24px Voltaire,sans-serif";
      ctx.fillText(
        "PRESS ANY KEY TO GO TO MENU",
        this.gameWidth / 2,
        this.gameHeight / 2 + 70
      );
    }
  }

  togglePause() {
    if (this.gameMode === gameMode.MENU || this.gameMode === gameMode.GAMEOVER)
      return;
    if (this.gameMode === gameMode.PAUSED) this.gameMode = gameMode.RUNNING;
    else if (this.gameMode === gameMode.RUNNING)
      this.gameMode = gameMode.PAUSED;
  }

  stop() {
    this.gameMode = gameMode.MENU;
    this.lives = 3;
  }
}
