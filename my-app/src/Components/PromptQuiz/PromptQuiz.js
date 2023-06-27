import { useState, useEffect } from "react";
import PromptQuizDisplay from "../PromptQuizDisplay/PromptQuizDisplay";

export default function PromptQuiz(props) {
	// choose ten random questions from the main question dataset
	// store them in an array
	const [questionObject, setQuestionObject] = useState({});
	//takes values of 0, 1, -1 corresponding to no answer, correct answer, incorrect answer
	// This value will determine which JSX QuestionDisplay displays (q&a, "Correct!" or "Not Quite" + feedback)
	const [resultsValue, setResultsValue] = useState(0);

	// carries the number of the question user is up to in the quiz
	const [questionNumber, setQuestionNumber] = useState(1);

	// an array that keeps track of the questions you got wrong
	const [incorrectAnswers, setIncorrectAnswers] = useState([]);

	// sets the number of questions in the quiz

	// displays the completion message at the end of the quiz (variable bc regular quiz passes a different message)
	const completionMessage = "Congratulations, you answered your daily nudge!";

	// displays the message on the button after answering a question (using variable bc main quiz passes a different message)

	useEffect(() => {
		async function getQuestions() {
			const response = await fetch("http://localhost:3001/daily_question");
			const data = await response.json();
			console.log(data);
			getOneQuestion(data);
		}
		getQuestions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionNumber]);

	function getOneQuestion(data) {
		console.log(questionNumber);
		if (questionNumber === 1) {
			setQuestionObject(data);
		} else {
			setQuestionObject();
		}
	}

	const late = props.late



	const [countdownNumber, setCountdownNumber] = useState(5);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCountdownNumber((prevCountdownNum) =>
			prevCountdownNum > 0 ? prevCountdownNum - 1 : 0
			);
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	},);

	if (countdownNumber > 0) {

		return (
			<div className="mainQuiz">
				<h2>Woohoo, you made it!</h2>
				<h1>Get ready to answer in...</h1>
				<h1>{countdownNumber}</h1>
			</div>
		);
	}

	else if (late === false) {
		return (
			<div>
				<h2>
					You missed your daily nudge! You can still keep your streak if you answer the daily quiz.
				</h2>
			</div>
		)
}
	// display the question & answers
	else {
		return (
			<div>
				<div data-testid="question-display" className="mainQuiz">
					{/* <h1>Question {questionNumber}</h1> */}
					<PromptQuizDisplay
						streak={props.streak}
						setStreak={props.setStreak}
						totalScore={props.totalScore}
						setTotalScore={props.setTotalScore}
						streakCount={props.streakCount}
						setStreakCount={props.setStreakCount}
						questionObject={questionObject}
						questionNumber={questionNumber}
						setQuestionNumber={setQuestionNumber}
						resultsValue={resultsValue}
						setResultsValue={setResultsValue}
						completionMessage={completionMessage}
						promptQuestionTimer={true}
						incorrectAnswers={incorrectAnswers}
						setIncorrectAnswers={setIncorrectAnswers}
					/>
				</div>
				{/* <PromptQuestionTimer/> */}
			</div>
		);
	}
}
	


// if (!late) {return (
// 	<div>
// 		<div data-testid="question-display" className="mainQuiz">
// 			{/* <h1>Question {questionNumber}</h1> */}
		
// 			<PromptQuizDisplay
// 				questionObject={questionObject}
// 				questionNumber={questionNumber}
// 				setQuestionNumber={setQuestionNumber}
// 				resultsValue={resultsValue}
// 				setResultsValue={setResultsValue}
// 				completionMessage={completionMessage}
// 				promptQuestionTimer={true}
// 				incorrectAnswers={incorrectAnswers}
// 				setIncorrectAnswers={setIncorrectAnswers}
// 				late={late}
// 			/>
// 		</div>
// 		{/* <PromptQuestionTimer/> */}
// 	</div>
// );}