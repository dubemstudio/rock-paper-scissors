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
/* display scores */
const displayScore = document.getElementById('scoreValue');
let playerScore = 0;
let botScore = 0;

if (displayScore){
  displayScore.textContent = `${playerScore} : ${botScore}`
}
