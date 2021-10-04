// Page elements
const guessedList = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const input = document.querySelector(".letter");
const currentWord = document.querySelector(".word-in-progress");
const remainingText = document.querySelector(".remaining");
const remainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

// Word being guessed
const word = "magnolia";

// -------------------------- Functions
const addPlaceholders = function (word) {
    let hiddenWord = "";
    const letterArray = word.split('');

    for (let letter of letterArray){
        hiddenWord += "●";
    }

    currentWord.innerText = hiddenWord;
};



addPlaceholders(word);