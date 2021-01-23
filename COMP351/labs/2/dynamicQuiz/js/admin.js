var myQuestions = []
var setQues=[];
var setQuesAgain=[];

if(myQuestions.length === 0){
	for(var i=0; i<localStorage.length; i++){
		setQuesAgain[i] = JSON.parse(localStorage.getItem('Ques'+i));
		myQuestions.push(setQuesAgain[i])
	}
}

function saveQuestion(){
	var questionObject = {
		question: "",
		answers: {},
		correctAnswer: "",
	}

	questionObject.question = document.getElementById('question').value;

		questionObject.answers.a = document.getElementById('answer-op1').value;
		questionObject.answers.b = document.getElementById('answer-op2').value;
		questionObject.answers.c = document.getElementById('answer-op3').value;
		questionObject.answers.d = document.getElementById('answer-op4').value;

	var radios = document.getElementsByName('ansOption');
        var val= "";
        for (var j = 0, length = radios.length; j < length; j++) {
        	if (radios[j].checked) {
            	val = radios[j].value; 
                break;
            }	
		}
		questionObject.correctAnswer= val;
	myQuestions.push(questionObject);

	for(var i=0; i<myQuestions.length; i++){
		setQues[i] = JSON.stringify(myQuestions[i]);
		localStorage.setItem('Ques'+[i], setQues[i])
	}
}

function deleteQuestion(){
	myQuestions.pop();
	var i = localStorage.length;
	i--;
	localStorage.removeItem('Ques'+[i]);
}

var quizContainer = document.getElementById('QuestionsTillNow');
let Ques=[];
let quizQuestions = [];

for(var i=0; i<localStorage.length; i++){
    Ques[i] = localStorage.getItem('Ques'+[i]);
    Ques[i] = JSON.parse(Ques[i])
    quizQuestions.push(Ques[i])
}

function showQuestions(questions, quizContainer){
	var output = [];
	var answers;

	for(var i=0; i<questions.length; i++){
		answers = [];

		for(letter in questions[i].answers){
			answers.push(
				'<label>'
				+ letter + ': '
				+ questions[i].answers[letter]
			+ '</ 	label> <br />'
			);
		}
		output.push(
			'<div class="questionView"> Q'+[i +1]+' : ' + questions[i].question + '</div>'
			+ '<div class="answersView">' + answers.join('') + '</div>'
		);
	}
	quizContainer.innerHTML = output.join('');
}

showQuestions(quizQuestions, quizContainer)