const score = localStorage.getItem("score");
const correct = localStorage.getItem("correct");
const wrong = localStorage.getItem("wrong");

document.getElementById("summary").innerText =
`Score: ${score}
Correct: ${correct}
Wrong: ${wrong}`;

const board = JSON.parse(localStorage.getItem("leaderboard")) || [];
const ul = document.getElementById("board");

board.forEach((b,i)=>{
  let li = document.createElement("li");
  li.innerText = `#${i+1} ${b.name} → ${b.score}`;
  ul.appendChild(li);
});
