var board = new Board();

$(document).ready(function(){
  //Views
  var boardView   = $("#board");
  var netView     = $("#net");
  var ballView    = $("#ball");
  var paddle1View = $("#paddle1");
  var paddle2View = $("#paddle2");

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

  //Models
  var paddle1Model = new Paddle(
    X_LOWER_LIMIT + PADDLE_MARGIN,
    (Y_UPPER_LIMIT - Y_LOWER_LIMIT)/2
  )
  var paddle2Model = new Paddle(
    X_UPPER_LIMIT - PADDLE_MARGIN,
    (Y_UPPER_LIMIT - Y_LOWER_LIMIT)/2
  )
  var ballModel = new Ball(
    (X_UPPER_LIMIT - X_LOWER_LIMIT)/2,
    (Y_UPPER_LIMIT - Y_LOWER_LIMIT)/2,
    paddle1Model, paddle2Model);

  ballModel.randomDirection();

  //Functions
  function updateState(){
  }

  $(document).on('keydown', function(e){
    switch (e.keyCode) {
      case 38:
        paddle2Model.moveUp();
        break;
      case 40:
        paddle2Model.moveDown();
        break;
    }
  });

  function activatePaddle2() {
  }

  function renderGame(){
    renderBall(ballModel, ballView);
    renderPaddle(paddle1Model, paddle1View);
    renderPaddle(paddle2Model, paddle2View);
  }

  function renderPaddle( model, view ){
    view.css("transform", "translate("
    + model._posX + "px, "
    + model._posY + "px)");
  }

  function renderScore(){
  }

  function renderBall( model, view ){
    view.css("transform","translate( "
    + model._posX + "px,"
    + model._posY + "px)");
  }

  //Listener
  $('#start').on('click', function(){
    board.start();
    activatePaddle2();
    var game = setInterval(updateState, intervalTime);
    renderGame();
  });

  setInterval(function(){
    ballModel.move();
    renderGame();
  },TIME_DELTA);
});
