 
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
let playerScore = localStorage.getItem('playerScore') || 0;
let botScore = localStorage.getItem('botScore') || 0;
// navigations
const scoreReset = document.getElementById('scoreReset');
const homeReset = document.getElementById('homeReset'); 
// animation option array
const options = ['rock', 'paper', 'scissors'];


function scoreUpdate(){
  displayScore.textContent = `${playerScore} : ${botScore}`; 
}

scoreUpdate();

if(homeReset){
  homeReset.addEventListener('click', () =>{
    localStorage.removeItem('playerScore');
    localStorage.removeItem('botScore');

    localStorage.removeItem('playerName');

    scoreExp.textContent = '';

    window.location.href = 'index.html';
  })
}

if(scoreReset){
  scoreReset.addEventListener('click', () =>{
    localStorage.setItem('playerScore', 0);
    localStorage.setItem('botScore', 0);

    playerScore = localStorage.getItem('playerScore') || 0;
    botScore = localStorage.getItem('botScore') || 0;


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
      playerScore++
      expScore(result);
      scoreUpdate(); 
    } else if (result === 2){
      botScore++
      expScore(result);
      scoreUpdate(); 
    }

    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('botScore', botScore);

    enableButton();
  },1500)

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


