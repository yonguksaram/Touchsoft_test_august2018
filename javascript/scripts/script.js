{
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < 20; j++) {
    var newRow = document.createElement('div');
    newRow.className = "row";
    for (var k = 0; k < 20; k++) {
      var newColumn = document.createElement('div');
      newColumn.className = "column";
      newRow.appendChild(newColumn);
    }
    fragment.appendChild(newRow);
  }
  document.getElementsByClassName("snakeBody")[0].appendChild(fragment)
};



var snake = [[1, 1, ""], [1, 1, ""], [1, 1, ""]];
var direction = "";
var currentDirection = ""
var lastCell = [1, 1, ""];
var apple = [1, 1];
var snakeHeadMoveState = "normal";
var resetStatus = false;
var score = 0;

addEventListener("keydown", function (event) {
  if (event.keyCode == 37 && currentDirection != "right") {
    direction = "left"
  } else if (event.keyCode == 38 && currentDirection != "down") {
    direction = "up"
  } else if (event.keyCode == 39 && currentDirection != "left") {
    direction = "right"
  } else if (event.keyCode == 40 && currentDirection != "up") {
    direction = "down"
  }
});


function startGame() {
  clearField();
  document.getElementsByClassName("startButton")[0].value = "Reset";
  document.getElementsByClassName("startButton")[0].onclick=function(){ resetGame(); } ;
  resetParameters();
  drawSnake(snake);
  setTimeout(createSnake, 500);
}

function resetGame(){
  resetStatus = true;
  clearField();
  resetParameters();
  document.getElementsByClassName("startButton")[0].value = "Start";
  document.getElementsByClassName("startButton")[0].onclick=function(){ startGame(); } ;
}

function primalSnakeCreation() {
  var snakeTail = Math.ceil(Math.random() * 400);
  var snakeDirection = Math.ceil(Math.random() * 4);
  if (checkPrimalSnakeDirection(snakeTail, snakeDirection)) {
    var column = snakeTail % 20;
    snakeTail % 20 == 0 ? column = 20 : column = snakeTail % 20;
    if (snakeDirection == 1) {
      direction = "right";
      currentDirection = "right";
      snake = [[Math.ceil(snakeTail / 20), (column + 2), "right"], [Math.ceil(snakeTail / 20), (column + 1), "right"], [Math.ceil(snakeTail / 20), (column), "right"]];
    } else if (snakeDirection == 2) {

      direction = "left";
      currentDirection = "left";
      snake = [[Math.ceil(snakeTail / 20), (column - 2), "left"], [Math.ceil(snakeTail / 20), (column - 1), "left"], [Math.ceil(snakeTail / 20), (column), "left"]];
    } else if (snakeDirection == 3) {

      direction = "up";
      currentDirection = "up";
      snake = [[Math.ceil(snakeTail / 20 - 2), (column), "up"], [Math.ceil(snakeTail / 20 - 1), (column), "up"], [Math.ceil(snakeTail / 20), (column), "up"]];
    } else if (snakeDirection == 4) {

      direction = "down";
      currentDirection = "down";
      snake = [[Math.ceil(snakeTail / 20 + 2), (column), "down"], [Math.ceil(snakeTail / 20 + 1), (column), "down"], [Math.ceil(snakeTail / 20), (column), "down"]];
    }
  } else {
    primalSnakeCreation();
  }
}

function checkPrimalSnakeDirection(a, b) {
  var n = a % 20;
  a % 20 == 0 ? n = 20 : n = n;
  if (b == 1) {
    return n + 2 < 20 ? true : false;
  } else if (b == 2) {
    return n - 2 > 1 ? true : false;
  } else if (b == 3) {
    return Math.ceil(a / 20) - 2 > 1 ? true : false;
  } else if (b == 4) {
    return Math.ceil(a / 20) + 2 < 20 ? true : false;
  }
}

function createApple() {
  var row = Math.ceil(Math.random() * 20);
  var column = Math.ceil(Math.random() * 20);
  for (var i = 0; i < snake.length; i++) {
    if (snake[i][0] == row && snake[i][1] == column) {
      createApple();
      return;
    }
  }
  apple = [row, column];
}



function createSnake() {
  if (resetStatus == true){
    resetStatus = false;
    return
  }
  var snakeHeadMove = checkDirection();
  currentDirection = direction;
  checkSnakeHeadMove(snakeHeadMove);
  if (snakeHeadMoveState == "normal") {
    snake.unshift(snakeHeadMove);
    lastCell = snake.pop();
  } else if (snakeHeadMoveState == "eating") {
    snake.unshift(snakeHeadMove);
    snakeHeadMoveState = "normal"
    createApple();
  } else if (snakeHeadMoveState == "game over") {
    gameOver();
    return
  }
  drawSnake(snake);

  setTimeout(createSnake, 500);
}


function checkDirection() {
  if (direction == "right") {
    return [snake[0][0], (snake[0][1] + 1), "right"];
  } else if (direction == "left") {
    return [snake[0][0], (snake[0][1] - 1), "left"];
  } else if (direction == "up") {
    return [(snake[0][0] - 1), snake[0][1], "up"];
  } else if (direction == "down") {
    return [(snake[0][0] + 1), snake[0][1], "down"];
  }
}

function checkSnakeHeadMove(arr) {
  for (var j = 2; j < snake.length; j++) {
    if (arr[0] == snake[j][0] && arr[1] == snake[j][1]) {
      snakeHeadMoveState = "game over";
      return;
    }
  }
  if (arr[0] < 1 || arr[0] > 20 || arr[1] < 1 || arr[1] > 20) {
    snakeHeadMoveState = "game over";
    return;
  }
  if (arr[0] == apple[0] && arr[1] == apple[1]) {
    score++;
    document.getElementsByClassName("score")[0].innerHTML = score;
    snakeHeadMoveState = "eating";
  }
}



function drawSnake(arr) {
  document.querySelectorAll('.snakeBody > div:nth-child(' + apple[0] + ') > div:nth-child(' + apple[1] + ')')[0].style.backgroundColor = "green";
  document.querySelectorAll('.snakeBody > div:nth-child(' + arr[0][0] + ') > div:nth-child(' + arr[0][1] + ')')[0].style.backgroundColor = "red";
  for (var i = 1; i < arr.length; i++) {
    document.querySelectorAll('.snakeBody > div:nth-child(' + arr[i][0] + ') > div:nth-child(' + arr[i][1] + ')')[0].style.backgroundColor = "grey";
    switch (arr[i][2]){
      case "up":
      document.querySelectorAll('.snakeBody > div:nth-child(' + arr[i][0] + ') > div:nth-child(' + arr[i][1] + ')')[0].innerHTML = "▲";
      break
      case "down":
      document.querySelectorAll('.snakeBody > div:nth-child(' + arr[i][0] + ') > div:nth-child(' + arr[i][1] + ')')[0].innerHTML = "▼";
      break
      case "right":
      document.querySelectorAll('.snakeBody > div:nth-child(' + arr[i][0] + ') > div:nth-child(' + arr[i][1] + ')')[0].innerHTML = "►";
      break
      case "left":
      document.querySelectorAll('.snakeBody > div:nth-child(' + arr[i][0] + ') > div:nth-child(' + arr[i][1] + ')')[0].innerHTML = "◄";
      break
    }
  }
  document.querySelectorAll('.snakeBody > div:nth-child(' + lastCell[0] + ') > div:nth-child(' + lastCell[1] + ')')[0].style.backgroundColor = "white";
  document.querySelectorAll('.snakeBody > div:nth-child(' + lastCell[0] + ') > div:nth-child(' + lastCell[1] + ')')[0].innerHTML = "";
}





function clearField() {
  for (var i = 0; i < snake.length; i++) {
    document.querySelectorAll('.snakeBody > div:nth-child(' + snake[i][0] + ') > div:nth-child(' + snake[i][1] + ')')[0].style.backgroundColor = "white";
    document.querySelectorAll('.snakeBody > div:nth-child(' + snake[i][0] + ') > div:nth-child(' + snake[i][1] + ')')[0].innerHTML = "";
  }
  document.querySelectorAll('.snakeBody > div:nth-child(' + apple[0] + ') > div:nth-child(' + apple[1] + ')')[0].style.backgroundColor = "white";

}

function resetParameters() {
  primalSnakeCreation();
  createApple();
  snakeHeadMoveState = "normal"
  lastCell = [1, 1, ""];
  score = 0;
  document.getElementsByClassName("score")[0].innerHTML = 0;
}

function gameOver() {
  document.querySelectorAll('.wasted')[0].classList.add("wastedTransform");
  clearField();
  resetStatus = false;
  document.getElementsByClassName("startButton")[0].value = "Start";
  document.getElementsByClassName("startButton")[0].onclick=function(){ startGame(); } ;
}

function hideGameOver() {
  document.querySelectorAll('.wasted')[0].classList.remove("wastedTransform");
}