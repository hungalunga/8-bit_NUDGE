import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox";
import PromptQuestionTimer from "../PromptQuestionTimer/PromptQuestionTimer";
import "primeicons/primeicons.css";
import { Card } from "primereact/card";

export default function MainQuizQuestion(props) {
  console.log("props.questionObject:", props.questionObject);
  return (
    <>
      <Card className="big-card">{props.question}
      <p><i className=" pi pi-volume-up" style={{ fontSize: '1.75rem' }}></i></p>
      </Card>
      {/*<p className="question"></p>*/}
      {props.promptQuestionTimer && <PromptQuestionTimer />}
      <AnswerCheckbox
        quizScore={props.quizScore}
        setQuizScore={props.setQuizScore}
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
