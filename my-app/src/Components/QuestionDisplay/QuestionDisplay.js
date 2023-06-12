
    // retrieve the question and answer data from the "data base" --done
        // assign the question to a state variable
        // call variable in the return

// display the question on the page

// import answer component

// call answer component in the return




import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox"


export default function QuestionDisplay(props) {
    const x = props.questionObject; 
    const question = props.questionObject.question;   
console.log(question)

    return (
        <div>
            <p>{ question }</p>
            <AnswerCheckbox x={x} />
        </div>
    )
}