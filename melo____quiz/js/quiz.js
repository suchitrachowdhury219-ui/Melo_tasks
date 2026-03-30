const level = localStorage.getItem("level");
const questions = quizData[level];

let index = 0, score = 0, correct = 0, wrong = 0;
let time = 15, timer;

const qEl = document.getElementById("question");
const optEl = document.getElementById("options");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");

function startTimer(){
  time = 15;
  document.getElementById("timer").innerText = `⏱ ${time}s`;
  timer = setInterval(()=>{
    time--;
    document.getElementById("timer").innerText = `⏱ ${time}s`;
    if(time === 0){
      clearInterval(timer);
      wrong++;
      index++;
      loadQ();
    }
  },1000);
}

function loadQ(){
  if(index >= questions.length){
    localStorage.setItem("score", score);
    localStorage.setItem("correct", correct);
    localStorage.setItem("wrong", wrong);
    saveLeaderboard();
    window.location.href = "result.html";
    return;
  }

  feedback.innerText = "";
  optEl.innerHTML = "";
  progress.innerText = `Question ${index+1} / ${questions.length}`;

  qEl.innerText = questions[index].q;

  questions[index].o.forEach((opt,i)=>{
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = ()=>answer(i);
    optEl.appendChild(btn);
  });

  clearInterval(timer);
  startTimer();
}

function answer(selected){
  clearInterval(timer);
  const correctIndex = questions[index].a;
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach(b=>b.disabled=true);
  buttons[correctIndex].classList.add("correct");

  if(selected === correctIndex){
    score++; correct++;
    feedback.innerText = "You are correct 😊";
    feedback.style.color = "green";
    document.getElementById("correctSound").play();
  } else {
    wrong++;
    buttons[selected].classList.add("wrong");
    feedback.innerText = "Oops! Wrong answer 🙃";
    feedback.style.color = "red";
    document.getElementById("wrongSound").play();
    document.querySelector(".container").classList.add("shake");
  }

  setTimeout(()=>{
    document.querySelector(".container").classList.remove("shake");
    index++; loadQ();
  },1200);
}

function saveLeaderboard(){
  let board = JSON.parse(localStorage.getItem("leaderboard")) || [];
  board.push({
    name: localStorage.getItem("username"),
    score: score
  });
  board.sort((a,b)=>b.score-a.score);
  localStorage.setItem("leaderboard", JSON.stringify(board.slice(0,5)));

  let best = localStorage.getItem("bestScore") || 0;
  if(score > best) localStorage.setItem("bestScore", score);
}

loadQ();
