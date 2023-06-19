 // retrieve the question and answer data from the "data base" --done
        // assign the question to a state variable
        // call variable in the return

// display the question on the page

// import answer component

// call answer component in the return




import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox"

export default function QuestionDisplay(props) {

// seems like it's being passed down as undefined so let's delay it
function handleClick(){
    props.setResultsValue(0);
}

if (props.questionObject && Object.keys(props.questionObject).length === 0) {
    return <div>loading...</div>;
  }


if (typeof props.questionObject === 'object') {
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
             <button onClick={handleClick}>Next</button>
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
             <button onClick={handleClick}>Next</button>
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
            <p>Quiz Complete!</p>
        </div>
    )
}
}