var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var currentMove = 0;
var gameActive = true;
var historyInformation = Array(9).fill(null);

var winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (var i = 0; i < winningConditions.length; i++) {
    var [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function handleCellClick() {
  var index = $(this).data("index");
  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  for (let i = index + 1; i < board.length; i++) {
    board[i] = "";
  }
  $(this).text(currentPlayer).addClass("disabled");
  currentMove++;
  historyInformation[currentMove] = board.slice();

  renderInformation();

  if (checkWinner()) {
    $("#message").text("Player " + currentPlayer + " wins!");
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    $("#message").text("Game ends in a draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  $("#message").text("Next Player: " + currentPlayer);
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  currentMove = 0;
  gameActive = true;
  historyInformation = Array(9).fill(null);
  historyInformation[0] = board.slice();
  $(".cell").text("").removeClass("disabled");
  $("#message").text("Next Player: " + currentPlayer);
  renderInformation();
}

function renderInformation() {
  $("#history").empty();
  for (let index = 0; index < historyInformation.length; index++) {
    let description;
    if (historyInformation[index] === null) {
      break;
    }
    if (index > 0) {
      description = "Go to move #" + index;
    } else {
      description = "Go to game start";
    }
    $("#history").append(
      "<li><button class='btn btn-sm m-1' data-index='" +
        index +
        "'>" +
        description +
        "</button></li>"
    );
    $("#history button").on("click", handleHistoryClick);
  }
}

function handleHistoryClick() {
  var index = $(this).data("index");
  board = historyInformation[index].slice();
  currentPlayer = index % 2 === 0 ? "X" : "O";
  currentMove = index;
  gameActive = true;
  $(".cell").each(function (index, cell) {
    $(cell).text(board[index] === "" ? "" : board[index]);
    $(cell).toggleClass("disabled", board[index] !== "");
    console.log(index, board[index]);
  });
  renderInformation();
}

$(document).ready(function () {
  for (let i = 0; i < 9; i++) {
    $("#board").append(
      "<div class='cell bg-gray-100 aspect-square flex items-center justify-center enabled:cursor-pointer text-2xl' data-index='" +
        i +
        "' ></div>"
    );
  }
  $(".cell").on("click", handleCellClick);
  resetGame();
});
