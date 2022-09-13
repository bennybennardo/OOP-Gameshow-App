/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = '';
const startButton = document.getElementById('btn__reset');
const startScreen = document.getElementById('overlay');
const listParent = document.getElementById('phrase').firstElementChild;
const lives = document.getElementById('scoreboard').firstElementChild.children;
const keys = document.querySelectorAll('.key')

const startSFX = new Audio('audio/Start Game SFX.mp3')
const winSFX = new Audio('audio/Win SFX.mp3')
const loseSFX = new Audio('audio/Lose SFX.mp3')
const startBGM = new Audio('audio/Start Screen BGM.mp3')
const gameplayBGM = new Audio('audio/Gameplay BGM.mp3')
const winBGM = new Audio('audio/Winner BGM.mp3')
const loseBGM = new Audio('audio/Loser BGM.mp3')


/**
* Prepares the board for a new game
*/

function resetGame() {
    listParent.replaceChildren();

    for (key of keys) {
        key.disabled = false;
        key.className = "key";
    }

    for (life of lives) {
        life.firstElementChild.src = "images/liveHeart.png";
    }

    startSFX.play();
    game = new Game();
    game.startGame();
}

/**
* These set/reset the board upon clicking the start button, enter key, or space key.
* The enter and space keys will only reset the board in between games.
*/

startButton.addEventListener('click', () => resetGame());

document.addEventListener('keypress', e => {
    if (startScreen.style.display === 'flex') {
        if (e.key === 'Enter' || e.key === ' ') {
        resetGame();
        }
    }
});

/**
* Enables the user to interact with the keys both by clicking and typing.
*/

for (key of keys) {

    key.addEventListener('click', e => {
        game.handleInteraction(e.target);

    })
};

document.addEventListener('keydown', e => {
    
    for (key of keys) {

        if (e.key === key.innerText) {
            game.handleInteraction(key);
        }
    }
});

/**
* Audio player based on changes in overlay screen class.
*/

function toggleBGM(screenClassChange) {
    screenClassChange.forEach(change => {
        let overlayClass = change.target.className;

        if (overlayClass === 'start'){
            winBGM.pause();
            loseBGM.pause();
            gameplayBGM.play();
            gameplayBGM.loop = true;
            gameplayBGM.volume = 0.5;

        } else if (overlayClass === 'win') {
            gameplayBGM.pause();
            winSFX.play();
            winSFX.volume = 0.5;
            winBGM.play();
            winBGM.loop = true;
            winBGM.volume = 0.25;

        } else if (overlayClass === 'lose') {
            gameplayBGM.pause();
            loseSFX.play();
            loseSFX.volume = 0.5;
            loseBGM.play();
            loseBGM.loop = true;
            loseBGM.volume = 0.5;
        }

    })
}

const changeObserver = new MutationObserver(toggleBGM)

changeObserver.observe(
    startScreen,
    { attributes: true }
)