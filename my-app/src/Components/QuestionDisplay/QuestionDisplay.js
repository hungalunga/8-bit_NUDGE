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

    const questionObject = props.questionObject; // to pass down to AnswerCheckbox
    const question = props.questionObject.question;   // to grab the question to display

console.log("props:", props)
console.log("question", question);
console.log("correct_answer", props.questionObject.answer);
console.log("wrong_answers", props.questionObject.wrong_answers);



const handleClick = () => {
    console.log("clicked");
    // if user chooses correct answer

    // if user chooses incorrect answer

}

    return (
        <div>
            <p>{ question }</p>
            <AnswerCheckbox 
                wrong_answers = {questionObject.wrong_answers}
                id = {questionObject.id}
                question = {questionObject.question}
                correct_answer = {questionObject.answer}
   
                 />
            <button onClick={handleClick}>Confirm</button>
        </div>
    )
};