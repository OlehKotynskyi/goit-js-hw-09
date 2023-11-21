import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.backgroundColor = '#ece5db';
const TIMER_DELAY = 1000;
let intervalId = null;
let selectDate = null;
let currentDate = null;


const inputEl = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');


btnStart.disabled = true;
btnStart.addEventListener('click', timerStart);

let remainingTime = 0;

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      onDateCheck(selectedDates);
   },
};

flatpickr(inputEl, options);

Report.info(
   'Привіт!',
   'Оберіть дату та час',
   'Продовжити'
);

function onDateCheck(selectDates) {
   selectDate = selectDates[0].getTime();
   currentDate = new Date().getTime();

   if (selectDate > currentDate) {
      btnStart.disabled = false;
      Report.success(
         'Супер!',
         'Можете продовжити наисніть Start',
         'Продовжити'
      );
      return;
   }
   Report.failure(
      'Щось пішло не так(((',
      'Буть ласка оберіть дату та час',
      'Продовжити'
   );
}

function timerStart() {
   intervalId = setInterval(() => {
      currentDate = new Date().getTime();
      if (selectDate - currentDate <= 1000) {
         clearInterval(intervalId);
         btnStart.disabled = true;
         dateInput.disabled = false;
         Report.info(
            'Вітаю!',
            'Таймер запущено, якщо хочете змінити таймер оберіть дату та час і наисніть Start або перезавантажте сторінку',
            'Продовжити'
         );
         return;
      } else {
         btnStart.disabled = true;
         inputEl.disabled = true;
         currentDate += 1000;
         remainingTime = Math.floor(selectDate - currentDate);
         convertMs(remainingTime);
      }
   }, TIMER_DELAY);
}

function createMarkup({ days, hours, minutes, seconds }) {
   dataDays.textContent = days;
   dataHours.textContent = hours;
   dataMinutes.textContent = minutes;
   dataSeconds.textContent = seconds;
}

function addLeading(value) {
   return String(value).padStart(2, '0');
}

function convertMs(ms) {
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;

   const days = addLeading(Math.floor(ms / day));
   const hours = addLeading(Math.floor((ms % day) / hour));
   const minutes = addLeading(Math.floor(((ms % day) % hour) / minute));
   const seconds = addLeading(
      Math.floor((((ms % day) % hour) % minute) / second)
   );
   createMarkup({ days, hours, minutes, seconds });
   return { days, hours, minutes, seconds };
}