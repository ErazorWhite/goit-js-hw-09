import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

let delay = null;
let step = null;
let amount = null;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

function onSubmit(event) {
  event.preventDefault();
  
  delay = delayEl.value;
  step = stepEl.value;
  amount = amountEl.value;
  
  // Показываем подсказку с введёнными значениями для удобства
  Notiflix.Notify.info(`\n\ndelay: ${delay}, step: ${step}, amount: ${amount}`, {
    timeout: 10000,
  });

  // Очищаем поля формы
  delayEl.value = '';
  stepEl.value = '';
  amountEl.value = '';
}

formEl.addEventListener('submit', onSubmit);
