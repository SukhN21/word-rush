'use strict';

const wordBank = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'phone',
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
    'velvet', 'potion', 'treasure', 'beacon', 'labyrinth', 'whisper', 'breeze',
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology',
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
    'butterfly', 'discovery', 'ambition', 'music', 'eagle', 'crown',
    'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'door', 'bird',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'beach', 'economy', 'interview', 'awesome', 'challenge', 'science',
    'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software',
    'update', 'yellow', 'keyboard', 'window', 'beans', 'truck', 'sheep',
    'blossom', 'secret', 'wonder', 'enchantment', 'destiny', 'quest', 'sanctuary',
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil',
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort',
    'mask', 'escape', 'promise', 'band', 'level', 'hope', 'moonlight', 'media',
    'orchestra', 'volcano', 'guitar', 'raindrop', 'inspiration', 'diamond',
    'illusion', 'firefly', 'ocean', 'cascade', 'journey', 'laughter', 'horizon',
    'exploration', 'serendipity', 'infinity', 'silhouette', 'wanderlust',
    'marvel', 'nostalgia', 'serenity', 'reflection', 'twilight', 'harmony',
    'symphony', 'solitude', 'essence', 'melancholy', 'melody', 'vision',
    'silence', 'whimsical', 'eternity', 'cathedral', 'embrace', 'poet', 'ricochet',
    'mountain', 'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo',
    'fantasy', 'radiant', 'serene', 'legend', 'starlight', 'light', 'pressure',
    'bread', 'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle',
    'film', 'jupiter'
];

let score = 0;
let timer = 15;
let currentWord = '';
let correctIndex = 0; // Number of correctly typed characters
let timerInterval;
const scoreBoard = [];

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', restartGame);
document.getElementById('word-input').addEventListener('input', checkWord);
document.addEventListener('keydown', restrictBackspace);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') endGame(); });

function startGame() {
    score = 0;
    timer = 15;
    correctIndex = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('timer').textContent = `Time Left: ${timer}s`;
    document.getElementById('start-btn').hidden = true;
    document.getElementById('restart-btn').hidden = false;
    document.getElementById('word-input').disabled = false;
    document.getElementById('word-input').value = '';
    document.getElementById('word-input').focus(); // Auto-focus on input field
    playMusic();
    loadNewWord();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (--timer <= 0) endGame();
    document.getElementById('timer').textContent = `Time Left: ${timer}s`;
}

function loadNewWord() {
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    document.getElementById('word-display').textContent = currentWord;
    correctIndex = 0; // Reset correct index for the new word
}

function checkWord() {
    const input = document.getElementById('word-input').value;
    
    if (input === currentWord.slice(0, input.length)) {
        correctIndex = input.length; // Update correct index if input is correct
        
        if (input === currentWord) { // If full word is correctly typed
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
            document.getElementById('word-input').value = '';
            loadNewWord();  // Loading a new word after the correct word is entered
        }
    } else {
        document.getElementById('word-input').value = currentWord.slice(0, correctIndex);
    }
}

function restrictBackspace(event) {
    const input = document.getElementById('word-input').value;
    if (event.key === 'Backspace' && input.length <= correctIndex) {
        event.preventDefault(); // Restriction on backspace if trying to delete correct letters
    }
}

function endGame() {
    clearInterval(timerInterval);
    stopMusic();
    document.getElementById('word-display').textContent = "Game Over!";
    document.getElementById('word-input').disabled = true;
    saveScore();
}

function restartGame() {
    endGame();
    startGame();
}

function saveScore() {
    const percentage = ((score / wordBank.length) * 100).toFixed(2);
    const newScore = new Score(new Date().toLocaleString(), score, percentage);
    scoreBoard.push(newScore);
}

class Score {
    constructor(date, hits, percentage) {
        this._date = date;
        this._hits = hits;
        this._percentage = percentage;
    }
    get date() { return this._date; }
    get hits() { return this._hits; }
    get percentage() { return this._percentage; }
}

function playMusic() {
    document.getElementById('background-music').play();
}

function stopMusic() {
    document.getElementById('background-music').pause();
    document.getElementById('background-music').currentTime = 0;
}