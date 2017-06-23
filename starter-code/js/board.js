function Board() {
  this.userPaddle = null;
  this.compPaddle = null;
  this.ball = null;
  this.userPoints = 0;
  this.compPoints = 0;
}

Board.prototype.start = function(){
  this.userPaddle = new Paddle(
    X_UPPER_LIMIT - PADDLE_MARGIN
  );

  this.compPaddle = new Paddle(
    X_LOWER_LIMIT + PADDLE_MARGIN
  );
  this.userPoints = 0;
  this.compPoints = 0;
  this.restart();
};

Board.prototype.checkGame = function(){
  this.ball.move();
  var changeState = true;

  if(this.ball.pointScoredBy > 0){
    this.userPoints ++;

  }else if(this.ball.pointScoredBy < 0){
    this.compPoints ++;
  }else{
    changeState = false;
    this.userPoints.pointsScoredBy = 0;
  }
  return changeState;
};

Board.prototype.checkWinner = function(){
  if(this.userPoints == POINT_LIMIT) return 1;
  if(this.compPoints == POINT_LIMIT) return 2;
  return 0;
}

Board.prototype.restart = function(){
  this.userPaddle.restart();
  this.compPaddle.restart();

  this.ball = new Ball(
    (X_UPPER_LIMIT - X_LOWER_LIMIT)/2,
    (Y_UPPER_LIMIT - Y_LOWER_LIMIT)/2,
    this.userPaddle, this.compPaddle);
  this.ball.randomDirection();
};
