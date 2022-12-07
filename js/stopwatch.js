const timer = document.querySelector('.timer');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');

let time = 0;

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

// startBtn 
let interval = ''
startBtn.addEventListener('click', () => {
    if (startBtn.textContent === 'start') {
        startBtn.textContent = 'stop';
        interval = setInterval(() => {
            time++;
            timer.textContent = convertTimeToString(time);
        }, 1000);
    } else {
        clearInterval(interval);
        startBtn.textContent = 'start';
    }
})


// resetBtn
resetBtn.addEventListener('click', () => {
    time = 0;
    clearInterval(interval);
    startBtn.textContent = 'start';
    timer.textContent = convertTimeToString(time);
})
