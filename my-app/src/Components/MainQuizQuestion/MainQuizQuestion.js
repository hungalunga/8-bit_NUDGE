import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox";
import PromptQuestionTimer from "../promptQuestionTimer/PromptQuestionTimer";
import { Card } from "primereact/card";

export default function MainQuizQuestion(props) {
	console.log("props.questionObject:", props.questionObject);
	return (
		<>
			<Card className="big-card">{props.question}</Card>
			{/*<p className="question"></p>*/}
			{props.promptQuestionTimer && <PromptQuestionTimer />}
			<AnswerCheckbox
				questionObject={props.questionObject}
						wrongAnswers={props.questionObject.wrong_answers}
						id={props.questionObject.id}
						question={props.questionObject.question}
						correctAnswer={props.questionObject.answer}
						questionNumber={props.questionNumber}
						setQuestionNumber={props.setQuestionNumber}
						incorrectAnswers={props.incorrectAnswers}
						setIncorrectAnswers={props.setIncorrectAnswers}
						resultsValue={props.resultsValue}
						setResultsValue={props.setResultsValue}
						withinTime={props.withinTime}
						setWithinTime={props.setWithinTime}
			/>
		</>
	);
}

