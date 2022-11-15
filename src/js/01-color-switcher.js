const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let intervalId = null;

function changeBodyBackground() {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.buttonStart.setAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function StopChangeBodyBackground() {
  clearInterval(intervalId);
  intervalId = null;
  refs.buttonStart.removeAttribute('disabled');
}

refs.buttonStart.addEventListener('click', () => changeBodyBackground());
refs.buttonStop.addEventListener('click', () => StopChangeBodyBackground());
