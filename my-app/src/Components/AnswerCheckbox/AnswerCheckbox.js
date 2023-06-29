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
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { Button } from "primereact/button";
import "./AnswerCheckbox.css";
import TextToSpeech from "../TextToSpeech/TextToSpeech";

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
	correctAnswer,
	wrongAnswers,
	id,
	question,
	questionNumber,
	setQuestionNumber,
	incorrectAnswers,
	setIncorrectAnswers,
	questionObject,
	setWithinTime,
	withinTime,
	seconds,
	quizScore,
	setQuizScore,
}) {
	const [answer, setAnswer] = useState("");
	const [allAnswers, setAllAnswers] = useState([]);

	useEffect(() => {
		const shuffledAnswers = shuffleArray([correctAnswer, ...wrongAnswers]);
		setAllAnswers(shuffledAnswers);
		setAnswer("");
	}, [correctAnswer, wrongAnswers]);

	const onAnswerChange = (selectedAnswer) => {
		setAnswer(selectedAnswer);
		console.log(answer);
	};

	const handleClick = () => {
		if (seconds <= 0) {
			setWithinTime(false);
			console.log("withinTime:", withinTime);
		}
		console.log("user answer:", answer, "correct answer:", correctAnswer);

		if (answer === correctAnswer) {
			setResultsValue(1);
		} else if (answer === "") {
			setResultsValue(0);
		} else {
			setResultsValue(-1);
			setIncorrectAnswers([...incorrectAnswers, questionObject]);
		}
	};

	return (
		<>
			<div className="answers">
				{allAnswers.map((answerOption, index) => (
					<div className="answer-button-container">
					<Button
						severity="secondary"
						className={
							answer === answerOption
								? "answer-button-selected"
								: "answer-button"
						}
						key={index}
						label={answerOption}
						onClick={() => onAnswerChange(answerOption)}
					/>
					<TextToSpeech speech = {answerOption}/>
					</div>
				))}
			</div>
			<div className="confirm-button">
				<Button label="Submit" onClick={handleClick} />
			</div>
		</>
	);
}
