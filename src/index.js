import Game from "/src/game.js";

let canvas = document.getElementById("GameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let lastTime = 0;
var fnId = undefined;

function enterGame() {
  lastTime = 0;
  let game = new Game(GAME_WIDTH, GAME_HEIGHT);
  fnId = requestAnimationFrame(gameLoop);

  function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);
    fnId = requestAnimationFrame(gameLoop);
  }
}

let startButton = document.getElementById("startButton");
startButton.onclick = () => {
  startButton.disabled = true;
  exitButton.disabled = false;
  enterGame();
};

let exitButton = document.getElementById("exitButton");
exitButton.onclick = () => {
  startButton.disabled = false;
  exitButton.disabled = true;
  cancelAnimationFrame(fnId);
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
};
