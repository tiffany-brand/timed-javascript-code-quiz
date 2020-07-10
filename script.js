let answerButtons = document.querySelector("div.buttons");
let questionEl = document.querySelector("#question");
let ans1El = document.querySelector("#ans-1")
let ans2El = document.querySelector("#ans-2")
let ans3El = document.querySelector("#ans-3")
let ans4El = document.querySelector("#ans-4")
let rightWrongEl = document.querySelector("#right-wrong");


const questionBank = [
    {
        question: "An if statement is an example of a...",
        possibleAns: ["a. Ternary operator", "b. Conditional", "c. Variable", "d. Boolean"],
        correctAns: 1
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        possibleAns: ["alert('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "msgBox('Hello World');"],
        correctAns: 0
    }
];

let questionId = 0;

function displayQuestion(id) {
    questionEl.textContent = questionBank[id].question;
    ans1El.textContent = questionBank[id].possibleAns[0];
    ans2El.textContent = questionBank[id].possibleAns[1];
    ans3El.textContent = questionBank[id].possibleAns[2];
    ans4El.textContent = questionBank[id].possibleAns[3];
}

function checkAnswer(id, answer) {
    if (questionBank[id].correctAns == answer) {
        // right

        // add points to score

        // flash right message for x seconds
        rightWrongEl.setAttribute("class", "right");
        rightWrongEl.textContent = "Right!";
        rightWrongEl.setAttribute("style", "display: block;");
        setTimeout(function () {
            rightWrongEl.setAttribute("style", "display: none;")
        }, 2000);
        console.log("right");
    } else {
        // wrong

        // subtract time from clock

        // flash wrong message for x seconds
        rightWrongEl.setAttribute("class", "wrong")
        rightWrongEl.textContent = "Wrong.";
        rightWrongEl.setAttribute("style", "display: block;")
        setTimeout(function () {
            rightWrongEl.setAttribute("style", "display: none;")
        }, 2000);
        console.log("wrong");


    }
}

function nextQuestion() {
    // increment questionId
    // call displayQuestion(questionId)
}

answerButtons.addEventListener("click", function () {
    console.log(event);
    if (event.target.matches("button")) {
        console.log(event.target.value);
        checkAnswer(questionId, event.target.value);
    }
})

displayQuestion(questionId);
// checkAnswer(questionId, 0);