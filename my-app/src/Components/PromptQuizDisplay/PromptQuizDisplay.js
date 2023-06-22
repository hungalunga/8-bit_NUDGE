import { useState } from "react";
import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox";
import PromptQuestionTimer from "../PromptQuestionTimer/PromptQuestionTimer";
import PromptQuizCorrect from "../PromptQuizCorrect/PromptQuizCorrect";
import PromptQuizIncorrect from "../PromptQuizIncorrect/PromptQuizIncorrect";
import { Card } from "primereact/card";

export default function PromptQuizDisplay(props) {
	const [withinTime, setWithinTime] = useState(true);
    const [seconds, setSeconds] = useState(10);

	const questionObject = props.questionObject; // to pass down to AnswerCheckbox
	const question = questionObject.question; // to grab the question to display

	// Sets the new results, new question when Next is pressed

	// if the questionObject is empty, display loading
	if (props.questionObject && Object.keys(props.questionObject).length === 0) {
		return <div>loading...</div>;
	}

	if (typeof props.questionObject === "object" && props.resultsValue === 0) {
		return (
			<div className="mainQuiz">
				<Card className="big-card">{question}</Card>
				{/*<p className="question"></p>*/}
				{props.promptQuestionTimer && <PromptQuestionTimer seconds={seconds} setSeconds={setSeconds}/>}
				<AnswerCheckbox
					questionObject={questionObject}
					wrong_answers={questionObject.wrong_answers}
					id={questionObject.id}
					question={questionObject.question}
					correct_answer={questionObject.answer}
					questionNumber={props.questionNumber}
					setQuestionNumber={props.setQuestionNumber}
					// ^^send questionNumber props down to re-render after each answer
					resultsValue={props.resultsValue}
					setResultsValue={props.setResultsValue}
					incorrectAnswers={props.incorrectAnswers}
					setIncorrectAnswers={props.setIncorrectAnswers}
					setWithinTime={setWithinTime}
					withinTime={withinTime}
					seconds={seconds}
				/>
			</div>
		);
	} else if (props.resultsValue === 1) {
		return (
			<div className="MainQuiz">
				<PromptQuizCorrect  withinTime={withinTime} seconds={seconds} />
			</div>
		);
	} else if (props.resultsValue === -1) {
		return (
			<div className="MainQuiz">
				<PromptQuizIncorrect
					questionObject={questionObject}
                    withinTime={withinTime}
                    seconds={seconds}
				/>
			</div>
		);
	} else {	
	}
}
