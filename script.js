  /* ----------------------------------------------- */
  /* Set view height*/
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setVH();
  window.addEventListener('resize', setVH);
  /* ----------------------------------------------- */
  
  
  /* ----------------------------------------------- */
  /* Toggle Theme */
  const toggleBtn = document.getElementById('toggleBtn');
  const body = document.querySelector('body');
  const illustration = document.getElementById('illustration');
  
  let darkmode = localStorage.getItem('darkmode');
  
  const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    if(illustration){
      illustration.src = "image/illustrationGroupDark.svg";
    }
  }
  const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.removeItem('darkmode');
    if(illustration){
      illustration.src = "image/illustrationGroupLight.svg";
    }
  }
  
  if(darkmode === "active"){
    enableDarkmode();
  } else {
    disableDarkmode();
  }
  if(toggleBtn){
    toggleBtn.addEventListener("click", () => {
      darkmode = localStorage.getItem('darkmode');
      darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    })
  }
/* ----------------------------------------------- */
  
  
/* ----------------------------------------------- */
/* Get name */
const form = document.querySelector('.signup__form');
const nameInput = document.getElementById('name');
if (form){
  form.addEventListener('submit', (e) =>{
    e.preventDefault();
  
    const playerName = nameInput.value.trim();
  
    if (playerName){
      localStorage.setItem('playerName', playerName);
  
      window.location.href = 'game.html';
    }
  })
}
/* ----------------------------------------------- */
  
  
/* ----------------------------------------------- */
/* display name */
const displayName = document.getElementById('displayName');
const playerName = localStorage.getItem('playerName') || "Guest";

if (displayName){
  displayName.textContent = playerName;
} 
/* ----------------------------------------------- */
  
  
/* ----------------------------------------------- */
/* game interaction */
// score board
const displayScore = document.getElementById('scoreValue');
// game expression
const playerExp = document.getElementById('playerExpression');
const botExp = document.getElementById('botExpression');
// bottuns r-p-s
const optionRock = document.getElementById('optionRock');
const optionPaper = document.getElementById('optionPaper');
const optionScissors = document.getElementById('optionScissors');
// scores
let playerScore = localStorage.getItem('playerScore') || 0;
let botScore = localStorage.getItem('botScore') || 0;
// navigations
const scoreReset = document.getElementById('scoreReset');
const homeReset = document.getElementById('homeReset'); 


if (displayScore){
  displayScore.textContent = `${playerScore} : ${botScore}`; 
};



if(homeReset){
  homeReset.addEventListener('click', () =>{
    localStorage.removeItem('playerScore', 0);
    localStorage.removeItem('botScore', 0);

    localStorage.removeItem('playerName');

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

    displayScore.textContent = `${playerScore} : ${botScore}`; 
  })

}

function move(move){
  const bot = botMove();
  const player = playerMove(move);
  const result = calculation(player, bot);
  
  if(result === 0){
    displayScore.textContent = `${playerScore} : ${botScore}`; 
  } else if (result === 1){
    playerScore++
      displayScore.textContent = `${playerScore} : ${botScore}`; 
  } else if (result === 2){
    botScore++
    displayScore.textContent = `${playerScore} : ${botScore}`; 
  }

  localStorage.setItem('playerScore', playerScore);
  localStorage.setItem('botScore', botScore);
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


