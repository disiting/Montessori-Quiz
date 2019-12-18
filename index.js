'use strict';

//results tracking variables
let questionNumber = 0;
let score = 0;

//question database
const STORE = [
  {
    question: "1. When was the Montessori schooling system invented?",
    options: [
      "In 2000s",
      "In early 1900s",
      "In late 1900s",
      "It is still emerging"
    ],
    answer: "In early 1900s"
  },
  {
    question: "2. What is one of the key principles of Montessori education?",
    options: [
      "Children learn to memorize a lot of material quickly",
      "Children learn from the smartest and most experienced teachers in town",
      "Children learn a lot of tricks to do math and read quickly",
      "Children learn from hands-on activities and decide on their lessons themselves"
    ],
    answer: "Children learn from hands-on activities and decide on their lessons themselves"
  },
  {
    question: "3. What is the role of the teacher in a Montessori classroom?",
    options: [
      "A guide who observes and creates an environment for the child to explore and learn independently",
      "Teaches in front of the class but children are free to join whenever they want",
      "Teaches according to the curriculum and provides tutoring as extra help",
      "Teaches in front of the class and makes sure everyone is interested and is paying attention"
    ],
    answer: "A guide who observes and creates an environment for the child to explore and learn independently"
  },
  {
    question: "4. How is student achievement measured?",
    options: [
      "Children get daily report cards",
      "Children get weekly report cards",
      "There are no grades. Teachers discuss each student's progress in personal narratives added to portfolios",
      "There are no grades. Children self-report their progress"
    ],
    answer: "There are no grades. Teachers discuss each student's progress in personal narratives added to portfolios"
  },
  {
    question: "5. What is the grade-level structure?",
    options: [
      "Levels are divided by age. Children go to the next level every year",
      "Classroom has mixed ages: 3-6, 6-9, 9-12, 12-14 year-olds",
      "There are only 3 grades: elementary, middle and high-school-level",
      "All children study in the same classroom but choose their own materials"
    ],
    answer: "Classroom has mixed ages: 3-6, 6-9, 9-12, 12-14 year-olds"
  },
  {
    question: "6. Which is not true about the Montessori method?",
    options: [
      "Manners and being polite are part of the curriculum",
      "Children don't have desks",
      "Work sessions are short with frequent breaks in between to let children explore the materials",
      "Practical life skills, like pouring water and cleaning, are part of the curriculum"
    ],
    answer: "Work sessions are short with frequent breaks in between to let children explore the materials"
  },
  {
    question: "7. Montessori schools are",
    options: [
      "affiliated with the Catholic Church",
      "for kids with learning disabilities",
      "for gifted kids",
      "for all kids"
    ],
    answer: "for all kids"
  },
  {
    question: "8. Who attended a Montessori school?",
    options: [
      "Sergey Brin & Larry Page, Jeff Bezos, Bill Gates",
      "Elon Musk, Steve Jobs, Tim Cook",
      "Barack Obama, Donald Trump, George W Bush",
      "Albert Einstein, Richard Feynman, Stephen Hawking"
    ],
    answer: "Sergey Brin & Larry Page, Jeff Bezos, Bill Gates"
  },
  {
    question: "9.Can I do Montessori at home with my child?",
    options: [
      "No, only a trained Montessori teacher can implement Montessori principles",
      "Yes, by creating the environment according to the Montessori philosophy and following the child's interest",
      "Yes, if you buy the correct materials from a licensed Montessori store",
      "No, a parent cannot be a teaching guide according to Montessori"
    ],
    answer: "Yes, by creating the environment according to the Montessori philosophy and following the child's interest"
  },
  {
    question: "10. Why is Montessori education beneficial?",
    options: [
      "Children are happier when they have less structure and play more",
      "Children's progress is assessed frequently so that they stay on track",
      "It helps children reach their fullest potential at their own pace without competing with others",
      "Children can use their Montessori connections in their future career"
    ],
    answer: "It helps children reach their fullest potential at their own pace without competing with others"
  }
];

//this function starts the quiz
function handleStartClick() {
  $('.js-start-button').on('click', function(event) {
		console.log("handleStartClick() ran");
		$('.progress-score').show();
		$('.start-quiz').hide();
		renderQuestionForm(); 
	});
}

function renderQuestionForm() {
  let question = STORE[questionNumber];
  //updateQuestionAndScore();
  const questionHtml = $(`

  <div class="quiz-questions">
    <form class="question-form">
      <p>${question.question}</p>
      <ul class="question-options"></ul>
      <div class="btns"><input type="submit" value="Submit Answer" class="button js-submit-button"></div>
    </form>	
  </div>`);
  $("main").html(questionHtml);
  addOptions();
  updateProgress();
}

function addOptions()
{
  let question = STORE[questionNumber];
  for(let i=0; i<question.options.length; i++)
  {
    $('.question-options').append(`
      <li>  
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
        <label for="option${i+1}"> ${question.options[i]}</label> <br/>
        <span id="feedback_option${i+1}"></span>
      </li>
    `);
  }
  
}

function handleSubmitClick() {
  $('body').on("submit",'.question-form', function(event) {
    
    event.preventDefault();
    let selected = $('input:checked');
    let feedback = $('#feedback_' + selected.attr('id'));
    let answerChoice = selected.val();
    if (!answerChoice) {
      alert("Choose your answer");
      return;
    }
    let correct = STORE[questionNumber].answer;
    if (answerChoice === correct) {
      feedback.html('Yes! This is correct');
      feedback.addClass('feedback correct');
      score++;
    } else {
      feedback.html('No, the answer is, "' + correct + '"');
      feedback.addClass('feedback wrong');
    }
    $('.btns').html('<input type="button" value="Next" class="button js-next-button">')
    updateProgress();
    $("input[type=radio]").attr('disabled', true);
  });
}

function handleNextClick() {
  $('body').on('click', '.js-next-button', function (event) {
    questionNumber++;
    if (questionNumber < STORE.length) {
      renderQuestionForm();
    } else {
      renderOver();
    }
  });
}

function handleStartOverClick() {
  $('body').on('click', '.js-startover-button', function (event) {
    questionNumber=0;
    score=0;
    renderQuestionForm();
  });
}


function updateProgress() {
  const html = $(`<ul>
      <li>Question: ${questionNumber + 1}/${STORE.length}</li>
      <li>Score: ${score}/${STORE.length}</li>
    </ul>`);
  $('.progress-score').html(html);
}

function renderOver() {
  const overHtml = $(`
  <section class="start-over">
    <p>Your Score is ${score}/${STORE.length}</p>
    <input type="button" value="Start Over" class="button js-startover-button">
  </section>`);
  $("main").html(overHtml);
}



function runQuizApp() {
  handleStartClick();
  handleSubmitClick();
  handleNextClick();
  handleStartOverClick();
}

$(runQuizApp);