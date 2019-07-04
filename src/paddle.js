export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 150;
    this.height = 20;

    this.maxSpeed = 7;
    this.speed = 0;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#00ffff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x <= 0) this.position.x = 0;
    else if (this.position.x >= this.gameWidth - this.width)
      this.position.x = this.gameWidth - this.width;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }
}