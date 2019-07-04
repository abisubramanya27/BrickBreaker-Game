import Ball from "/src/ball.js";

export function detectCollision(ball, gameObj) {
  //Bouncing from gameObject
  let bottomOfBall = ball.position.y + ball.size;
  let topOfObj = gameObj.position.y;
  let leftOfObj = gameObj.position.x;
  let rightOfObj = gameObj.position.x + gameObj.width;
  let rightOfBall = ball.position.x + ball.size;
  let leftOfBall = ball.position.x;
  let topOfBall = ball.position.y;
  let bottomOfObj = gameObj.position.y + gameObj.height;

  if (
    leftOfBall < rightOfObj &&
    rightOfBall > leftOfObj &&
    topOfBall <= bottomOfObj &&
    bottomOfBall >= topOfObj
  ) {
    return true;
  } else {
    return false;
  }
}
