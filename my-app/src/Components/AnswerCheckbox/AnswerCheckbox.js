
/*Answer Component
given the database, we want to grab the answer from that database, this database will be hard coded and in an array
we want to display the answer in a checkbox format
we want to be able to select only one answer at a time, when the user selects a new answer, the previous answer should be unselected
*/

/* Checkbox functions
each checkbox needs to be randomly placed on the page
each checkbox needs to be assigned a value
*/

/*
GETTING THE QUIZ BY ITERATING ONE QUESTION 
1. get the question to initiate another question after being answered. 
    (implement something to handle the questions runnning out)
2. implement a counter that subtracts 1 from counter when a question is answered. 
  Initialise counter at 10. 
  When counter reaches 0, display a congratulations and stop cycle. 
3. Get it to add wrong answers to an array. 
4. Change it so that, when counter reaches 0, if array is empty, congrats. Else ask question from array. 
  If answered correctly, remove question from array. Else, push question to end. 
  Loop on this. 
5. Implement scoring. Add score to congrats page. 
*/

import React from "react";
import { useState, useEffect } from "react";
import { Checkbox } from "primereact/checkbox";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";



const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function AnswerCheckbox({setResultsValue, correct_answer, wrong_answers, id, question, questionNumber, setQuestionNumber, incorrectAnswers, setIncorrectAnswers}) {

  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);

  useEffect(() => {
    const shuffledAnswers = shuffleArray([correct_answer, ...wrong_answers]);
    setAllAnswers(shuffledAnswers);
    setAnswer(""); // reset answer after rerender
  }, [correct_answer, wrong_answers]); // added dependency array to rerender when props change

  const onAnswerChange = (e) => {
    setAnswer(e.value);
    setFeedbackText("");
    console.log(answer);
  };;

  const handleClick = () => {
    console.log("user answer:", answer, "correct answer:", correct_answer)
    // if user chooses correct answer
    if (answer == correct_answer){
      setResultsValue(+1);
      console.log(`Answered correctly!`)
      setFeedbackText("Correct!")
      // render the next question
      // force a rerender by updating the question number
      setQuestionNumber(questionNumber + 1)

      // reloads the page after 2.5 seconds to display the next question minus the one that was just answered
      
    }
    else {
      setResultsValue(-1);
      console.log("Answered incorrectly. :-(")
      setFeedbackText("Incorrect! ;-(")
      setQuestionNumber(questionNumber + 1)
      setIncorrectAnswers([...incorrectAnswers, {question: question, answer: correct_answer, wrong_answers: wrong_answers, id: id}])
    }

    // if user chooses incorrect answer
  };
  const [feedbackText, setFeedbackText] = useState("");

  //console.log("handleclick is " , handleClick);
  return (
    <div className="card flex flex-wrap justify-content-center gap-3">
      <div className="flex align-items-center">
        <div className="answerBox">
          <h3>{answer}</h3>
          {allAnswers.map((answerOption, index) => (
            <div className="checkbox" key={index}>
              <Checkbox
                inputId={`answer${index + 1}`}
                value={answerOption}
                onChange={onAnswerChange}
                checked={answer === answerOption}
              />

              <label>{answerOption}</label>
            </div>
          ))}
          <button className="answerButton" onClick={handleClick}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
