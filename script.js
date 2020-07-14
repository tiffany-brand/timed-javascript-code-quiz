let timerEl = document.querySelector("#time");
let startDivEl = document.querySelector(".start-div");
let startButton = document.querySelector("button#start");
let questionDivEl = document.querySelector(".question-div");
let answerButtons = document.querySelector("div.buttons");
let questionEl = document.querySelector("#question");
let ans1El = document.querySelector("#ans-1")
let ans2El = document.querySelector("#ans-2")
let ans3El = document.querySelector("#ans-3")
let ans4El = document.querySelector("#ans-4")
let rightWrongEl = document.querySelector("#right-wrong");
let endDivEl = document.querySelector(".end-div");
let finalScoreEl = document.querySelector("#final-score");
let scoreForm = document.querySelector("#score-form");
let initialsInput = document.querySelector("#initials");
let scoresList = document.querySelector("#scores-list");
let hallOfFame = document.querySelector(".hall-of-fame");
let hofLink = document.querySelector("div#hof");


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
    }
];

let questionIdx = 0;
let secondsLeft = 60;
let timerInterval;

function startQuiz() {
    // hide start page
    startDivEl.setAttribute("style", "display: none;");
    // display first question
    displayQuestion();
    questionDivEl.setAttribute("style", "display: block;");
    // start timer
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            // call end quiz function
            endQuiz();
        }
    }, 1000)
}

function displayQuestion() {
    currQuestion = questionBank[questionIdx];
    questionEl.textContent = currQuestion.question;
    ans1El.textContent = currQuestion.possibleAns[0];
    ans2El.textContent = currQuestion.possibleAns[1];
    ans3El.textContent = currQuestion.possibleAns[2];
    ans4El.textContent = currQuestion.possibleAns[3];
}

function checkAnswer(answer) {
    if (questionBank[questionIdx].correctAns == answer) {
        // right

        // flash right message for 1 second
        rightWrongEl.setAttribute("class", "right");
        rightWrongEl.textContent = "Right!";
        rightWrongEl.setAttribute("style", "display: block;");
        setTimeout(function () {
            rightWrongEl.setAttribute("style", "display: none;");
        }, 1000);
        console.log("right");
    } else {
        // wrong

        // subtract time from clock
        secondsLeft -= 10;
        // flash wrong message for x seconds
        rightWrongEl.setAttribute("class", "wrong")
        rightWrongEl.textContent = "Wrong.";
        rightWrongEl.setAttribute("style", "display: block;");
        setTimeout(function () {
            rightWrongEl.setAttribute("style", "display: none;");
        }, 1000);
        console.log("wrong");
    }

    nextQuestion();
}

function nextQuestion() {
    if (questionIdx < questionBank.length - 1) {
        // increment questionId
        questionIdx++;
        // call displayQuestion(questionId)
        displayQuestion();
    } else {
        // display end screen after showing right or wrong
        setTimeout(function () {
            endQuiz();
        }, 1000)

    }
}

function endQuiz() {
    clearInterval(timerInterval);
    timerEl.textContent = 0;
    finalScoreEl.textContent = secondsLeft;
    questionDivEl.setAttribute("style", "display: none;");
    endDivEl.setAttribute("style", "display: block;");

}

// Hall of Fame 

let scores = [];

// Function used to compare scores in order to sort them in decending order
// Object sorting code and explanation found at Quick Tip: How to Sort and Array of Objects
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

function renderScores() {
    // hide other screens 
    questionDivEl.setAttribute("style", "display: none;");
    endDivEl.setAttribute("style", "display: none;");
    startDivEl.setAttribute("style", "display: none;");

    // clear current scores on page
    scoresList.innerHTML = "";

    // sort scores in order from highest to lowest
    scores.sort(compareScores);
    // render scores on page in LIs
    for (let i = 0; i < scores.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scores[i].initials} - ${scores[i].score}`;
        scoresList.appendChild(li);
    }
    // show Hall of Fame Screen
    hallOfFame.setAttribute("style", "display: block;");

}

function storeScore() {
    // add initials and score
    localStorage.setItem("scores", JSON.stringify(scores));
}

function loadScores() {
    // check for scores in local Storage
    const storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores) {
        scores = storedScores;
    }

}

scoreForm.addEventListener("submit", function () {
    event.preventDefault();
    let initials = initialsInput.value.trim();

    if (!initials) {
        return;
    }


    let initialsScore = { initials: initials, score: secondsLeft };

    scores.push(initialsScore);

    storeScore();
    renderScores();
})


// Load any high scores from local Storage before beginning the quiz
loadScores();

answerButtons.addEventListener("click", function () {
    let element = event.target;
    if (element.matches("button")) {
        console.log(element.value);
        checkAnswer(element.value);
    }
})

hofLink.addEventListener("click", function () {
    renderScores();
})

startButton.addEventListener("click", startQuiz);



