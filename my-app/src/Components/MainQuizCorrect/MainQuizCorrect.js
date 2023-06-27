import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "../MainQuiz/MainQuiz.css";

export default function MainQuizCorrect({
	nextMessage,
	setQuizScore,
	quizScore,
	handleNextClick,
}) {
	return (
		<>
			<Card className="end-quiz-card">
				<h1>🌟You got that right!🌟</h1>
				{/* <Card className="correct-XP-card" title= "+10" subTitle=" XP"/> */}
			</Card>
			<div className="next-button">
				<Button onClick={handleNextClick}>{nextMessage}</Button>
			</div>
		</>
	);
}
