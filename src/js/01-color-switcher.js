const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let intervalId;

function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function bodyBackgroundColor() {
   document.body.style.backgroundColor = getRandomHexColor();
}

function startBackgroundColor() {
   btnStart.disabled = true;
   btnStop.disabled = false;
   intervalId = setInterval(bodyBackgroundColor, 1000);
}

function stopBackgroundColor() {
   btnStart.disabled = false;
   btnStop.disabled = true;
   clearInterval(intervalId);
}

btnStart.addEventListener('click', startBackgroundColor);
btnStop.addEventListener('click', stopBackgroundColor);
