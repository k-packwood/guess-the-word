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

const guessedLetters =  [];

// -------------------------- Event listeners 
button.addEventListener("click", function (e){
    e.preventDefault();

    const text = input.value;
    input.value = "";

    message.innerText = "";
    
    if (validateInput(text) != null) {
        makeGuess(text);
    }    
});

// -------------------------- Functions
const addPlaceholders = function (word) {
    let hiddenWord = "";
    const letterArray = word.split('');

    for (let letter of letterArray){
        hiddenWord += "●";
    }

    currentWord.innerText = hiddenWord;
};

const validateInput = function (inputText) {
    const regex = /[a-zA-Z]/;

    if (inputText === ""){
        message.innerText = "Enter a letter"; 
    } else if (inputText.length > 1) {
        message.innerText = "Enter one letter at a time";
    } else if (!inputText.match(regex)) {
        message.innerText = "This is not a valid letter"
    } else {
        return inputText;
    }
};

const makeGuess = function (letter) {
    var upper = letter.toUpperCase();
    if (guessedLetters.includes(upper)){
        message.innerText = "You've already guessed this letter. Try another!"
    } else {
        guessedLetters.push(upper);
    }

    console.log(guessedLetters);
};

addPlaceholders(word);