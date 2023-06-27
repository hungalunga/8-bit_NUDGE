import MainQuizComplete from "../MainQuizComplete/MainQuizComplete";
import MainQuizIncorrect from "../MainQuizIncorrect/MainQuizIncorrect";
import MainQuizCorrect from "../MainQuizCorrect/MainQuizCorrect";
import MainQuizQuestion from "../MainQuizQuestion/MainQuizQuestion";
import { ProgressBar } from "primereact/progressbar";
import "./MainQuizDisplay.css";
import "../MainQuiz/MainQuiz.css";

export default function MainQuizDisplay(props) {
	const progressValue = (props.questionNumber / 3) * 100;
	// will need to change progressValue to be /10 when we have 10 questions

	// Sets the new results, new question when Next is pressed
	function handleNextClick() {
		props.setResultsValue(0);
		props.setQuestionNumber(props.questionNumber + 1);
		props.getRandomQuestion(props.questionSet);

		// if questionNumber is =< 3 then run this:
		// WILL NEED TO CHANGE TO 10
		if (props.questionNumber <= 3) {
			// if resultsValue is 1, add 10 to quizScore
			if (props.resultsValue === 1) {
				props.setQuizScore(props.quizScore + 10);
			}
		}
	}

	// if the questionObject is empty, display loading
	if (props.questionObject && Object.keys(props.questionObject).length === 0) {
		return <div>loading...</div>;
	}

	if (props.questionObject) {
		console.log("correct_answer", props.questionObject.answer);
		console.log("score", props.quizScore);
		console.log(props.questionObject);
		const questionObject = props.questionObject;

		if (props.resultsValue === 0) {
			return (
				<>
					<div className="main-quiz-page">
							<ProgressBar className="quiz-progress-bar" value={progressValue}></ProgressBar>
							<MainQuizQuestion
								questionObject={questionObject}
								wrong_answers={questionObject.wrong_answers}
								id={questionObject.id}
								question={questionObject.question}
								correct_answer={questionObject.answer}
								questionNumber={props.questionNumber}
								setQuestionNumber={props.setQuestionNumber}
								incorrectAnswers={props.incorrectAnswers}
								setIncorrectAnswers={props.setIncorrectAnswers}
								resultsValue={props.resultsValue}
								setResultsValue={props.setResultsValue}
								quizScore={props.quizScore}
								setQuizScore={props.setQuizScore}
							/>
					</div>
				</>
			);
		} else if (props.resultsValue === 1) {
			return (
				<div className="MainQuiz">
					<ProgressBar
						className="quiz-progress-bar"
						value={progressValue}
					></ProgressBar>
					<MainQuizCorrect
						nextMessage={props.nextMessage}
						handleNextClick={handleNextClick}
						quizScore={props.quizScore}
						setQuizScore={props.setQuizScore}
						totalScore={props.totalScore}
						setTotalScore={props.setTotalScore}
					/>
				</div>
			);
		} else if (props.resultsValue === -1) {
			//props.setQuestionNumber(props.questionNumber - 1);
			return (
				<div className="MainQuiz">
					<ProgressBar
						className="quiz-progress-bar"
						value={progressValue}
					></ProgressBar>
					<MainQuizIncorrect
						questionObject={questionObject}
						nextMessage={props.nextMessage}
						handleNextClick={handleNextClick}
						quizScore={props.quizScore}
						setQuizScore={props.setQuizScore}
						totalScore={props.totalScore}
						setTotalScore={props.setTotalScore}
					/>
				</div>
			);
		} else {
			return (
				<div className="error">
					<p>ERROR didnt recieve a value of either 1,0 or -1</p>
				</div>
			);
		}
	} else {
		return (
			// console.log("questionObject:", typeof questionObject),
			<div className="MainQuiz">
				<MainQuizComplete
					quizScore={props.quizScore}
					setQuizScore={props.setQuizScore}
					totalScore={props.totalScore}
					setTotalScore={props.setTotalScore}
					setStreak={props.setStreak}
					streak={props.streak}
					setStreakCount={props.setStreakCount}
					streakCount={props.streakCount}
				/>
			</div>
		);
	}
}
