// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
// Notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startEl = document.querySelector('[data-start]');
startEl.disabled = true;

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null; // Резервирую переменную под будущий таймер тут, чтобы была возможность реализовать сценарий когда от него нужно избавиться
let selectedTime = 0; // Так же запоминаю выбранное время

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (timerId) clearInterval(timerId); // Если уже запустили таймер, то открытие тайм пикера обнулит таймер

    if (selectedDates[0] < Date.now()) {
      // Выбрали прошлое время
      startEl.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      // Выбрали будущее время
      startEl.disabled = false;
    }

    selectedTime = selectedDates[0]; // Запоминаем, пригодится в onStart()
    timerUpdate(convertMs(selectedTime - Date.now()));
  },
};

function onStart() {
  let remainingTime = selectedTime - Date.now(); // Высчитываем заново сколько времени осталось после нажатия
  startEl.disabled = true; // Чтобы не было соблазна поклацать после старта

  timerId = setInterval(() => {
    remainingTime = selectedTime - Date.now(); // Каждую секунду снова считаем сколько осталось обратного отсчёта
    if (remainingTime > 0) {
      timerUpdate(convertMs(remainingTime)); // Обновляем таймер до тех пор пока время не вышло
    } else {
      clearInterval(timerId); // Время вышло
      Notiflix.Notify.info('Time is gone!');
    }
  }, 1000);
}

flatpickr('#datetime-picker', options); // Создаём экземпляр тайм пикера

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function timerUpdate({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

startEl.addEventListener('click', onStart);
