import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox"
import "./QuestionDisplay.css"
import PromptQuestionTimer from "../promptQuestionTimer/PromptQuestionTimer";

export default function QuestionDisplay(props) {

// Sets the new results, new question when Next is pressed
function handleNextClick(){
    props.setResultsValue(0);
    props.setQuestionNumber(props.questionNumber + 1)
}

// if the questionObject is empty, display loading
if (props.questionObject && Object.keys(props.questionObject).length === 0) {
    return <div>loading...</div>;
  }

if (typeof props.questionObject === 'object') {
    const questionObject = props.questionObject; // to pass down to AnswerCheckbox
    const question = props.questionObject.question;   // to grab the question to display
    console.log("question",question);
    console.log("correct_answer", props.questionObject.answer);
    if (props.resultsValue === 0){
    return (
        <div className="mainQuiz">
            <p className="question">{ question }</p>
            <PromptQuestionTimer></PromptQuestionTimer>
            <AnswerCheckbox 
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
             <button onClick={handleNextClick}>{props.nextMessage}</button>
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
            {/* props.nextMessage has different value for main quiz than prompt quiz */}
             <button onClick={handleNextClick}>{props.nextMessage}</button>
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
        <div className = "MainQuiz">
            {/* props.completionMessage has different value for main quiz than prompt quiz */}
            <p>{ props.completionMessage }</p>
        </div>
    )
}
}