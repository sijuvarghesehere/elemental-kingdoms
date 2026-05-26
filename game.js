const tiles =
document.querySelectorAll('.tile');

const popup =
document.getElementById('popup');

const popupText =
document.getElementById('popupText');

const heroSelect =
document.getElementById('heroSelect');

const selectedHero =
document.getElementById('selectedHero');

const heroPortrait =
document.getElementById('heroPortrait');

const playerHero =
document.getElementById('playerHero');

const heroName =
document.getElementById('heroName');

const abilityTitle =
document.getElementById('abilityTitle');

const abilityDescription =
document.getElementById('abilityDescription');

const energyFill =
document.getElementById('energyFill');

const energyText =
document.getElementById('energyText');

const timer =
document.getElementById('timer');


let currentPlayer = 'X';

let board = [
  '', '', '',
  '', '', '',
  '', '', ''
];

let gameOver = false;

let hero = null;

let activeAbility = null;

let energy = 5;

let maxEnergy = 10;

let timerCount = 18;



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



/* TIMER */

setInterval(()=>{

  if(gameOver) return;

  timerCount--;

  if(timerCount <= 0){

    timerCount = 18;

    switchTurn();

  }

  updateTimer();

},1000);



function updateTimer(){

  let seconds =
    timerCount < 10
    ? '0' + timerCount
    : timerCount;

  timer.textContent =
    `00:${seconds}`;

}



/* HERO SELECT */

function selectHero(name){

  hero = name;

  selectedHero.textContent = name;

  heroSelect.classList.remove('active');



  if(name === 'Arc Guardian'){

    heroPortrait.src =
      'arc-guardian.png';

    playerHero.src =
      'arc-guardian.png';

    heroName.textContent =
      'ARC GUARDIAN';

    abilityTitle.textContent =
      'Divine Shield';

    abilityDescription.textContent =
      'Protect one tile from enemy abilities.';
  }



  if(name === 'Ember Sentinel'){

    heroPortrait.src =
      'ember-sentinel.png';

    playerHero.src =
      'ember-sentinel.png';

    heroName.textContent =
      'EMBER SENTINEL';

    abilityTitle.textContent =
      'Flame Burst';

    abilityDescription.textContent =
      'Destroy enemy marks strategically.';
  }



  if(name === 'Nexus Wraith'){

    heroPortrait.src =
      'nexus-wraith.png';

    playerHero.src =
      'nexus-wraith.png';

    heroName.textContent =
      'NEXUS WRAITH';

    abilityTitle.textContent =
      'Corrupt';

    abilityDescription.textContent =
      'Corrupt and block strategic tiles.';
  }



  if(name === 'Frost Monarch'){

    heroPortrait.src =
      'frost-monarch.png';

    playerHero.src =
      'frost-monarch.png';

    heroName.textContent =
      'FROST MONARCH';

    abilityTitle.textContent =
      'Freeze';

    abilityDescription.textContent =
      'Freeze tiles for one turn.';
  }

}



/* TILE CLICK */

tiles.forEach((tile,index)=>{

  tile.addEventListener('click',()=>{

    if(gameOver) return;

    if(board[index] !== '') return;



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



    tile.animate([

      {
        transform:'scale(0.6)',
        opacity:0.5
      },

      {
        transform:'scale(1)',
        opacity:1
      }

    ],{

      duration:200

    });



    checkWinner();

    checkDraw();



    if(!gameOver){

      gainEnergy(1);

      switchTurn();
    }

  });

});



/* TURN */

function switchTurn(){

  currentPlayer =

    currentPlayer === 'X'
    ? 'O'
    : 'X';

  timerCount = 18;

}



/* ENERGY */

function gainEnergy(amount){

  energy += amount;

  if(energy > maxEnergy){

    energy = maxEnergy;
  }

  updateEnergy();

}



function spendEnergy(amount){

  energy -= amount;

  if(energy < 0){

    energy = 0;
  }

  updateEnergy();

}



function updateEnergy(){

  let percentage =

    (energy / maxEnergy) * 100;

  energyFill.style.width =
    percentage + '%';

  energyText.textContent =
    `${energy}/${maxEnergy}`;

}



/* ABILITIES */

function activateAbility(name){

  let cost = 0;

  if(name === 'shield') cost = 2;
  if(name === 'fire') cost = 2;
  if(name === 'freeze') cost = 2;
  if(name === 'teleport') cost = 3;
  if(name === 'corrupt') cost = 3;


  if(energy < cost){

    alert(
      'Not enough energy!'
    );

    return;
  }


  activeAbility = name;

  alert(
    `${name.toUpperCase()} activated.\nSelect a tile.`
  );

}



/* USE ABILITY */

function useAbility(tile,index){

  if(activeAbility === 'shield'){

    tile.style.boxShadow =
      '0 0 20px #3da5ff';

    tile.style.border =
      '4px solid #3da5ff';

    spendEnergy(2);

  }



  if(activeAbility === 'freeze'){

    tile.style.background =
      '#8de7ff';

    tile.style.border =
      '4px solid #c8ffff';

    spendEnergy(2);

  }



  if(activeAbility === 'fire'){

    tile.style.background =
      '#ff5b2e';

    tile.style.border =
      '4px solid #ffae42';

    tile.textContent = '';

    board[index] = '';

    spendEnergy(2);

  }



  if(activeAbility === 'teleport'){

    tile.style.background =
      '#74ff84';

    tile.style.border =
      '4px solid #d8ffd8';

    spendEnergy(3);

  }



  if(activeAbility === 'corrupt'){

    tile.style.background =
      '#8d3cff';

    tile.style.border =
      '4px solid #cb8dff';

    spendEnergy(3);

  }



  tile.animate([

    {
      transform:'scale(0.7)',
      opacity:0.5
    },

    {
      transform:'scale(1)',
      opacity:1
    }

  ],{

    duration:250

  });



  activeAbility = null;

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
        `PLAYER ${board[a]} WINS!`;



      combo.forEach(index=>{

        tiles[index].style.boxShadow =
          '0 0 25px gold';

        tiles[index].style.transform =
          'scale(1.05)';

      });

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
      'DRAW MATCH';

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

  timerCount = 18;

  updateEnergy();

  updateTimer();

  popup.classList.remove('active');



  tiles.forEach(tile=>{

    tile.textContent = '';

    tile.className = 'tile';

    tile.style.background = '';

    tile.style.border =
      '4px solid #7f6548';

    tile.style.boxShadow = '';

    tile.style.transform = '';

  });

}



/* START */

updateEnergy();

updateTimer();
