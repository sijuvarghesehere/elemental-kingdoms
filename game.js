const tiles =
document.querySelectorAll('.tile');

const popup =
document.getElementById('popup');

const popupText =
document.getElementById('popupText');

const turnText =
document.getElementById('turnText');

const energyText =
document.getElementById('energy');

const heroSelect =
document.getElementById('heroSelect');

const selectedHero =
document.getElementById('selectedHero');

const abilityTitle =
document.getElementById('abilityTitle');

const abilityDescription =
document.getElementById('abilityDescription');


let currentPlayer = 'X';

let board = [
  '', '', '',
  '', '', '',
  '', '', ''
];

let gameOver = false;

let energy = 5;

let activeAbility = null;

let hero = null;


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



/* HERO SELECT */

function selectHero(name){

  hero = name;

  selectedHero.textContent = name;

  heroSelect.classList.remove('active');


  if(name === 'Arc Guardian'){

    abilityTitle.textContent =
      'Divine Shield';

    abilityDescription.textContent =
      'Protect one tile from enemy abilities.';
  }

  if(name === 'Ember Sentinel'){

    abilityTitle.textContent =
      'Flame Burst';

    abilityDescription.textContent =
      'Destroy enemy marks strategically.';
  }

  if(name === 'Nexus Wraith'){

    abilityTitle.textContent =
      'Corrupt';

    abilityDescription.textContent =
      'Block tiles temporarily.';
  }

  if(name === 'Frost Monarch'){

    abilityTitle.textContent =
      'Freeze';

    abilityDescription.textContent =
      'Freeze tiles for one turn.';
  }

}



/* TILE CLICK */

tiles.forEach((tile,index)=>{

  tile.addEventListener('click',()=>{

    if(
      board[index] !== ''
      || gameOver
    ) return;


    /* ABILITY MODE */

    if(activeAbility){

      useAbility(tile,index);

      return;
    }


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



/* TURN */

function switchTurn(){

  currentPlayer =

    currentPlayer === 'X'
    ? 'O'
    : 'X';

  turnText.textContent =
    `Player ${currentPlayer} Turn`;

}



/* WIN */

function checkWinner(){

  wins.forEach(combo=>{

    const[a,b,c] = combo;

    if(

      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]

    ){

      gameOver = true;

      popup.classList.add('active');

      popupText.textContent =
        `Player ${board[a]} Wins!`;

    }

  });

}



/* DRAW */

function checkDraw(){

  if(

    !board.includes('')
    && !gameOver

  ){

    gameOver = true;

    popup.classList.add('active');

    popupText.textContent =
      'Draw Match!';

  }

}



/* RESET */

function resetGame(){

  board = [

    '', '', '',
    '', '', '',
    '', '', ''

  ];

  gameOver = false;

  currentPlayer = 'X';

  activeAbility = null;

  energy = 5;

  energyText.textContent = energy;

  popup.classList.remove('active');

  turnText.textContent =
    'Player X Turn';

  tiles.forEach(tile=>{

    tile.textContent = '';

    tile.className = 'tile';

    tile.style.background = '';

  });

}



/* ACTIVATE */

function activateAbility(name){

  if(energy <= 0) return;

  activeAbility = name;

  alert(
    `${name.toUpperCase()} activated.\nSelect a tile.`
  );

}



/* USE ABILITY */

function useAbility(tile,index){

  if(activeAbility === 'shield'){

    tile.style.background =
      '#3d7dff';

  }

  if(activeAbility === 'freeze'){

    tile.style.background =
      '#8de7ff';

  }

  if(activeAbility === 'fire'){

    tile.textContent = '';

    board[index] = '';

  }

  if(activeAbility === 'teleport'){

    tile.style.background =
      '#65ff8f';

  }

  energy--;

  energyText.textContent = energy;

  activeAbility = null;

}
