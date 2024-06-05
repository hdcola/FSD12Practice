const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");

const scoreDisplay = document.querySelector("#score");
const restartBtn = document.querySelector("#restartBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const comboDisplay = document.querySelector("#comboText");
pauseBtn.disabled = true;
const img = document.getElementById("foodImage");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "azure";
let snakeHeadColor = "#4a04c9";
const snakeColor = "#53b096";
let snakeBorder = "#000000";
const foodColor = "#d44444";

const unitSize = 25;

let running = false;
let pausing = false;
let combo = false;

let score = 0;

let xVelocity = unitSize;
let yVelocity = 0;

let foodX;
let foodY;

let colorTimeOut;
let comboTimeOut;
let displayComboTimeOut;

let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

function startGame() {
  running = true;
  pausing = false;
  scoreDisplay.textContent = score;
  restartBtn.disabled = true;
  snakeHeadColor = "yellow";
  snakeBorder = "#000000";
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  } else if (!pausing) {
    displayGameOver();
  }
}

function clearBoard() {
  context.fillStyle = boardBackground;
  context.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}

function drawFood() {
  // context.fillStyle = foodColor;
  // context.fillRect(foodX, foodY, unitSize, unitSize);
  context.drawImage(img, foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    changeSnakeHeadColor();
    if (combo) {
      score += 2;
      if (displayComboTimeOut) {
        clearTimeout(displayComboTimeOut);
        comboDisplay.textContent = "";
      }
      comboDisplay.textContent = "COMBO!";
      displayComboTimeOut = setTimeout(() => {
        comboDisplay.textContent = "";
      }, 2000);
    } else {
      score += 1;
    }
    if (comboTimeOut) clearTimeout(comboTimeOut);
    combo = true;
    comboTimeOut = setTimeout(() => {
      combo = false;
    }, 2000);
    scoreDisplay.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
//when the snake eats the food, the head of the snake changes color
function changeSnakeHeadColor() {
  if (colorTimeOut) clearTimeout(colorTimeOut);
  snakeHeadColor = "red";
  snakeBorder = "black";

  colorTimeOut = setTimeout(() => {
    snakeHeadColor = "yellow";
    snakeBorder = "#000000";
  }, 2000);
}

function drawSnake() {
  context.strokeStyle = snakeBorder;
  snake.forEach((snakePart, index) => {
    //the head of the snake is in different color
    if (index === 0) {
      context.fillStyle = snakeHeadColor;
    } else {
      context.fillStyle = snakeColor;
    }
    context.fillRect(snake[index].x, snake[index].y, unitSize, unitSize);
    context.strokeRect(snake[index].x, snake[index].y, unitSize, unitSize);
  });
}
//listen for key press and change direction of the snake
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const goingUp = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize;
  const goingRight = xVelocity == unitSize;
  const goingLeft = xVelocity == -unitSize;

  switch (true) {
    case keyPressed == LEFT && !goingRight && !goingLeft:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDown && !goingUp:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPressed == RIGHT && !goingLeft && !goingRight:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == DOWN && !goingUp && !goingDown:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}

function checkGameOver() {
  //hit the walls
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  // if the head of the snake goes into its body
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}

function displayGameOver() {
  running = false;
  context.font = "3rem Sans";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
  restartBtn.innerHTML = "Restart Game";
  //call the checkHighScore function and renew the high score
  checkHighScore();
  restartBtn.disabled = false;
  pauseBtn.disabled = true;
}
//initialize the canvas and start the game
function restartGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  //load the renewed high score
  loadHighScore();
  startGame();
  pauseBtn.disabled = false;
}
// pause the game
function pauseGame() {
  pausing = !pausing;
  running = !running;
  pauseBtn.innerHTML = pausing ? "Resume" : "Pause";
  //when resuming the game, call the nextTick function
  if (!pausing && running) {
    nextTick();
  }
}
// load high score from local storage
function loadHighScore() {
  let highScore = localStorage.getItem("highScore");
  if (highScore == null) {
    highScore = 0;
  }
  document.querySelector("#hiScore").textContent = highScore;
}
// check if current score is higher than high score
function checkHighScore() {
  let highScore = localStorage.getItem("highScore");
  if (highScore == null) {
    highScore = 0;
  }
  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }
}
//binding the event listeners to the buttons and keydown
window.addEventListener("load", loadHighScore);

restartBtn.addEventListener("click", restartGame);

pauseBtn.addEventListener("click", pauseGame);

window.addEventListener("keydown", changeDirection);
