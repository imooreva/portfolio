//some vars set to false so conditional statements work properly
var timerRunning = false,
    counter = false,
    breakCounter = false,
    count;
var beep = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/240258/endbeeps.wav');

//session timer
var timerInterval = () => {
	count = count - 1;
	if (timerRunning) {
		if (count <= 0) {
			clearInterval(counter);	  
			counter = false;
			count = getLength('break') * 60;
			setInnerHtml('timer', secondsToHMS(count));
			breakCounter = setInterval(breakInterval, 1000);
			beep.play();
			setInnerHtml('status', 'Break in progress');
			return;
		}
	}
	setInnerHtml('timer', secondsToHMS(count));
}

//break timer
var breakInterval = () => {
	count = count - 1;
	if (timerRunning) {
		if (count <= 0) {
			clearInterval(breakCounter);
			breakCounter = false;
			count = getLength('session') * 60;
			setInnerHtml('timer', secondsToHMS(count));
			timerRunning = true;
			beep.play();
			setInnerHtml('status', 'Session in progress');
			counter = setInterval(timerInterval, 1000);
			return;
		}
	}
	setInnerHtml('timer', secondsToHMS(count));
}

//get time length of #timer, #break or #session
var getLength = (ID) => {
    return document.getElementById(ID).innerHTML;
}

//prevent user setting break time to less than one minute
//function kept separate from event listeners
var changeBrkLength = (input) => {
    if (eval(getLength('break') + input) > 0 && !timerRunning) {
        setInnerHtml('break', eval(getLength('break') + input));
    }
}

//prevent user setting session time to less than one minute
//function kept separate from event listeners
var changeSesLength = (input) => {
    if (eval(getLength('session') + input) > 0 && !timerRunning) {
        setInnerHtml('session', eval(getLength('session') + input));
    }
}

//convert #timer to seconds
var secondsRemaining = () => {
    let time = getLength('timer').split(':');
    return time[0] * 3600 + time[1] * 60 + time[2] * 1;
}

//convert seconds to hh:mm:ss format
var secondsToHMS = (seconds) => {
    let d = new Date(1970,0,1);
    d.setSeconds(seconds);
    return d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}


//DOM-related functions and listeners for buttons
var addClickListener = (ID, statements) => document.getElementById(ID).addEventListener('click', statements);
var setInnerHtml = (ID, value) => document.getElementById(ID).innerHTML = value;

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
		setInnerHtml('status', 'Click timer to start/pause');
		counter = false;
		breakCounter = false;
	}
});

addClickListener('circle', ()=> {
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

//export {clearInterval, getLength, setInterval, secondsRemaining, secondsToHMS};
