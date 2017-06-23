function Paddle(x) {
  this._posX = x;
  this._posY = 0;
}
Paddle.prototype.restart = function(){
  this._posY = (Y_UPPER_LIMIT - Y_LOWER_LIMIT)/2;
};

Paddle.prototype.hitBall = function(ball){
  var virtualX = ball._posX + (ball._velX > 0 ? 1 : -1) * PIXEL_SIZE;
  return (
    (virtualX >= this._posX - PADDLE_WIDTH/2) &&
    (virtualX <= this._posX + PADDLE_WIDTH/2) &&
    (ball._posY > this._posY)                   &&
    (ball._posY < this._posY  + PADDLE_HEIGHT )
  )
};

Paddle.prototype.moveUp = function(){
  if(this._posY > Y_LOWER_LIMIT) this._posY -= PADDLE_MOVE_SPEED;
}

Paddle.prototype.moveDown = function(){
  if(this._posY < Y_UPPER_LIMIT - PADDLE_HEIGHT) this._posY += PADDLE_MOVE_SPEED;
}
