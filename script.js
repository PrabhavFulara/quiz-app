const questions = [
  {
    question: "Do you know who is Prabhav?",
    answers: [
      {Text: "Yes", correct: false},
      {Text: "No", correct: false},
      {Text: "I can never know", correct: false},
      {Text: "He is a smart & handsome guy.", correct: true},
    ]
  },
  {
    question: "What would Prabhav likely do if he found a time machine?",
    answers: [
      {Text: "Travel back and ace his JEE exam 💡", correct: false},
      {Text: "Visit his future self and ask for stock tips 📈", correct: false},
      {Text: "Go to the past and witness the birth of rock ‘n’ roll 🎶", correct: false},
      {Text: "Accidentally break the machine within 5 minutes 🛠️", correct: true},
    ]
  },
  {
    question: "If Prabhav could have a superpower, which one would he choose?",
    answers: [
      {Text: "Reading minds", correct: true},
      {Text: "Flying", correct: false},
      {Text: "Talking to animals", correct: false},
      {Text: "Turning into a guitar 🎸", correct: false},
    ]
  },
  {
    question: "What's his favourite Colour?",
    answers: [
      {Text: "Blue", correct: false},
      {Text: "Every Colour", correct: true},
      {Text: "Black", correct: false},
      {Text: "Yellow", correct: false},
    ]
  },
  
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score=0;
  nextButton.innerHTML = "Next";
  showQuestion()
}

function showQuestion(){

  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex+ 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer=>{
    const button = document.createElement("button");
    button.innerHTML = answer.Text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
     button.dataset.correct = answer.correct; 
    }
    button.addEventListener("click",selectAnswer);
  })
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild)
  }

}

function selectAnswer(e){
  const selectedBtn =  e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach(button=>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  
}
  nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex< questions.length){
      handleNextButton();
    }else{
      startQuiz();
    }
  });

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "Block";
  }
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
      showQuestion();
    }else{
      showScore();
    }
  }  
startQuiz();



function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  
  const countdownInterval = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = Math.floor(timer % 60);

    // Add leading zero if needed
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    // If the timer runs out, stop the interval
    if (--timer < 0) {
      clearInterval(countdownInterval);
      display.textContent = "Time's up!";
    }
  }, 1000);
}

// When the page loads, start a 5-minute countdown
window.onload = function () {
  const fiveMinutes = 60 * 1, // 5 minutes in seconds
        display = document.getElementById('countdown');
  
  startTimer(fiveMinutes, display);
};