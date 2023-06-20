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

export default function AnswerCheckbox({
  setResultsValue,
  correct_answer,
  wrong_answers,
  id,
  question,
  questionNumber,
  setQuestionNumber,
  incorrectAnswers,
  setIncorrectAnswers
}) {
  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);

  useEffect(() => {
    const shuffledAnswers = shuffleArray([correct_answer, ...wrong_answers]);
    setAllAnswers(shuffledAnswers);
    setAnswer("");
  }, [correct_answer, wrong_answers]);

  const onAnswerChange = (selectedAnswer) => {
    setAnswer(selectedAnswer);
    console.log(answer);
  };

  const handleClick = () => {
    console.log("user answer:", answer, "correct answer:", correct_answer);
    if (answer === correct_answer) {
      setResultsValue(1);
      console.log(`Answered correctly!`);
      setFeedbackText("Correct!");
    } else {
      setResultsValue(-1);
      console.log("Answered incorrectly. :-(");
      setFeedbackText("Incorrect! ;-(");
      setIncorrectAnswers([...incorrectAnswers, { question, answer: correct_answer, wrong_answers, id }]);
    }
  };

  const [feedbackText, setFeedbackText] = useState("");

  return (
    <div className="card flex flex-wrap justify-content-center gap-3">
      <div className="flex align-items-center">
        <div className="answerBox">
          <h3>{answer}</h3>
          {allAnswers.map((answerOption, index) => (
            <Button
              key={index}
              label={answerOption}
              className={answer === answerOption ? 'selected' : ''}
              onClick={() => onAnswerChange(answerOption)}
            />
          ))}
          <Button label="Confirm" className="answerButton" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}