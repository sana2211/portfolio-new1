let score = 0; //Set score to 0
let point = 1; //Points per correct answer
let currentQuestion = 0;
let selectAnswer = 0;

let questions = [
  {
      question:'Who won the 2015 NBA Championship?',
      answers: [
        'A. Golden State Warriors',
        'B. Minnesota TimberWolves',
        'C. Chicago Bulls',
        'D. L.A Lakers'
        ],
        correctAnswer: '0', 
  },
  {
    question: 'Which Soccer player is called the Egyptian King?',
      answers: [
        'A. Harry kane',
        'B. Mohammad Salah',
        'C. Sadio Mane',
        'D. Tim Howard'],
      correctAnswer: '1',
    },
    {
      question: 'How many soccer players are on the field for each team?',
      answers: [
        'A. 12',
        'B. 7',
        'C. 10',
        'D. 11'],
      correctAnswer: '3',
    },
    {
      question: 'Which British driver has equalled Michael Schumacher number of race wins?',
      answers: [
        'A. Mike Hawthorne',
        'B. Lewis Hamilton',
        'C. Nigel Mansell',
        'D. James Hunt',
      ],
      correctAnswer: '1',
    },
    {
      question: 'What team won the very first NBA game?',
      answers: [
        'A. Chicago Stags',
        'B. Philadelphia Warriors',
        'C. Toronto Huskies',
        'D. New York Knicks',
      ],
      correctAnswer: '3',
    },
]

function renderCurrentQuestionAndAnswers(index)
{
  //We're clearing the main element 
  $("main").html("");
  //Render the question on the main element
 $("main").append(`
   <h3>${questions[index].question}</h3>`);
   //We created an <ul> to hold our answers A to D
 $("main").append("<ul>");
   //Then we created <li>'s for each answer A to D'
for (let i = 0; i < questions[index].answers.length; i++)
 {
   $("main").append(`
   <li><input type="radio" name="answers" value="${i}">${questions[index].answers[i]}</li>`);
 }
 //Then we close <ul>
  $("main").append("</ul>");
  
}

function startQuiz()
{
  console.log("currentQuestion: "+ currentQuestion);
  //we have a class name .start and with the "on" we're invoking an event function with click event handler
  $(".start").on("click", function(){
    renderCurrentQuestionAndAnswers(currentQuestion);
    currentQuestion++;
    $(".start").prop('disabled', true);
  });


}

function submitQuiz()
{
    $(".submit").on("click", function(){
     let selectedAnswer = $("input[name=answers]:checked").val();
     if(!selectedAnswer)
     {
       alert("Please select an option");
       return;
     }
     if(questions[currentQuestion - 1].correctAnswer == selectedAnswer) 
     {
       score++;
       $("#result").html("<br>Correct answer!");
     }
     else
     {
        $("#result").html("<br>Wrong answer!");
     }
  });
}

function nextQuestion()
{
    $(".continue").on("click", function(){
      $("#result").html("");
      if(currentQuestion == questions.length)
      {
        currentQuestion = 0;
         $(".start").hide();
         $(".submit").hide();
         $(".continue").hide();
         $("main").hide();
        //alert("No more questions \n score is " + score);
        $("#result").html(`<br><h3>Thanks for taking the Quiz</h3><h3><font color="blue">You score: ${score}</h3>
         <button class="restart">Restart Quiz Question</button>
        `);
        restartQuiz();
      }
    renderCurrentQuestionAndAnswers(currentQuestion);
    currentQuestion++;
    
  });
}

function restartQuiz()
{
  $(".restart").on("click", function(){
    $(".start").prop('disabled', false);
    $(".restart").hide();
    $(".start").show();
    $(".submit").show();
    $(".continue").show();
    $("main").show();
    $("#result").html("");
    init();
  })
 
}
function init()
{
  //Our events handlers can't work without the default function init
  startQuiz();
  submitQuiz();
  nextQuestion();
}
//invoke default function init with jQuery
$(init);