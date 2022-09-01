/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
    * Display phrase on game board
    */

    addPhraseToDisplay() {

        const phraseLetters = this.phrase.split('');
        const listParent = document.getElementById('phrase').firstElementChild;

        phraseLetters.forEach(character => {
            let li = document.createElement('li');
            li.innerText = character;

            if (li.innerText === ' ') {
                li.classList.add(`space`)
            } else {
                li.classList.add(`hide`, `letter`, `${character}`)
            }

            listParent.appendChild(li);
        })
        
    }

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */

    checkLetter(letter) {

        let phraseLetters = this.phrase.split('');
        return phraseLetters.includes(letter)

    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */

    showMatchedLetter(letter) {

        let letterMatch = game.activePhrase.checkLetter(letter)
        let matchSFX = new Audio('audio/Correct SFX.mp3')

        if ( letterMatch === true) {
            let lettersToBeDisplayed = document.getElementsByClassName(`${letter}`)
            matchSFX.play();

            for ( letter of lettersToBeDisplayed) {
                letter.classList.remove('hide');
                letter.classList.add('show');
            };

        };

    };

};