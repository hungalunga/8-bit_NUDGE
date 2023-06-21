import React from "react";
import { useState, useEffect } from "react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { Button } from "primereact/button";


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
  //const [feedbackText, setFeedbackText] = useState("");


  // this shuffles the order of the answers
  // (wrapped in useEffect to block infinite renders)
  useEffect(() => {
    const shuffledAnswers = shuffleArray([correct_answer, ...wrong_answers]);
    setAllAnswers(shuffledAnswers);
    setAnswer("");
  }, [correct_answer, wrong_answers]);

  // function triggered by Button onClick, sets user answer to answerOption from JSX below 
  const onAnswerChange = (selectedAnswer) => {
    setAnswer(selectedAnswer);
  };

// compares user answer with correct answer and sets feedback text, incorrect answers, incorrect answer numbers
  const handleConfirmClick = () => {
    if (answer === correct_answer) {
      setResultsValue(1);
      //setFeedbackText("Correct!");
    } else {
      setResultsValue(-1);
      //setFeedbackText("Incorrect! ;-(");
    }
  };

  return (
        <div className="answerBox">
          {allAnswers.map((answerOption, index) => (
            <Button 
              severity="secondary"
              className={answer === answerOption ? "answerButton selected" : "answerButton"}
              key={index}
              label={answerOption}
              onClick={() => onAnswerChange(answerOption)}  
            />   
          ))}
          <Button label="Confirm" className="" onClick={handleConfirmClick} />
        </div>
  );
}
