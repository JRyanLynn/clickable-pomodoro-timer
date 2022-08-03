let start = document.getElementById('start');
let resetButton = document.getElementById('reset');
let stop = document.getElementById('stop');
let playButton = document.getElementById('play-button');

//work values
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

//break values
let breakMin = document.getElementById('break-min');
let breakSec = document.getElementById('break-sec');

//top buttons
let workButton = document.getElementById('work-button');
let breakButton = document.getElementById('break-button');

//input containers
let breakContainer = document.querySelector('.break-container');
let workContainer = document.querySelector('.work-container');


//audio element using native JS function
var ring = new Audio ("https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Alarm%20Sounds/209[kb]star-trek-bridge.wav.mp3");

//display onload
let body = document.querySelector('body');

body.onload = () => {
    breakContainer.style.display = 'none';
    workContainer.style.display = 'block';
    workButton.style.backgroundColor = '#4169E1';
    breakButton.style.backgroundColor = '#BDBDBD';   
}

var startTimer;

function workTimer (callback = ()=> {}) {

if (seconds.innerText != 0) {    //decriments seconds
        seconds.innerText --;
        breakContainer.style.display = 'none';
        workContainer.style.display = 'block';
        breakButton.style.backgroundColor = '#BDBDBD';
        workButton.style.backgroundColor = '#4169E1';

        if (seconds.innerText < 10) {
            seconds.innerHTML = '0' + seconds.innerText;
        }
    } 
    
    else if (minutes.innerText != 0 && seconds.innerText == 0) {  //decriments minutes 
        seconds.innerText = 59;
        minutes.innerText --;             
    }
   if (minutes.innerText == 0 && seconds.innerText== 0) {
      clearInterval(startTimer);
     ring.play();
     clearInterval(startTimer);
     callback();
    }
}

  function breakTimer() {
    //break timer 
    if (breakSec.innerText != 0) {
            workContainer.style.display = 'none';
            breakContainer.style.display = 'block';
            breakButton.style.backgroundColor = '#4169E1'
            workButton.style.backgroundColor = '#BDBDBD';

            breakSec.innerText --;
            
            if (breakSec.innerText < 10) { //adds zero
                breakSec.innerHTML = "0" + breakSec.innerText;
            }      
        }      
        else if (breakMin.innerText != 0 && breakSec.innerText == 0) { //decriments wm if 0 reached
            breakSec.innerText = 59;
            breakMin.innerText --;
    }
//resets timer to inital value //! problems here due to timer resetting to initial value after change
if (minutes.innerText == 0 && seconds.innerText == 0 && breakMin.innerText == 0 && breakSec.innerText == 0) {
    resetTimer();
    //incriment counter if one full cycle is done
    document.getElementById('cycles').innerHTML++;

    //ends timer
    clearInterval(startTimer);
    ring.play();
    breakButton.style.backgroundColor = '#BDBDBD';
    workButton.style.backgroundColor = '#4169E1';   
    return;
}
}

//reset function
function resetTimer () {

    stopTimer();

    minutes.innerText = "25";
    seconds.innerText = "00";

    breakMin.innerText = "5";
    breakSec.innerText = "00";

    breakContainer.style.display = 'none';
    workContainer.style.display = 'block';
}

resetButton.addEventListener('click', resetTimer);


//Start Timer
function starting () {
    startTimer = setInterval(workTimer, 1000, ()=> startTimer = setInterval(breakTimer, 1000));
    start.innerHTML = '<i class="bi bi-pause-fill"></i>'; 
}

//Stop timer (problem with clear interval)
function stopTimer () {
    clearInterval(startTimer);
    start.innerHTML = '<i class="bi bi-play-fill"></i>';
}

var playing = false;

start.addEventListener('click', () => {
    playing ? stopTimer() : starting();
    playing = !playing;
});


//toggles for display and buttons
workButton.addEventListener('click', () => {
   breakContainer.style.display = 'none';
   workContainer.style.display = 'block';
   breakButton.style.backgroundColor = '#BDBDBD';
   workButton.style.backgroundColor = '#4169E1';
});

breakButton.addEventListener('click', () => {
    workContainer.style.display = 'none';
    breakContainer.style.display = 'block';
    workButton.style.backgroundColor = '#BDBDBD';
    breakButton.style.backgroundColor = '#4169E1';
 });
