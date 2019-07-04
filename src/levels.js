import Brick from "/src/brick.js";
import Game from "/src/game.js";

export function buildLevel(game, level1) {
  let bricks = [];
  level1.forEach((row, rowIndex) => {
    row.forEach((element, elementIndex) => {
      if (element !== 0) {
        let position = {
          x: elementIndex * 80,
          y: 30 + rowIndex * 24
        };
        bricks.push(new Brick(game, position));
      }
    });
  });
  return bricks;
}

export const level1 = [];
for (var i = 0; i < 5; i++) {
  level1.push(
    [...new Array(10)].map(() => {
      return Math.round(Math.random());
    })
  );
}
