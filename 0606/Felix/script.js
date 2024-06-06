let currentPlayer = 'X'; // Player X always starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 game board 
let gameOrder = [];
let gameActive = true;

function saveToLocalStorage(key, array) {
  // 将二维数组转换为 JSON 字符串
  const arrayString = JSON.stringify(array);
  // 使用提供的键将字符串保存到 Local Storage
  localStorage.setItem(key, arrayString);
  console.log(`Saved to Local Storage: ${key} => ${arrayString}`);
}

function loadFromLocalStorage() {
  // 从 Local Storage 获取数据
  var allItems = getAllLocalStorageItems(); 
  if (Object.keys(allItems).length === 0) {
    return [];
  } 
  // 将键值对按照键名排序
  else { let keys = Object.keys(allItems);
  keys.sort();
  console.log(keys);
  console.log(allItems);
  
  // 如果只有一个键值对，返回该值
  if (Object.keys(allItems).length === 1) {
    return JSON.parse(Object.values(allItems)[0]);
  }
  // 如果有多个键值对，返回最后两个
  else {     
    var lastKey = keys[keys.length - 1];
    var secondLastKey = keys[keys.length - 2];
    var lastItem = JSON.parse(allItems[lastKey]);
    var secondLastItem = JSON.parse(allItems[secondLastKey]);
    return [lastItem, secondLastItem];
  }
}
}

function getAllLocalStorageItems() {
  let items = {}; // 创建一个空对象来存储键值对
  for (let i = 0; i < localStorage.length; i++) {
    // 获取每个键
    let key = localStorage.key(i);
    // 获取键对应的值
    let value = localStorage.getItem(key);
    // 将键值对添加到对象中
    items[key] = value;
  }
  return items;
}

function handlePlayerTurn(clickedCellIndex) {
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
  updateGameOrder(clickedCellIndex);
  gameBoard[clickedCellIndex] = currentPlayer;
  checkForWinOrDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function cellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
  handlePlayerTurn(clickedCellIndex);
  updateUI();  
}

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked, false);
});

function updateUI() {
  for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = gameBoard[i];
  }
}

function updateGameOrder(clickedCellIndex) {
  gameOrder.push(clickedCellIndex);
}


function announceWinner(player) {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = `Player ${player} Wins!`;
  const timestamp = new Date().getTime();
  var timestampStr = timestamp.toString();
  saveToLocalStorage(timestampStr, gameOrder);
}

function announceDraw() {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = 'Game Draw!';
  // const timestamp = new Date().getTime();
  // var timestampStr = timestamp.toString();
  // saveToLocalStorage(timestampStr, gameOrder);
}

const winConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Left-to-right diagonal
  [2, 4, 6]  // Right-to-left diagonal
];

function checkForWinOrDraw() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          roundWon = true;
          break;
      }
  }

  if (roundWon) {
      announceWinner(currentPlayer);
      gameActive = false;
      return;
  }

  let roundDraw = !gameBoard.includes('');
  if (roundDraw) {
      announceDraw();
      gameActive = false;
      return;
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
      cell.innerText = '';
  });
  document.getElementById('gameMessage').innerText = '';
  gameOrder = [];
  location.reload();
}

window.onload = function() {
  //先排个序
  sortLocalStorage();
  // 从 Local Storage 加载游戏数据
  let gameOrder = loadFromLocalStorage();
  // console.log(gameOrder);
};

function sortLocalStorage() {
  // 获取所有的键值对
  let allItems = getAllLocalStorageItems();
  // 将键值对按照键名排序
  let keys = Object.keys(allItems);
  for (let i = 0; i < keys.length; i++) {
    keys[i] = parseInt(keys[i]);
  }
  keys.sort();
  for (let i = 0; i < keys.length; i++) {
    keys[i] = keys[i].toString();
  }
  
  // 创建一个新对象来存储排序后的键值对
  let sortedItems = {};
  // 将排序后的键值对添加到新对象中
  keys.forEach(key => {
    sortedItems[key] = allItems[key];
  });
  // 清空 Local Storage
  localStorage.clear();
  // 将排序后的键值对添加到 Local Storage
  for (let key in sortedItems) {
    localStorage.setItem(key, sortedItems[key]);
  }  
}

function dispalyHistoricalOrder(interfaceGameOrder) {
  const hcells = document.querySelectorAll('.hcell');
  let temp = [];
  for (let i = 0; i < interfaceGameOrder.length; i++) {
    if( i % 2 === 0){
      hcells[interfaceGameOrder[i]].className = "hcell x-img";
      hcells[interfaceGameOrder[i]].innerText = i+1-temp.length;
      temp.push(i);
    }
    else{
      hcells[interfaceGameOrder[i]].className = "hcell o-img";      
      hcells[interfaceGameOrder[i]].innerText = i+1-temp.length;      
    }
}
}


const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);
