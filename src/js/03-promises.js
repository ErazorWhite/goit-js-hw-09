import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function onSubmit(event) {
  event.preventDefault();

  let delay = parseInt(delayEl.value);
  const step = parseInt(stepEl.value);
  const amount = parseInt(amountEl.value);

  // Показываем подсказку с введёнными значениями для удобства
  Notify.info(
    `\n\ndelay: ${delay}ms, step: ${step}ms, amount: ${amount}`,
    {
      timeout: delay + step * amount + 3000,
    }
  );

  for (let idx = 1; idx <= amount; idx++) {
    createPromise(idx, delay); // Создаём промисы, передаём позицию
    delay += step; // Увеличиаем задержку с заданным шагом
  }

  // Очищаем поля формы
  delayEl.value = '';
  stepEl.value = '';
  amountEl.value = '';
}

formEl.addEventListener('submit', onSubmit);
