// Selectors for page elements

// Quiz Elements:
const timerEl = document.querySelector("#time");
const startDivEl = document.querySelector(".start-div");
const startButton = document.querySelector("button#start");
const questionDivEl = document.querySelector(".question-div");
const answerButtons = document.querySelector("div.buttons");
const questionEl = document.querySelector("#question");
const ans1El = document.querySelector("#ans-1")
const ans2El = document.querySelector("#ans-2")
const ans3El = document.querySelector("#ans-3")
const ans4El = document.querySelector("#ans-4")
const rightWrongEl = document.querySelector("#right-wrong");

// End of quiz elements:
const endDivEl = document.querySelector(".end-div");
const finalScoreEl = document.querySelector("#final-score");
const scoreForm = document.querySelector("#score-form");
const initialsInput = document.querySelector("#initials");

// Hall of Fame elements:
const scoresList = document.querySelector("#scores-list");
const hallOfFame = document.querySelector(".hall-of-fame");
const hofLink = document.querySelector("div#hof");
const clearHofBtn = document.querySelector("#clear");
const goBackHofBtn = document.querySelector("button#go-back");

// Quiz question bank. Questions sourced from:
// W3Schools JavaScript Quiz: https://www.w3schools.com/js/js_quiz.asp
const questionBank = [
    {
        question: "An if statement is an example of a...",
        possibleAns: ["a. Ternary operator", "b. Conditional", "c. Variable", "d. Boolean"],
        correctAns: 1
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        possibleAns: ["a. alert('Hello World');", "b. alertBox('Hello World');", "c. msg('Hello World');", "d. msgBox('Hello World');"],
        correctAns: 0
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        possibleAns: ["a. <script href='xxx.js'>", "b. <script name='xxx.js'>", "c. <script value='xxx.js'>", "d. <script src='xxx.js'>"],
        correctAns: 3
    },
    {
        question: "How do you create a function in JavaScript?",
        possibleAns: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. function=myFunction"],
        correctAns: 1
    },
    {
        question: "How do you write an IF statement in Javascript?",
        possibleAns: ["a. if (i === 5)", "b. if i = 5", "c. if i == 5 then", "d. if i = 5 then"],
        correctAns: 0
    },
    {
        question: "How do you write an IF statement for executing some code if 'i' is NOT equal to 5",
        possibleAns: ["a. if (i <> 5)", "b. if i =! 5 then", "c. if (i !== 5)", "d. if i <> 5"],
        correctAns: 2
    }

];


// initialize quiz variables

let questionIdx = 0;  // tracks the current question
let secondsLeft = 60; // tracks time left which also is the score
let timerInterval; // pointer to timer interval

// Quiz Functions

// Starts the quiz when the Start Quiz button is clicked
function startQuiz() {
    // hide start div
    startDivEl.setAttribute("style", "display: none;");
    // load first question from question bank
    displayQuestion();
    // show question div
    questionDivEl.setAttribute("style", "display: block;");
    // start timer
    startTimer();
}

// Event listener to start the quiz when the Start Quiz button is clicked
startButton.addEventListener("click", startQuiz);

// Starts the timer interval and displays time remaining on screen
function startTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--; // decrements time left
        timerEl.textContent = secondsLeft; // displays time left on top of screen
        // when timer runs out
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            // end the quiz
            endQuiz();
        }
    }, 1000)
}

// loads question into html elements
function displayQuestion() {
    currQuestion = questionBank[questionIdx]; // loads the current question from question bank
    questionEl.textContent = currQuestion.question; // puts question in the question heading
    // puts possible answers into answer buttons
    ans1El.textContent = currQuestion.possibleAns[0];
    ans2El.textContent = currQuestion.possibleAns[1];
    ans3El.textContent = currQuestion.possibleAns[2];
    ans4El.textContent = currQuestion.possibleAns[3];
}

// loads the next question from the question bank
function nextQuestion() {
    // checks to see if there are more questions in question bank
    // if there are more questions:
    if (questionIdx < questionBank.length - 1) {
        // increment the question index
        questionIdx++;
        // display the new question
        displayQuestion();
    } else {
        // no more questions left
        // display end screen after showing right or wrong for 0.5 second
        setTimeout(function () {
            endQuiz();
        }, 500)

    }
}

// checks answer and displays right or wrong
function checkAnswer(answer) {
    if (questionBank[questionIdx].correctAns == answer) {
        // answer is right
        // flash right message for 1 second
        rightWrongEl.setAttribute("class", "right");
        rightWrongEl.textContent = "Right!";
        rightWrongEl.setAttribute("style", "display: block;");
        setTimeout(function () {
            rightWrongEl.setAttribute("style", "display: none;");
        }, 1000);
    } else {
        // answer is wrong
        // subtract time from clock
        secondsLeft -= 10;
        // flash wrong message for 1 second
        rightWrongEl.setAttribute("class", "wrong")
        rightWrongEl.textContent = "Wrong.";
        rightWrongEl.setAttribute("style", "display: block;");
        setTimeout(function () {
            rightWrongEl.setAttribute("style", "display: none;");
        }, 1000);
    }
    // loads the next question
    nextQuestion();
}

// Event listener for the four answer buttons - runs checkAnswer to check for right/wrong
answerButtons.addEventListener("click", function () {
    const element = event.target;
    if (element.matches("button")) {
        checkAnswer(element.value);
    }
})




// End the quiz - when time runs out or there are no more questions, this function is called
function endQuiz() {
    clearInterval(timerInterval); // clears the timer interval
    timerEl.textContent = 0; // sets the timer display to 0

    // make sure score is not a negative number
    if (secondsLeft < 0) {
        secondsLeft = 0;
    }

    finalScoreEl.textContent = secondsLeft;// displays the seconds left as the score
    questionDivEl.setAttribute("style", "display: none;"); // hides the question div
    endDivEl.setAttribute("style", "display: block;"); // shows the end of quiz div

}

// Hall of Fame 

// initialize array to hold hall of fame listings: objects containing initials and scores which will be loaded from localStorage

let scores = [];

// Helper function used to compare scores in order to sort them in decending order
// Object sorting code found at Quick Tip: How to Sort and Array of Objects
// in JavaScript https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
function compareScores(a, b) {
    const score1 = a.score;
    const score2 = b.score;

    let compare = 0;
    if (score1 < score2) {
        compare = 1;
    } else if (score1 > score2) {
        compare = -1
    };
    return compare;
}

// displays score ranking on Hall of Fame screen
function renderScores() {
    // hide other divs - question, end, start 
    questionDivEl.setAttribute("style", "display: none;");
    endDivEl.setAttribute("style", "display: none;");
    startDivEl.setAttribute("style", "display: none;");

    // clear current scores on page
    scoresList.innerHTML = "";

    // sort scores in order from highest to lowest
    scores.sort(compareScores);

    // render scores on page in LIs
    for (let i = 0; i < scores.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${scores[i].initials} - ${scores[i].score}`;
        scoresList.appendChild(li);
    }
    // show Hall of Fame div
    hallOfFame.setAttribute("style", "display: block;");
}

// updates localStorage with content of scores array
function storeScore() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

// checks for scores in localStorage and loads them into scores array
function loadScores() {
    const storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores) {
        scores = storedScores;
    }
}

// Load any high scores from local Storage before beginning the quiz
loadScores();

// Click listeners on Hall of Fame buttons

// Clear the Hall of Fame listing of all scores button
clearHofBtn.addEventListener("click", function () {
    localStorage.clear();
    scores = [];
    renderScores();
})

// Go back to the start screen button
goBackHofBtn.addEventListener("click", function () {
    // clear timer
    clearInterval(timerInterval);
    // initialize quiz variables
    questionIdx = 0;
    secondsLeft = 60;
    // display seconds left
    timerEl.textContent = secondsLeft;
    // hide Hall of Fame div and show Start div
    hallOfFame.setAttribute("style", "display: none;");
    startDivEl.setAttribute("style", "display: block;");
})

// Event listener for submitting Hall of Fame listing - initials and score
scoreForm.addEventListener("submit", function () {
    event.preventDefault();
    const initials = initialsInput.value.trim();
    // check to make sure form is not blank
    if (!initials) {
        return;
    }
    // create object with initials and score 
    const initialsScore = { initials: initials, score: secondsLeft };

    // add initials and score to scores array
    scores.push(initialsScore);

    // clear initials text input
    initialsInput.value = "";

    // update localStorage with scores array
    storeScore();
    // display Hall of Fame with scores listing
    renderScores();
})

// Event listener on Hall of Fame link at top of page to display the Hall of Fame screen
hofLink.addEventListener("click", function () {
    // clear timer if there is one
    clearInterval(timerInterval);
    // render the hall of fame score listing on the screen
    renderScores();
})










