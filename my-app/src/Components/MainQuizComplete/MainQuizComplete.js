import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "../MainQuiz/MainQuiz.css";


export default function MainQuizComplete(props) {
	console.log("props.totalScore:", props.totalScore);

	function resetClick() {
		props.setTotalScore(props.totalScore + props.quizScore);
		if (props.streak === false) {
			props.setStreakCount(props.streakCount+1)
			props.setStreak(true) 
		}
	}

	return (
		<><div className="main-quiz-page">
			<p>Quiz Complete! You answered {props.quizScore}% correctly first time!</p>
			<Link to="/home">
				<Button label="Home" onClick={resetClick} size="large" />
			</Link>
</div>
		</> 
	);
}
