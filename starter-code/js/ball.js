function Ball(x,y, paddle1, paddle2) {
  this._posX = x;
  this._posY = y;
  this._vel = 0;
  this._velX = 0;
  this._velY = 0;
  this._usrPaddle = paddle1;
  this._cmpPaddle = paddle2;
  this.pointScoredBy = 0;

}

Ball.prototype.randomDirection = function() {
  var angle =  Math.random() * Math.PI * 2;
  this._velX = Math.cos(angle) ;
  this._velY = Math.sin(angle) ;
};

Ball.prototype.move = function(){
  this._posX += this._velX * (BALL_SPEED + this._vel) * TIME_DELTA;
  this._posY += this._velY *(BALL_SPEED + this._vel) *  TIME_DELTA;

  if(this._usrPaddle.hitBall(this) || this._cmpPaddle.hitBall(this)){
    this._vel += 1;
    this._velX *= -1;
  }if(this._posX >= X_UPPER_LIMIT - PIXEL_SIZE){
    this.pointScoredBy = 1;
  }else if(this._posX <= X_LOWER_LIMIT + PIXEL_SIZE){
    this.pointScoredBy = -1;
  }

  if(this._posY >= Y_UPPER_LIMIT - PIXEL_SIZE){
    this._posY = Y_UPPER_LIMIT - PIXEL_SIZE;
    this._velY *= -1;
  }else if(this._posY <= Y_LOWER_LIMIT + PIXEL_SIZE){
    this._posY = Y_LOWER_LIMIT + PIXEL_SIZE;
    this._velY *= -1;
  }
};

Ball.prototype.restart = function(){
  this._posX = 0;
  this._posY = 0;
  this._vel = 0;
  this.pointScoredBy = 0;
  this.randomDirection();
};
