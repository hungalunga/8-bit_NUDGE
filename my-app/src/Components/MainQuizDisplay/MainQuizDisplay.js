import MainQuizComplete from "../MainQuizComplete/MainQuizComplete";
import MainQuizIncorrect from "../MainQuizIncorrect/MainQuizIncorrect";
import MainQuizCorrect from "../MainQuizCorrect/MainQuizCorrect";
import MainQuizQuestion from "../MainQuizQuestion/MainQuizQuestion";
import "./MainQuizDisplay.css";
import { ProgressBar } from "primereact/progressbar";

export default function MainQuizDisplay(props) {
	const progressValue = (props.questionNumber / 3) * 100;
	// will need to change progressValue to be /10 when we have 10 questions
	console.log("progressValue:", progressValue);

	// Sets the new results, new question when Next is pressed
	function handleNextClick() {
		props.setResultsValue(0);
		props.getRandomQuestion(props.questionSet);
		if (props.resultsValue === 1) {
			props.setQuestionNumber(props.questionNumber + 1);
		}
	}

	// if the questionObject is empty, display loading
	if (props.questionObject && Object.keys(props.questionObject).length === 0) {
		return <div>loading...</div>;
	}

	if (props.questionObject) {
		//console.log(props.questionObject);
		// console.log("questionObject:", typeof questionObject);
		// console.log("question", question);
		console.log("correct_answer", props.questionObject.answer);
		const questionObject = props.questionObject;

		if (props.resultsValue === 0) {
			return (
				<>
					<div className="mainQuiz">
						<ProgressBar value={progressValue}></ProgressBar>
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
						/>
					</div>
				</>
			);
		} else if (props.resultsValue === 1) {
			return (
				<div className="MainQuiz">
					<ProgressBar value={progressValue}></ProgressBar>
					<MainQuizCorrect
						nextMessage={props.nextMessage}
						handleNextClick={handleNextClick}
					/>
				</div>
			);
		} else if (props.resultsValue === -1) {
			//props.setQuestionNumber(props.questionNumber - 1);
			return (
				<div className="MainQuiz">
					<ProgressBar value={progressValue}></ProgressBar>
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
