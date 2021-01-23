var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

let Ques=[];
let quizQuestions = [];

for(var i=0; i<localStorage.length; i++){
    Ques[i] = localStorage.getItem('Ques'+[i]);
    Ques[i] = JSON.parse(Ques[i])
    quizQuestions.push(Ques[i])
}

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
    function showQuestions(questions, quizContainer){
        var output = [];
        var answers;

        for(var i=0; i<questions.length; i++){
            answers = [];

            for(letter in questions[i].answers){
                answers.push(
                    '<label>'
					+ '<input type="radio" name="question'+i+'" class="ansOption" value="'+letter+'">'
					+ letter + ': '
					+ questions[i].answers[letter]
				+ '</label> <br />'
                );
            }
            output.push(
                '<div class="question">Q'+[i +1]+' : '  + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }
        quizContainer.innerHTML = output.join('');
    }

    function showResults(questions, quizContainer, resultsContainer){

        var answerContainers = quizContainer.querySelectorAll('.answers');
        var userAnswer = '';
        var numCorrect = 0;

        for(var i=0; i<questions.length; i++){
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

            if(userAnswer===questions[i].correctAnswer){
    
                numCorrect++;
            
                answerContainers[i].style.color = 'green';
            }
            else{
                answerContainers[i].style.color = 'red';
            }
        }
        resultsContainer.innerHTML = "Result: " +  numCorrect + ' out of ' + questions.length;
    }

    showQuestions(questions, quizContainer);
    submitButton.onclick = () =>showResults(questions, quizContainer, resultsContainer);
	
}

generateQuiz(quizQuestions, quizContainer, resultsContainer, submitButton);