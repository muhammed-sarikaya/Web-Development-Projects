'use strict';

let score = 20;
let randNum = Math.trunc(Math.random() * 20) + 1;
console.log(randNum);
let hscore = 0;

document.querySelector('.button').addEventListener('click', function (){
 let numInput = document.querySelector('#number').value;
 let result = document.querySelector('.result');
 let newScore = document.querySelector('.score');
 if(score > 0){
  
  if(numInput){
     if(numInput > randNum){
    result.textContent = 'Too high 📈';
    score--;
    newScore.textContent = 'Score: ' + score;
   }
     else if(numInput < randNum){
    result.textContent = 'Too low 📉';
    score--;
    newScore.textContent = 'Score: ' + score;
   }
     else {
     result.textContent = "Correct Number!";
     document.querySelector('body').style.backgroundColor = '#91C483';
     document.querySelector('.again').style.backgroundColor = 'hotpink';
     document.querySelector(':root').style.setProperty("--num", `"${randNum}"`);
     
     if (score > hscore){
      hscore = score;
      document.querySelector('.high-score').textContent = "High-score: " + hscore;
     }
     
     
 }
  
 }
}
});

document.querySelector('.again').addEventListener('click', function() {
  document.querySelector('.score').textContent = 'Score: 20';
  document.querySelector(':root').style.setProperty("--num", `"?"`);
  document.querySelector('.result').textContent = "Start guessing...";
  document.querySelector('body').style.backgroundColor = '#2C3333';
  document.querySelector('#number').value = "";
  document.querySelector('.again').style.backgroundColor = '#B667F1';
  score = 20;
  randNum = Math.trunc(Math.random() * 20) + 1;
  console.log(randNum);
});