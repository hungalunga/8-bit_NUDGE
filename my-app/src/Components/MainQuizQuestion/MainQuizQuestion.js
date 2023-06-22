import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox";
import PromptQuestionTimer from "../PromptQuestionTimer/PromptQuestionTimer";
import { Card } from "primereact/card";

export default function MainQuizQuestion(props) {
	return (
		<>
			<Card className="big-card">{props.question}</Card>
			{/*<p className="question"></p>*/}
			{props.promptQuestionTimer && <PromptQuestionTimer />}
			<AnswerCheckbox
				questionObject={props.questionObject}
				question={props.question}
				// ^^send questionNumber props down to re-render after each answer
				incorrectAnswers={props.incorrectAnswers}
				setIncorrectAnswers={props.setIncorrectAnswers}
				resultsValue={props.resultsValue}
				setResultsValue={props.setResultsValue}
			/>{" "}
		</>
	);
}
