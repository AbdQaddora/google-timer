const timer = document.querySelector('.timer');
const timeInput = document.querySelector('.time-input');

const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');

const timerBar = document.querySelector('.timer-bar');

let startTime = 0;
let remainTime = 0;

const getSecondsAsTwoDigit = (s) => {
    if (s < 10) {
        return `0${s}`
    }
    return s;
}

const convertSplittedTimeToString = (h, m, s) => {
    let result = `${h}h ${m}m ${getSecondsAsTwoDigit(s)}s`;

    if (h === 0) {
        result = `${m}m ${getSecondsAsTwoDigit(s)}s`;
    }

    if (h === 0 && m === 0) {
        result = `${getSecondsAsTwoDigit(s)}s`;
    }

    return result;
}

const convertTimeToString = (time) => {
    const h = Math.floor(time / (60 * 60));

    const m = Math.floor(((time / (60 * 60)) - Math.floor(time / (60 * 60))) * 60);

    const s = time - h * 60 * 60 - m * 60;

    return convertSplittedTimeToString(h, m, s);
}


timer.textContent = convertTimeToString(startTime);



// hide and show th input   
timer.addEventListener('click', () => {
    timer.style = 'display:none;'
    timeInput.style = 'display:block;'
    timeInput.focus();
});

timeInput.addEventListener('blur', () => {
    timer.style = 'display:block;'
    timeInput.style = 'display:none;'
})

// handel input change 
let inputValue = "";
const inputValueStringFormat = () => {
    let h = 0, m = 0, s = 0;
    // TODO: find better solution
    switch (inputValue.length) {
        case 6:
            h = inputValue.substring(2, 0);
            m = inputValue.substring(4, 2);
            s = inputValue.substring(6, 4);
            break;
        case 5:
            h = inputValue.substring(2, 0);
            m = inputValue.substring(4, 2);
            s = inputValue.substring(5, 4);
            break;
        case 4:
            m = inputValue.substring(2, 0);
            s = inputValue.substring(4, 2);
            break;
        case 3:
            m = inputValue.substring(2, 0);
            s = inputValue.substring(3, 2);
            break;
        case 2:
            s = inputValue.substring(2, 0);
            break;
        case 1:
            s = inputValue.substring(1, 0);
            break;
        default:
            break;
    }
    if (h === 0 && m === 0 && s === 0) {
        return "";
    }
    // set the h2 timer value
    startTime = (parseInt(h) * 60 * 60)
        + (parseInt(m) * 60)
        + parseInt(s);
    remainTime = startTime;

    timer.textContent = convertTimeToString(startTime);

    return convertSplittedTimeToString(h, m, s);
}

// just allow numbers
timeInput.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (inputValue.length <= 6) {
        if (!isNaN(e.key)) {
            inputValue = inputValue + e.key;
        } else if (e.key === 'Backspace') {
            inputValue = inputValue.substring(0, inputValue.length - 1);
        }
    }
    timeInput.value = inputValueStringFormat();
})


// startBtn 
let interval = ''
startBtn.addEventListener('click', () => {
    if (startBtn.textContent === 'start') {
        startBtn.textContent = 'stop';
        interval = setInterval(() => {
            if (remainTime === 1) {
                clearInterval(interval);
            }

            remainTime--;
            timer.textContent = convertTimeToString(remainTime);
            console.log((((startTime - remainTime) / startTime) * 100).toFixed(2));
            timerBar.style = `width:${(((startTime - remainTime) / startTime) * 100).toFixed(2)}%`
        }, 1000);
    } else {
        clearInterval(interval);
        startBtn.textContent = 'start';
    }
})


// resetBtn
resetBtn.addEventListener('click', () => {
    remainTime = startTime;
    clearInterval(interval);
    startBtn.textContent = 'start';
    timer.textContent = convertTimeToString(remainTime);
})

