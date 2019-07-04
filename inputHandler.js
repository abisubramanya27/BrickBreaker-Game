import { gameMode } from "/src/game.js";

export default class inputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37: {
          if (game.gameMode === gameMode.RUNNING) game.paddle.moveLeft();
          else if (game.gameMode === gameMode.GAMEOVER) game.stop();
          break;
        }
        case 39: {
          if (game.gameMode === gameMode.RUNNING) game.paddle.moveRight();
          else if (game.gameMode === gameMode.GAMEOVER) game.stop();
          break;
        }
        case 32: {
          if (game.gameMode !== gameMode.GAMEOVER) game.togglePause();
          else game.stop();
          break;
        }
        case 13: {
          if (game.gameMode === gameMode.MENU) game.start();
          else if (game.gameMode === gameMode.GAMEOVER) game.stop();
          break;
        }
        case 27: {
          game.stop();
          break;
        }
        default: {
          game.stop();
          break;
        }
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37: {
          if (game.paddle.speed < 0) game.paddle.stop();
          break;
        }
        case 39: {
          if (game.paddle.speed > 0) game.paddle.stop();
          break;
        }
        default:
          break;
      }
    });
  }
}
