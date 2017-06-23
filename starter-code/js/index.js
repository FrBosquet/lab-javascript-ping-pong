var board = new Board();

$(document).ready(function(){
  //Views
  var boardView   = $("#board");
  var netView     = $("#net");
  var ballView    = $("#ball");
  var paddle1View = $("#paddle1");
  var paddle2View = $("#paddle2");
  var score1View  = $("#score1");
  var score2View  = $("#score2");

  //Congifure views
  boardView.css({
    "width"     : (X_UPPER_LIMIT - X_LOWER_LIMIT)                         + "px",
    "height"    : (Y_UPPER_LIMIT - Y_LOWER_LIMIT)                         + "px"
  });
  netView.css({
    "height"    : (Y_UPPER_LIMIT - Y_LOWER_LIMIT)                         + "px",
    "transform" : "translateX(" + ((X_UPPER_LIMIT - X_LOWER_LIMIT) / 2)   + "px)"
  })
  paddle1View.css({
    "width"     : (PADDLE_WIDTH)  + "px",
    "height"    : (PADDLE_HEIGHT) + "px",
  });
  paddle2View.css({
    "width"     : (PADDLE_WIDTH)  + "px",
    "height"    : (PADDLE_HEIGHT) + "px"
  });

  var game = null;
  var board = new Board();

  //Functions
  function updateState(){
    IA();
    if(board.checkGame()){
      renderScore();
      board.restart();
    }
    renderGame();
  }

  $(document).on('keydown', function(e){
    switch (e.keyCode) {
      case 38:
        board.userPaddle.moveUp();
        break;
      case 40:
        board.userPaddle.moveDown();
        break;
    }
  });

  function IA() {
    if(board.ball._posY < board.compPaddle._posY){
      board.compPaddle.moveUp();
    }else if(board.ball._posY > board.compPaddle._posY){
      board.compPaddle.moveDown();
    }
  }

  function renderGame(){
    renderBall(board.ball, ballView);
    renderPaddle(board.userPaddle, paddle1View);
    renderPaddle(board.compPaddle, paddle2View);
  }

  function renderPaddle( model, view ){
    view.css("transform", "translate("
    + model._posX + "px, "
    + model._posY + "px)");
  }

  function renderScore(){
    score1View.html(board.userPoints);
    score2View.html(board.compPoints);
  }

  function renderBall( model, view ){
    view.css("transform","translate( "
    + model._posX + "px,"
    + model._posY + "px)");
  }

  function winGame(){
    
  }

  board.start();
  game = setInterval(updateState, TIME_DELTA);
});
