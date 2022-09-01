/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase(`Sissy that walk`),
            new Phrase(`She already done had herses`),
            new Phrase(`Sashay away`),
            new Phrase(`Shantay you stay`),
            new Phrase(`They call me mother`)
        ];
        this.activePhrase = null;
    }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */

    getRandomPhrase() {
        const phraseArrayLength = this.phrases.length
        const randomPhraseIndex = Math.floor( Math.random() * phraseArrayLength);
        return this.phrases[randomPhraseIndex];
    };

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */

    startGame() {
        const startScreen = document.getElementById('overlay');
        startScreen.className = 'start';
        startScreen.style.display = "none";

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        
    };

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */

    checkForWin(){
        const hiddenLetters = document.querySelectorAll('.hide');

        if ( hiddenLetters.length > 0 ) {
            return false
        } else {
            return true
        }
    };

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */

    removeLife() {
        const life = document.getElementById('scoreboard').children[0].children[this.missed].firstElementChild;
        const missSFX = new Audio('audio/Miss Sfx.mp3')

        if ( this.missed < 4 ) {
            missSFX.play();
            missSFX.volume = 0.5;
            life.src = "images/lostHeart.png";
        } else {
            life.src = "images/lostHeart.png";
            this.gameOver(false);
        }

        this.missed ++;
    };

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    
    gameOver(gameWon) {
        const gameOverColor = document.getElementById('overlay')
        const gameOverMessage = document.getElementById('game-over-message')

        gameOverColor.style.display = "flex";

        if (gameWon) {
            gameOverColor.className = 'win';
            gameOverMessage.innerHTML = `Condragulations <br> You're a winner, baby!`;
        } else {
            gameOverColor.className = 'lose';
            gameOverMessage.innerText = `You'd better step it up...`;
        }
    };     

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */

    handleInteraction(button) {
        const buttonLetter = button.innerText;
        const correctLetter = this.activePhrase.checkLetter(buttonLetter)

        button.disabled = true;

        if (correctLetter) {
            this.activePhrase.showMatchedLetter(buttonLetter);
            button.classList.add('chosen')
            if (this.checkForWin()) {
                this.gameOver(true);
            };
        } else {
            this.removeLife();
            button.classList.add('wrong')
        }
    };
}