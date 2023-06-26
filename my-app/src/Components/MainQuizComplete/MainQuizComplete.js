import { Button } from "primereact/button";
import { Link } from "react-router-dom";
export default function MainQuizComplete(props) {
	props.setTotalScore(props.totalScore + props.quizScore);
	props.setQuizScore(0);
	console.log("props.totalScore:", props.totalScore);
	return (
		<>
			<p>xxxQuiz Complete!</p>
			<Link to="/home">
				<Button label="Home" size="large" />
			</Link>

		</>
	);
}
