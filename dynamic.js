const startBtn = document.querySelector('#start');
const playersNumber = document.querySelector('#players-number');
const resetBtn = document.querySelector('#reset');
const endBtn = document.querySelector('#end');
const winningScore = document.querySelector('#win-number');
const playersDivsContainer = document.querySelector('#players-divs-container');
const makePlayerBtn = document.querySelector('#make-player-btn');
const header = document.querySelector('#header');


const displayFunc = function(bool, ...aurgs){
  for(let aurg of aurgs) {
    aurg.disabled = bool;
  }
}

const thePlayers = [];
let started = false;
displayFunc(true, endBtn, resetBtn);

startBtn.addEventListener('click', () => {
  if(!started){
    started = true;
    new Match(thePlayers, playersNumber, winningScore, makePlayerBtn, endBtn);
    displayFunc(true, startBtn, playersNumber, winningScore);
    displayFunc(false, endBtn, resetBtn);
  }
})

resetBtn.addEventListener('click', ()=>{
  for(let player of thePlayers){
    player.score.innerText = 0;
  }
  // header.innerText = 'Score Keeper';
})


endBtn.addEventListener('click', ()=>{
  if(started){
    started = false;
    playersDivsContainer.innerHTML = ``;
    thePlayers.splice(0);
    displayFunc(false, startBtn, playersNumber, winningScore);
    displayFunc(true, endBtn, resetBtn);
    header.innerText = 'Score Keeper';
    console.clear();
  }
})



class Match {
  constructor(thePlayers, playersNumber, winningScore, makePlayerBtn){
    this.playersNumber = playersNumber;
    this.winningScore = winningScore;
    this.thePlayers = thePlayers;
    this.makePlayerBtn = makePlayerBtn;

    this.makePlayersBoard();
    this.btnEvent();
  }

  makePlayersBoard(){
    for (let i = 1; i <= this.playersNumber.value; i++) {
      this.makePlayerDiv(i);
    }
  }


  makePlayerDiv = (i) =>  {
    const player = {};
    // Making the player's div
    const div = document.createElement('div');
    div.classList.add('player-div');
    playersDivsContainer.append(div); 

    // Making the players names 
    const name = document.createElement('input');
    name.value = `Player ${i}`;
    div.append(name);
    name.classList.add('max-width'); 

    // Making the player's score "span" 
    const score = document.createElement('h2');
    score.innerText = 0;
    div.append(score);

    // Making the buttons dive
    const btnsDiv = document.createElement('div');
    div.append(btnsDiv); 

    // Making the player's button
    const plusBtn = document.createElement('button');
    plusBtn.classList.add('btn');
    plusBtn.innerText = `+1`; 
    btnsDiv.append(plusBtn);  

    // Making the player's button
    const minusBtn = document.createElement('button');
    minusBtn.classList.add('btn');
    minusBtn.innerText = `-1`; 
    btnsDiv.append(minusBtn);  

    //Adding everything to thePlayers array
    player.div = div;
    player.plusBtn = plusBtn;
    player.score = score;
    player.index = i;
    player.minusBtn = minusBtn;
    player.name = name;

    console.log(player); 

    this.thePlayers.push(player);
  };



  btnEvent(){
    for(let player of thePlayers){
      player.plusBtn.addEventListener('click', ()=>{
        this.addFunc(player, thePlayers);
      })
      player.minusBtn.addEventListener('click', ()=>{
        player.score.innerText--;
      })
    }
  }

  addFunc(player, opponents){
    player.score.innerText++;
      if(player.score.innerText === this.winningScore.value){
        player.score.classList.add('win');
        header.innerText = `${player.name.value} is The Winner!!`;
      resetBtn.disabled= true;
      for(let opponent of opponents){
        opponent.score.classList.add('lose');
        displayFunc(true, player.plusBtn, player.minusBtn, opponent.plusBtn, opponent.minusBtn, player.name, opponent.name);
        if(opponent === player){  
          opponent.score.classList.remove('lose');
        }
      }
    }
  }

}




