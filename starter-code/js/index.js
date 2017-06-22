var board = new Board();

$("document").ready(function(){
  console.log("document ready");

  var ballView = $("#ball");
  var ballModel = new Ball(
    (X_UPPER_LIMIT - X_LOWER_LIMIT)/2,
    (Y_UPPER_LIMIT - Y_LOWER_LIMIT)/2,
    null, null);

  ballModel.randomDirection();

  $('#start').on('click', function(){
    board.start();
    activatePaddle2();
    var game = setInterval(updateState, intervalTime);
    renderGame();
  });

  function updateState(){
  }

  $(document).on('keydown', function(e){
  });

  function activatePaddle2() {
  }

  function renderGame(){
  }

  function renderScore(){
  }

  function renderBall(){
    ballView.css("transform","translate( "
    + ballModel._posX + "px,"
    + ballModel._posY + "px)");
  }

  setInterval(function(){
    ballModel.move();
    renderBall();
  },TIME_DELTA);
});
