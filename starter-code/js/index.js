var board = new Board();

$(document).ready(function(){

  ion.sound({
      sounds: [
          {name: "beer_can_opening"},
      ],

      // main config
      path: "ion.sound/sounds/",
      preload: true,
      multiplay: true,
      volume: 0.9
  });

  setInterval(function(){
      ion.sound.play("beer_can_opening");
  }, 500);

  //Views
  var boardView   = $("#board");
  var netView     = $("#net");
  var ballView    = $("#ball");
  var paddle1View = $("#paddle1");
  var paddle2View = $("#paddle2");
  var score1View  = $("#score1");
  var score2View  = $("#score2");
  var winPanel    = $("#win-panel");
  var winHeader   = $("#win-panel h1");

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

  var key = 0;
  var game = null;
  var board = new Board();


  //Functions
  function updateState(){
    //Computer move
    IA();
    //Player move
    switch (key) {
      case 38:
        board.userPaddle.moveUp();
        break;
      case 40:
        board.userPaddle.moveDown();
        break;
    }
    //Pint condition
    if(board.checkGame()){
      renderScore();
      board.restart();
    }
    //Win check
    if(board.checkWinner() != 0){
      winGame();
    }

    //Render
    renderGame();
  }

  $(document).on('keydown', function(e){key = e.keyCode;});
  $(document).on('keyup', function(e){key = 0;});

  $("#win-panel button").on('click', function(){
    board.start();
    renderScore();
    game = setInterval(updateState, TIME_DELTA);
    winPanel.toggleClass("hidden");
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

  function loadSounds () {
    ion.sound({
      sounds: [{name: "glass"}, {name: "light_bulb_breaking"}, {name: "tap"}, {name: "computer_error"}],

      path: "js/ion.sound/sounds/",
      preload: true,
      volume: 0.8
    });
  }

  function winGame(){
    clearInterval(game);
    winPanel.toggleClass("hidden");
    var winner = board.checkWinner();
    ion.sound.play("computer_error");
    winHeader.html(winner == 2 ? "Player wins!" : "Computer wins :(");
  }

  loadSounds();
  board.start();
  game = setInterval(updateState, TIME_DELTA);
});
