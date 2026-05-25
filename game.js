const tiles = document.querySelectorAll('.tile');

const popup = document.getElementById('popup');
const popupText = document.getElementById('popupText');
const turnText = document.getElementById('turnText');
const energyText = document.getElementById('energy');

let currentPlayer = 'X';

let board = [
  '', '', '',
  '', '', '',
  '', '', ''
];

let gameOver = false;

let energy = 5;

let activeAbility = null;


const wins = [

  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [1,4,7],
  [2,5,8],

  [0,4,8],
  [2,4,6]

];


tiles.forEach((tile, index) => {

  tile.addEventListener('click', () => {

    if(board[index] !== '' || gameOver) return;

    board[index] = currentPlayer;

    tile.textContent = currentPlayer;

    tile.classList.add(
      currentPlayer === 'X'
      ? 'player-x'
      : 'player-o'
    );

    checkWinner();

    checkDraw();

    switchTurn();

  });

});


function switchTurn() {

  currentPlayer =
    currentPlayer === 'X'
    ? 'O'
    : 'X';

  turnText.textContent =
    `Player ${currentPlayer} Turn`;

}


function checkWinner() {

  wins.forEach(combo => {

    const [a,b,c] = combo;

    if(
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {

      gameOver = true;

      popup.classList.add('active');

      popupText.textContent =
        `Player ${board[a]} Wins!`;

    }

  });

}


function checkDraw() {

  if(
    !board.includes('') &&
    !gameOver
  ) {

    gameOver = true;

    popup.classList.add('active');

    popupText.textContent =
      'Draw Match!';

  }

}


function resetGame() {

  board = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];

  gameOver = false;

  currentPlayer = 'X';

  turnText.textContent =
    'Player X Turn';

  popup.classList.remove('active');

  tiles.forEach(tile => {

    tile.textContent = '';

    tile.className = 'tile';

  });

}


function activateAbility(name) {

  if(energy <= 0) return;

  activeAbility = name;

  energy--;

  energyText.textContent = energy;

  alert(`${name.toUpperCase()} activated!`);

}