// Page elements
const guessedList = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const input = document.querySelector(".letter");
const currentWord = document.querySelector(".word-in-progress");
const remainingText = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

// Word being guessed
let word = "magnolia";
let guessedLetters =  [];
let remainingGuesses = 8;

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

playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";

    guessedList.innerHTML = "";
    guessedList.classList.remove("hide");
    guessedLetters = [];
    
    remainingGuesses = 8;
    remainingText.innerHTML = `You have <span>${remainingGuesses} guesses</span> remaining.`
    remainingText.classList.remove("hide");

    button.classList.remove("hide");
    playAgain.classList.add("hide");

    getWord();
});

// -------------------------- Functions
const startOver = function () {
    button.classList.add("hide");
    remainingText.classList.add("hide");
    guessedList.classList.add("hide");

    playAgain.classList.remove("hide");
};

const getWord = async function () {
    const repo = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await repo.text();
    const wordArray = data.split("\n");  
    const index = Math.floor(Math.random() * wordArray.length);
    
    // assign random word
    word = wordArray[index].trim();

    addPlaceholders(word);
};

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
        updateLetters();
        updateCurrentWord(guessedLetters);
        countRemainingGuesses(upper);
    }
};

const updateLetters = function () {
    guessedList.innerHTML = "";

    for (let letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedList.append(li);
    }
};

const updateCurrentWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split('');

    let revealWord = "";

    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord += letter.toUpperCase();
        } else {
            revealWord += "●";
        }
    }

    currentWord.innerText = revealWord;
    wordGuessed();
};

const countRemainingGuesses = function (guess) {
    const wordUpper = word.toUpperCase();

    if (!wordUpper.includes(guess)) {
        message.innerText = "The hidden word does not contain this letter";
        remainingGuesses -= 1;
    } else {
        message.innerText = "You guessed correctly!";
    }

    if (remainingGuesses === 0) {
        message.innerText = "GAME OVER!";
        currentWord.innerText = wordUpper;
        remainingText.innerText = "No guesses remaining";

        startOver();
    } else {
        remainingSpan.innerText = remainingGuesses;
    }
}

const wordGuessed = function () {
    if (currentWord.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class=highlight">You guessed correct the word! Congrats!</p>';

        startOver();
    }
};

// Called on page load
getWord();