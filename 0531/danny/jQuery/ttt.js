var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameActive = true;

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
  $(this).text(currentPlayer).addClass("disabled");

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

function renderInformation() {}

$(document).ready(function () {
  for (let i = 0; i < 9; i++) {
    $("#board").append(
      "<div class='cell bg-gray-100 aspect-square flex items-center justify-center cursor-pointer text-2xl disabled:bg-gray-200 disabled:cursor-not-allowed' data-index='" +
        i +
        "' ></div>"
    );
  }
  $(".cell").on("click", handleCellClick);
  $("#message").text("Next Player: " + currentPlayer);
});
