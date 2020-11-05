import Color from './color.js';

let iid;
let stopped = true;

const GAME_TIME = 60;

function buildSquare(color, onclick) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.style.backgroundColor = color;
  square.addEventListener('click', onclick);

  return square;
}

function popup(msg) {
  const el = document.getElementById('popup');
  el.style.top = 0;
  el.innerText = msg;
  setTimeout(() => el.style.top = '', 3000)
}

function tick(seconds) {
  document.getElementById('timer').innerText = seconds;
  localStorage.setItem('time', seconds);
  if (seconds === 0) {
    stopGame(false);
  }
}

function startTimer(time) {
  let seconds = time;
  tick(seconds)
  iid = setInterval(function () {
    seconds -= 1;
    tick(seconds);
  }, 1000);
}

function stopGame() {
  stopped = true;
  clearInterval(iid);
  localStorage.removeItem('level');
  localStorage.removeItem('time');
  localStorage.setItem('level', 1);
  localStorage.setItem('time', GAME_TIME);
  popup('Конец игры');
  setTimeout(startGame, 3000);
}

function startLevel(level) {
  if (stopped) return;

  document.getElementById('game').innerHTML = '';
  document.getElementById('level').innerText = level;

  const cardSize = 100 / Math.log1p(level);
  document.documentElement.style.setProperty('--card-size', cardSize + 'px');
  document.documentElement.style.setProperty('--level', level);
  localStorage.setItem('level', level);

  const baseColor = Color.random();
  const squaresNumber = (level + 1) ** 2;
  const other = Math.round(Math.random() * (squaresNumber - 1));
  for (let i = 0; i < squaresNumber; i++) {
    let square;
    if (i === other) {
      const delta = Math.round(200 / Math.sqrt(level));
      const otherColor = baseColor.deviate(delta);
      square = buildSquare(otherColor.getHex(), () => startLevel(level + 1));
    } else {
      square = buildSquare(baseColor.getHex(), () => stopGame());
    }
    document.getElementById('game').append(square);
  }
}

function startGame() {
  stopped = false;
  const level = +localStorage.getItem('level') || 1;
  const time = +localStorage.getItem('time') || GAME_TIME;
  startLevel(level);
  startTimer(time);
}

startGame();
