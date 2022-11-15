import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('[data-start]');

console.log(flatpickr);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    buttonStart.setAttribute('disabled', 'true');

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    buttonStart.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

buttonStart.setAttribute('disabled', 'true');
buttonStart.addEventListener('click', onButtonStart);

const countdownTimer = flatpickr('#datetime-picker', options);
const refs = {
  days: document.querySelector('[data-days'),
  hours: document.querySelector('[data-hours'),
  mins: document.querySelector('[data-minutes'),
  secs: document.querySelector('[data-seconds'),
};

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = minutes;
  refs.secs.textContent = seconds;
}

intervalId = null;

function onButtonStart() {
  const startTime = countdownTimer.selectedDates[0];
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;

    if (deltaTime > 0) {
      const timeComponents = convertMs(deltaTime);
      updateClockface(timeComponents);
    } else {
      const timeComponents = convertMs(0);
      updateClockface(timeComponents);
      clearInterval(intervalId);
      setTimeout(() => {
        Notiflix.Notify.warning('Time out');
      }, 0);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
