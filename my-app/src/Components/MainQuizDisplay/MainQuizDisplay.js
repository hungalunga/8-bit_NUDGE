import MainQuizComplete from "../MainQuizComplete/MainQuizComplete";
import MainQuizIncorrect from "../MainQuizIncorrect/MainQuizIncorrect";
import MainQuizCorrect from "../MainQuizCorrect/MainQuizCorrect";
import MainQuizQuestion from "../MainQuizQuestion/MainQuizQuestion";
import "./MainQuizDisplay.css";

export default function MainQuizDisplay(props) {
	const questionObject = props.questionObject; // to pass down to AnswerCheckbox
	// if question object is empty - question will try and find value, if it exists assign it, otherwise undefined/false
	const question = props?.questionObject?.question; // to grab the question to display

	// Sets the new results, new question when Next is pressed
	function handleNextClick() {
		props.setResultsValue(0);
		props.setQuestionNumber(props.questionNumber + 1);
		props.getRandomQuestion(props.questionSet);
	}

	// if the questionObject is empty, display loading
	if (props.questionObject && Object.keys(questionObject).length === 0) {
		return <div>loading...</div>;
	}

	if (props.questionObject) {
		// console.log("questionObject:", typeof questionObject);
		// console.log("question", question);
		console.log("correct_answer", questionObject.answer);
		console.log(props.questionObject)

		if (props.resultsValue === 0) {
			return (
				<div className="mainQuiz">
					<MainQuizQuestion
						question={question}
						questionObject={questionObject}
						incorrectAnswers={props.incorrectAnswers}
						setIncorrectAnswers={props.setIncorrectAnswers}
						resultsValue={props.resultsValue}
						setResultsValue={props.setResultsValue}
					/>
				</div>
			);
		} else if (props.resultsValue === 1) {
			return (
				<div className="MainQuiz">
					<MainQuizCorrect
						nextMessage={props.nextMessage}
						handleNextClick={handleNextClick}
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
					<MainQuizComplete />
				</div>
			)
		);
	}
}
