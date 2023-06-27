import { Button } from "primereact/button";
import { Link } from "react-router-dom";
export default function MainQuizComplete(props) {
	console.log("props.totalScore:", props.totalScore);

	function resetClick() {
		props.setTotalScore(props.totalScore + props.quizScore);
		if (props.streak === false) {
			props.setStreakCount(props.streakCount+1)
			props.setStreak(true) 
		}
	}
import { Card } from "primereact/card";

export default function MainQuizComplete() {
	return (
		<>
			<p>Quiz Complete! You answered {props.quizScore}% correctly first time!</p>
			<Link to="/home">
				<Button label="Home" onClick={resetClick} size="large" />
			</Link>

		</> 
		    <Card className="end-quiz-card">
			<h1>Quiz Complete!</h1>
			<Button label="Keep quizzing!" />
			</Card>
			<Button label="Home" />
		</>
	);
}
