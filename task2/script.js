let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.innerHTML = '00:00:00.00';
    laps.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = savedTime ? updatedTime - startTime + savedTime : updatedTime - startTime;
    let milliseconds = Math.floor((difference % 1000) / 10);
    let seconds = Math.floor((difference / 1000) % 60);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    display.innerHTML = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function recordLap() {
    if (running) {
        let lapTime = display.innerHTML;
        let lapElement = document.createElement('div');
        lapElement.innerText = lapTime;
        laps.appendChild(lapElement);
    }
}
