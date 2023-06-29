import MainQuizDisplay from "../MainQuizDisplay/MainQuizDisplay";
import ExitQuizButton from "../ExitQuizButton/ExitQuizButton";
import { useState, useEffect } from "react";
import { quizQuestions } from "../../QuizData";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./MainQuiz.css";

export default function MainQuiz(props) {
	const [questionObject, setQuestionObject] = useState({});
	const [questionSet, setQuestionSet] = useState([]);
	const [questionNumber, setQuestionNumber] = useState(1);
	const [incorrectAnswers, setIncorrectAnswers] = useState([]);
	const [resultsValue, setResultsValue] = useState(0);
	const [quizScore, setQuizScore] = useState(0);
	const [quizStarted, setQuizStarted] = useState(false);
	const numberOfQuestions = quizQuestions.length;
	const completionMessage = "You've completed the quiz!";
	const nextMessage = "➜";

	// creating initial states as empty arrays
	// questions that have already been asked

	useEffect(() => {
		async function getQuestions() {
			const response = await fetch(
				"https://eight-bit-nudge-backend.onrender.com/math_questions"
			);
			const data = await response.json();
			console.log(data);
			getRandomQuestion(data);
			//console.log("data is:", data)
		}
		getQuestions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function getRandomQuestion(data) {
		//select random question
		const DbQuestion = data[0];
		console.log(DbQuestion);
		setQuestionObject(DbQuestion);
		// remove the question from the DBcopy and reset using setQuestionSet
		const remainingQuestions = data.filter(
			(question) => question.id !== DbQuestion.id
		);
		setQuestionSet(remainingQuestions);
		console.log("1 incorrect answers:", incorrectAnswers);
		// grab from array of wrong answers(after preset number OR when you run out of questions (latter is for robustness))
		if (questionNumber > numberOfQuestions || questionSet.length === 0) {
			if (incorrectAnswers.length > 0) {
				const wrongAnswer = incorrectAnswers[0];
				setQuestionObject(wrongAnswer);
				const tryAgain = incorrectAnswers.filter(
					(question) => question.id !== wrongAnswer.id
				);
				setQuestionSet(tryAgain);
				setIncorrectAnswers([]);
				return wrongAnswer;
			}
		} else return DbQuestion;
	}

	// Whenever questionNumber changes value (i.e. user advances one question in quiz), change the questionObject to new random from DBcopy
	// when questionNumber changes, rerender
	// display the question & answers

	if (quizStarted) {
		return (
			<>
				<div className="main-quiz-full-page">
					<div className="exit-quiz">
						<ExitQuizButton />
					</div>
					<div className="main-quiz-page">
						<MainQuizDisplay
							supabase={props.supabase}
							session={props.session}
							quizScore={quizScore}
							setQuizScore={setQuizScore}
							questionObject={questionObject}
							getRandomQuestion={getRandomQuestion}
							questionSet={questionSet}
							questionNumber={questionNumber}
							setQuestionNumber={setQuestionNumber}
							incorrectAnswers={incorrectAnswers}
							setIncorrectAnswers={setIncorrectAnswers}
							resultsValue={resultsValue}
							setResultsValue={setResultsValue}
							completionMessage={completionMessage}
							nextMessage={nextMessage}
							promptQuestionTimer={false}
							totalScore={props.totalScore}
							setTotalScore={props.setTotalScore}
							setStreak={props.setStreak}
							streak={props.streak}
							setStreakCount={props.setStreakCount}
							streakCount={props.streakCount}
						/>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="main-quiz-full-page">
					<div className="main-quiz-page">
						<div className="exit-quiz">
							<ExitQuizButton />
						</div>
						<div className="content-container">
							<Card className="big-card">
								<h2>You've made it this far...</h2>
								<h1>are you ready to start?</h1>
								<Button onClick={() => setQuizStarted(true)}>Let's go!</Button>
							</Card>
						</div>
					</div>
				</div>
			</>
		);
	}
}
