 // retrieve the question and answer data from the "data base" --done
        // assign the question to a state variable
        // call variable in the return

// display the question on the page

// import answer component

// call answer component in the return




import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox"
import { useState } from "react";


export default function QuestionDisplay(props) {

// seems like it's being passed down as undefined so let's delay it


if (Object.keys(props.questionObject).length === 0) {
    return <div>loading...</div>
}


if (props.questionNumber < 10) {
    const questionObject = props.questionObject; // to pass down to AnswerCheckbox
    const question = props.questionObject.question;   // to grab the question to display
    console.log("questionObject:", questionObject)
    console.log("props:", props)
    console.log("question",question);
    console.log("correct_answer", props.questionObject.answer);
    console.log("wrong_answers", props.questionObject.wrong_answers);
    return (
        <div>
            <p>{ question }</p>
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
                 /> 
        </div>
    )
}
    


    return (
        <div>
            <p>Quiz Complete!</p>
        </div>
    )
};