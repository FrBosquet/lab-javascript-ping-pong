function Board() {
  this.userPaddle = {
    pos : 0
  };
  this.compPaddle = {
    pos : 0
  }
  this.ball = {
    posX : 0,
    posy : 0
  }
}

Board.prototype.start = function(){
};

Board.prototype.checkGame = function(){
};

Board.prototype.stop = function(){
};

Board.prototype.restart = function(){
};

Board.prototype.gameOver = function(){
};
