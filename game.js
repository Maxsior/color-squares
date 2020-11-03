import Color from './color.js';

function buildSquare(color, onclick) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.style.backgroundColor = color;
  square.addEventListener('click', onclick);

  return square;
}

function random3Terms(delta) {
  const a = Math.round(Math.random() * delta);
  const b = Math.round(Math.random() * (delta - a));
  const c = delta - a - b;
  return [a, b, c];
}

function popup(msg) {
  const el = document.getElementById('popup');
  el.style.top = 0;
  el.innerText = msg;
  setTimeout(() => el.style.top = '', 3000)
}

function startLevel(level) {
  document.getElementById('game').innerHTML = '';
  document.getElementById('level').innerText = level;
  localStorage.setItem('level', level);

  const cardSize = 100 / Math.log1p(level);
  document.documentElement.style.setProperty('--game-size', (cardSize + 16) * (level + 1) + 'px');
  document.documentElement.style.setProperty('--card-size', cardSize + 'px');

  const baseColor = Color.random();
  const squaresNumber = (level + 1) ** 2;
  const other = Math.round(Math.random() * squaresNumber);
  for (let i = 1; i <= squaresNumber; i++) {
    let square;
    if (i === other) {
      const [r, g, b] = baseColor.getRGB();
      const delta = Math.round(200 / Math.log1p(level));
      const [dr, dg, db] = random3Terms(delta);

      const otherColor = new Color(
        Math.max(r - dr, 0),
        Math.max(g - dg, 0),
        Math.max(b - db, 0)
      );
      square = buildSquare(otherColor.getHex(), () => startLevel(level + 1));
    } else {
      square = buildSquare(baseColor.getHex(), () => stopGame());
    }

    document.getElementById('game').append(square);
  }
}

function tick(seconds) {
  document.getElementById('timer').innerText = seconds;
  localStorage.setItem('time', seconds);
  if (seconds === 0) {
    stopGame(false);
  }
}

let iid;

function startTimer(time) {
  let seconds = time;
  tick(seconds)
  iid = setInterval(function () {
    seconds -= 1;
    tick(seconds);
  }, 1000);
}

function stopGame(force=true) {
  clearInterval(iid);
  localStorage.removeItem('level');
  localStorage.removeItem('time');
  popup('Конец игры');
  setTimeout(startGame, 3000);
}

function startGame() {
  const level = +localStorage.getItem('level') || 1;
  const time = +localStorage.getItem('time') || 60;
  startLevel(level);
  startTimer(time);
}

startGame();
