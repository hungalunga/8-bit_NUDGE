import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox"
import { Button } from "primereact/button";

export default function QuestionDisplay(props) {

// Sets the new results, new question when Next is pressed
function handleNextClick(){
    props.setResultsValue(0);
    props.setQuestionNumber(props.questionNumber + 1)
    props.getRandomQuestion(props.questionSet);
}

// if the questionObject is empty, display loading
if (props.questionObject && Object.keys(props.questionObject).length === 0) {
    return <div>loading...</div>;
  }

if (typeof props.questionObject === 'object') {
    console.log("questionObject:", typeof props.questionObject)
    const questionObject = props.questionObject; // to pass down to AnswerCheckbox
    const question = props.questionObject.question;   // to grab the question to display
    //console.log("questionObject:", questionObject)
    //console.log("props:", props)
    console.log("question",question);
    console.log("correct_answer", props.questionObject.answer);
    //console.log("wrong_answers", props.questionObject.wrong_answers);
    if (props.resultsValue === 0){
    return (
        <div className="mainQuiz">
            <p className="question">{ question }</p>
            <AnswerCheckbox 
            questionObject = {questionObject}
                wrong_answers = {questionObject.wrong_answers}
                id = {questionObject.id}
                question = {questionObject.question}
                correct_answer = {questionObject.answer}
                questionNumber = {props.questionNumber} 
                setQuestionNumber = {props.setQuestionNumber}
                // ^^send questionNumber props down to re-render after each answer
                incorrectAnswers = {props.incorrectAnswers}
                setIncorrectAnswers = {props.setIncorrectAnswers}
                resultsValue = {props.resultsValue}
                setResultsValue = {props.setResultsValue}
                 /> 
        </div>
    )
    } else if (props.resultsValue === 1){
        return (
            <div className="MainQuiz">
            <div className="resultsPageCorrect">
                <p>Correct!</p>
            </div>
             <button onClick={handleNextClick}>Next</button>
            </div>
        )
        
    } else if (props.resultsValue === -1){
        return (
            <div className="MainQuiz">
            <div className="resultsPageIncorrect">
                <p>Not quite...</p>
                <p>The correct answer for </p>
                <p>{props.questionObject.question}</p>
                <p>is</p>
                <p>{props.questionObject.answer}</p>
            </div>
             <button onClick={handleNextClick}>Next</button>
            </div>
        )
    } else {
        return (
            <div className="error">
                <p>ERROR didnt recieve a value of either 1,0 or -1</p>
            </div>
        )
    }

} else {

    return (
        console.log("questionObject:", typeof props.questionObject),
        <div className = "MainQuiz">
            <p>xxxQuiz Complete!</p>
            <Button label="Home" />
        </div>
    )
}
}