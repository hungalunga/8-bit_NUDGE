
/*Answer Component
given the database, we want to grab the answer from that database, this database will be hard coded and in an array
we want to display the answer in a checkbox format
we want to be able to select only one answer at a time, when the user selects a new answer, the previous answer should be unselected
*/

/* Checkbox functions
each checkbox needs to be randomly placed on the page
each checkbox needs to be assigned a value
*/
import React from 'react';
import { useState,useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

export default function AnswerCheckbox({questionObject}) {
  let correctAnswer = questionObject.answer;
  let wrongAnswers = questionObject.wrong_answers;

  // const { quizAnswers } = props;

console.log("lol", correctAnswer, wrongAnswers);

  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);

  useEffect(() => {
    const shuffledAnswers = shuffleArray([correctAnswer, ...wrongAnswers]);
    setAllAnswers(shuffledAnswers);
  }, []);

  const onAnswerChange = (e) => {
    setAnswer(e.value);
    console.log(answer);
  };
  
    return (
        <div className="card flex flex-wrap justify-content-center gap-3">
          <div className="flex align-items-center">
            <div className="answerBox">
            <h3>{answer}</h3>
              {allAnswers.map((answerOption, index) => (
                <div className = "checkbox" key={index}>
                  <Checkbox
                    inputId={`answer${index + 1}`}
                    value={answerOption}
                    onChange={onAnswerChange}
                    checked={answer === answerOption}
                  />
                  <label>{answerOption}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };