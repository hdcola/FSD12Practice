$(document).ready(function () {
  let currentPlayer = "X";
  let gameActive = true;
  const board = $("#board");
  const restartButton = $("#restartButton");

  function initializeBoard() {
    board.empty();
    for (let i = 0; i < 9; i++) {
      const cell = $("<div></div>").addClass("bg-white inset-shadow");
      cell.attr("id", "cell" + i);
      board.append(cell);
    }
    $(".inset-shadow").click(handleCellClick);
    gameActive = true;
  }

  function checkForWin() {
    const cells = $(".inset-shadow")
      .map(function () {
        return $(this).text();
      })
      .get();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      if (
        cells[condition[0]] !== "" &&
        cells[condition[0]] === cells[condition[1]] &&
        cells[condition[0]] === cells[condition[2]]
      ) {
        return cells[condition[0]];
      }
    }
    if (!cells.includes("")) return "Tie";
    return false;
  }

  function handleCellClick() {
    if ($(this).text() === "" && gameActive) {
      $(this).text(currentPlayer);
      let result = checkForWin();
      if (result) {
        gameActive = false;
        setTimeout(function () {
          alert(result === "Tie" ? "平局！" : result + " 赢了！");
          restartButton.show();
        }, 100);
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  restartButton.click(function () {
    initializeBoard();
    $(this).hide();
  });

  initializeBoard();
});
