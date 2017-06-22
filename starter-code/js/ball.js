function Ball(x,y, paddle1, paddle2) {
  this._posX = x;
  this._posY = y;
  this._velX = 0;
  this._velY = 0;
  this._usrPaddle = paddle1;
  this._cmpPaddle = paddle2;
}

Ball.prototype.randomDirection = function() {
  var angle =  Math.random() * Math.PI * 2;
  this._velX = Math.cos(angle) * BALL_SPEED;
  this._velY = Math.sin(angle) * BALL_SPEED;
};

Ball.prototype.move = function(){
  this._posX += this._velX * TIME_DELTA;
  this._posY += this._velY * TIME_DELTA;

  console.log(this._posX, this._posY);

  if(this._posX >= X_UPPER_LIMIT){
    this._posX = X_UPPER_LIMIT;
    this._velX *= -1;
  }else if(this._posX <= X_LOWER_LIMIT){
    this._posX = X_LOWER_LIMIT;
    this._velX *= -1;
  }

  if(this._posY >= Y_UPPER_LIMIT){
    this._posY = Y_UPPER_LIMIT;
    this._velY *= -1;
  }else if(this._posY <= Y_LOWER_LIMIT){
    this._posY = Y_LOWER_LIMIT;
    this._velY *= -1;
  }
};

Ball.prototype.pointScored = function(){
};

// returns winner paddle or false
Ball.prototype.winner = function(){
};

Ball.prototype.restart = function(){
};
