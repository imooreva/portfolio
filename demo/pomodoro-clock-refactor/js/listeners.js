import {clearInterval, getLength, setInterval, secondsRemaining, secondsToHMS} from 'listeners.js';

//DOM-related functions
var addClickListener = (ID, statements) => document.getElementById(ID).addEventListener('click', statements);
var setInnerHtml = (ID, value) => document.getElementById(ID).innerHTML = value;

//event listeners for buttons
addClickListener('addminute', () => {
    if (!timerRunning && !breakCounter) {
        let toSeconds = getLength('session') * 60;
        setInnerHtml('timer', secondsToHMS(toSeconds));
    }
});

addClickListener('subtractminute', () => {
    if (!timerRunning && !breakCounter) {
        let toSeconds = getLength('session') * 60;
        setInnerHtml('timer', secondsToHMS(toSeconds));
    }
});

addClickListener('addbrk', ()=> {
    if (!timerRunning && !counter && breakCounter) {
        let toSeconds = getLength('break') * 60;
        setInnerHtml('timer', secondsToHMS(toSeconds));
    }
});

addClickListener('subbrk', ()=> {
    if (!timerRunning && !counter && breakCounter) {
        let toSeconds = getLength('break') * 60;
        setInnerHtml('timer', secondsToHMS(toSeconds));
    }
});

addClickListener('reset', ()=> {
    if (!timerRunning) {
        let toSeconds = getLength('session') * 60;
        setInnerHtml('timer', secondsToHMS(toSeconds));
        setInnerHtml('status', 'Click timer to start/pause/adjust');
        counter = false;
        breakCounter = false;
    }
});

addClickListener('timer', ()=> {
    if (!timerRunning && breakCounter) {
        //resume break
        timerRunning = true;
        count = secondsRemaining();
        breakCounter = setInterval(breakInterval, 1000);
        setInnerHtml('status', 'Break in progress');
    } else if (!timerRunning && !counter && !breakCounter || !timerRunning && counter) {
        //start or resume timer
        timerRunning = true;
        count = secondsRemaining();
        counter = setInterval(timerInterval, 1000);
        setInnerHtml('status', 'Session in progress');
    } else {
        //pause timer
        timerRunning = false;
        count = secondsRemaining();
        setInnerHtml('timer', getLength('timer'));
        clearInterval(counter);
        clearInterval(breakCounter);
        setInnerHtml('status', 'Paused');
    }
});