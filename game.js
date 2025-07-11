 
/* ----------------------------------------------- */
  
  
/* ----------------------------------------------- */
/* game interaction */
// score board
const displayScore = document.getElementById('scoreValue');
// game expression
const playerExp = document.getElementById('playerExpression');
const botExp = document.getElementById('botExpression');
const scoreExp = document.getElementById('expression__score');
const gameExp = document.getElementById('game__expression');
// bottuns r-p-s
const buttons = document.querySelectorAll('.option__button');
const optionRock = document.getElementById('optionRock');
const optionPaper = document.getElementById('optionPaper');
const optionScissors = document.getElementById('optionScissors');
// scores
const score = JSON.parse(localStorage.getItem('score')) || {
  player: 0,
  bot: 0,
};
// navigations
const scoreReset = document.getElementById('scoreReset');
const homeReset = document.getElementById('homeReset'); 
// animation option array
const options = ['rock', 'paper', 'scissors'];
// rule toggle
const rulesOpen = document.getElementById('rulesOpen');
const rulesClose = document.getElementById('rulesClose');
const rulesDialog = document.getElementById('rulesDialog');


function scoreUpdate(){
  displayScore.textContent = `${score.player} : ${score.bot}`; 
}

scoreUpdate();

if(homeReset){
  homeReset.addEventListener('click', () =>{
    localStorage.removeItem('score');

    localStorage.removeItem('playerName');

    scoreExp.textContent = '';

    window.location.href = 'index.html';
  })
}

if(scoreReset){
  scoreReset.addEventListener('click', () =>{
    score.player = 0;
    score.bot = 0;
    localStorage.setItem('score', JSON.stringify(score));

    JSON.parse(localStorage.getItem('score'));

    playerExp.src = 'image/rock.png';
    botExp.src = 'image/rock.png';

    scoreExp.textContent = '';

    scoreUpdate();
  })

}

function enableButton(){
  buttons.forEach(btn => btn.disabled = false);
}

function disableButton(){
  buttons.forEach(btn => btn.disabled = true);
}

function expScore(result){
  const results = ['Stalemate!', 'Owned!', 'Ouch!'];
  scoreExp.textContent = `${results[result]}`;
}
function expScoreWait(){
  scoreExp.textContent = 'Fingers crossed...';
}

function move(move){
  disableButton();
  gameExp.classList.add('start');

    botExp.src = 'image/rock.png';
    playerExp.src = 'image/rock.png';

  let time = setTimeout(() =>{
    gameExp.classList.remove('start');

    const bot = botMove();
    const player = playerMove(move);
    const result = calculation(player, bot);
    
    if(result === 0){
      expScore(result);
      scoreUpdate(); 
    } else if (result === 1){
      score.player++
      expScore(result);
      scoreUpdate(); 
    } else if (result === 2){
      score.bot++
      expScore(result);
      scoreUpdate(); 
    }

    localStorage.setItem('score', JSON.stringify(score));

    enableButton();
  }, 1500)

  expScoreWait();

}




// bot move function
function botMove(){
  const randNum = Math.random();

  let botMove = '';
  
  if(randNum < 1/3){
    botMove = 'rock';
    botExp.src = 'image/rock.png';
  } else if(randNum < 2/3){
    botMove = 'paper';
    botExp.src = 'image/paper.png';
  } else{
    botMove = 'scissors';
    botExp.src = 'image/scissors.png';
  }
  
  return botMove;
} 

// player move function
function playerMove(option){
  
  playerExp.src = `image/${option}.png`;

  return option;
} 

// result function
function calculation(player, bot){
  let result;

  if(player === bot){
    result = 0;
  } else if(  (player === 'rock' && bot === 'scissors') ||
              (player === 'paper' && bot === 'rock') ||
              (player === 'scissors' && bot === 'paper')
          ){
      result = 1;
  } else {
    result = 2;
  }
  
  return result;
}



rulesOpen.addEventListener('click', () =>{
  rulesDialog.classList.add('active');
})

rulesClose.addEventListener('click', () =>{
  rulesDialog.classList.remove('active');
})



