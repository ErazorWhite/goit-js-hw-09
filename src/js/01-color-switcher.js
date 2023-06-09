import { Notify } from 'notiflix/build/notiflix-notify-aio';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');
let changeColorTimerId = null;

function onStart() {
  startEl.disabled = true;
  document.body.style.backgroundColor = getRandomHexColor();

  changeColorTimerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  if (!startEl.disabled || !changeColorTimerId) {
    Notify.failure('Press "Start" button first!');
    return;
  }
  startEl.disabled = false;
  clearInterval(changeColorTimerId);
}

startEl.addEventListener('click', onStart);
stopEl.addEventListener('click', onStop);
