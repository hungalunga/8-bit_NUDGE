import MainQuizComplete from "../MainQuizComplete/MainQuizComplete";
import MainQuizIncorrect from "../MainQuizIncorrect/MainQuizIncorrect";
import MainQuizCorrect from "../MainQuizCorrect/MainQuizCorrect";
import MainQuizQuestion from "../MainQuizQuestion/MainQuizQuestion";
import "./MainQuizDisplay.css";

export default function MainQuizDisplay(props) {
	// to pass down to AnswerCheckbox
	// if question object is empty - question will try and find value, if it exists assign it, otherwise undefined/false
	// to grab the question to display

	// Sets the new results, new question when Next is pressed
	function handleNextClick() {
		props.setResultsValue(0);
		props.setQuestionNumber(props.questionNumber + 1);
		props.getRandomQuestion(props.questionSet);
	}

	// if the questionObject is empty, display loading
	if (props.questionObject && Object.keys(props.questionObject).length === 0) {
		return <div>loading...</div>;
	}

	if (props.questionObject) {
		// console.log("questionObject:", typeof questionObject);
		// console.log("question", question);
		console.log("correct_answer", props.questionObject.answer);
		console.log(props.questionObject);
		const questionObject = props.questionObject;

		if (props.resultsValue === 0) {
			return (
				<div className="mainQuiz">
					<MainQuizQuestion
						questionObject={questionObject}
						wrong_answers={questionObject.wrong_answers}
						id={questionObject.id}
						question={questionObject.question}
						correct_answer={questionObject.answer}
						questionNumber={props.questionNumber}
						setQuestionNumber={props.setQuestionNumber}
						incorrectAnswers={props.incorrectAnswers}
						setIncorrectAnswers={props.setIncorrectAnswers}
						resultsValue={props.resultsValue}
						setResultsValue={props.setResultsValue}
						quizScore={props.quizScore}
						setQuizScore={props.setQuizScore}
					/>
					<p>Score: {props.quizScore}</p>
				</div>
			);
		} else if (props.resultsValue === 1) {
			return (
				<div className="MainQuiz">
					<MainQuizCorrect
						nextMessage={props.nextMessage}
						handleNextClick={handleNextClick}
						quizScore={props.quizScore}
						setQuizScore={props.setQuizScore}
						totalScore = {props.totalScore}
						setTotalScore ={props.setTotalScore}
					/>
				</div>
			);
		} else if (props.resultsValue === -1) {
			return (
				<div className="MainQuiz">
					<MainQuizIncorrect
						questionObject={questionObject}
						nextMessage={props.nextMessage}
						handleNextClick={handleNextClick}
						quizScore={props.quizScore}
						setQuizScore={props.setQuizScore}
						totalScore = {props.totalScore}
						setTotalScore ={props.setTotalScore}
					/>
				</div>
			);
		} else {
			return (
				<div className="error">
					<p>ERROR didnt recieve a value of either 1,0 or -1</p>
				</div>
			);
		}
	} else {
		return (
			console.log("questionObject:", typeof questionObject),
			(
				<div className="MainQuiz">
					<MainQuizComplete 
						quizScore={props.quizScore}
						setQuizScore={props.setQuizScore}
						totalScore = {props.totalScore}
						setTotalScore ={props.setTotalScore}
					/>
				</div>
			)
		);
	}
}
