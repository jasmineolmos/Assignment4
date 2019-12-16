window.addEventListener('load', init); //load function init when the pade is opened

//variables we will be using in multiple funtions 
let time = 5; //set the times to 5 seconds
let score = 0; // set intial score to 0
let isPlaying; //set to see if the game is playing

//dom elements 

const wordInput = document.querySelector ('#word-input'); //word inputed by user into the text box
const currentWord = document.querySelector('#current-word'); // the word promted to type
const scoreDisplay = document.querySelector('#score'); //the score 
const timeDisplay = document.querySelector('#time'); //time left
const message = document.querySelector('#message'); //show if the typed word is correct
const seconds = document.querySelector('#seconds'); //number of seconds given

//array of words that the game will use 

const words = [
    'hat',
    'bed',
    'sleep',
    'dog',
    'computer',
    'school',
    'coding',
    'food',
    'drink',
    'airplane',
    'cars',
    'trucks',
    'railway',
    'airport',
    'firefighter',
    'teacher',
    'professor',
    'university',
    'javascript',
    'assignment'
];

//initialize game
function init() {
    //load a random word from array 
    showWord(words);
    //check if input matches word
    wordInput.addEventListener('input', startMatch); //if there is input, run function start match
    //show countdown every second 
    setInterval(countdown, 1000); //runs every second
    //check game status
    setInterval(checkStatus, 50); //runs every 50 milliseconds
}

//start checking if words match
function startMatch(){
    if(matchWords()){
        isPlaying = true; //user is playing
        time = 6; // set to one above time given so the page can reload
        showWord(words); //show a new word
        wordInput.value = ''; //clear the textbox
        score++;  //increase the score by 1
    }

    // if the score is -1, display 0
    if(score === -1){
        scoreDisplay.innterHTML = 0;
    }else {
        scoreDisplay.innerHTML = score;
    }
    
}

//match currentWord to the wordInput
function matchWords(){
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!'; //if the words match 
        return true;
    } else {
        message.innterHTML = '';
        return false;

    }
}

// pick and show random word
function showWord(words) {
    //generate a random array index number
    const randIndex = Math.floor(Math.random() * words.length); 
    //output a random word from the index
    currentWord.innerHTML = words[randIndex]; 
}

//create countdown timer 
function countdown() {
    //if there is still time,
    if(time > 0) {
        //decrease the time by 1 seconds
        time--;
    } else if(time===0) {//if the time equals 0, 
        //game is over
        isPlaying=false; //no longer playing
    } 
    //show time
    timeDisplay.innerHTML = time;
}

//check game stuatus
function checkStatus() {
    if(!isPlaying, time ===0) {//check if is playing is false and if time equals 0
        message.innerHTML = 'Game Over! ): Try again!';
        score = -1; //when you type the word to restart game, it will go back to 0

    }
}
