import Notiflix from 'notiflix';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');

function onStart() {
  startEl.disabled = true;
  document.body.style.backgroundColor = getRandomHexColor();

  changeColorTimerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  try {
    if (!changeColorTimerId) return;
    startEl.disabled = false;
    clearInterval(changeColorTimerId);
  } catch (error) {
    Notiflix.Notify.failure('Press "Start" button first!');
  }
}

startEl.addEventListener('click', onStart);
stopEl.addEventListener('click', onStop);
