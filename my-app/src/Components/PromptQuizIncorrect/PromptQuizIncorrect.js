import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function PromptQuizCorrect({
	withinTime,
	setTotalScore,
	totalScore,
}) {
	function addScore() {
		if (withinTime === false) {
			setTotalScore(totalScore + 10);
		} else {
			setTotalScore(totalScore + 20);
		}
	}

	if (withinTime === false) {
		return (
			<>
				<div className="resultsPageIncorrect">
					<p>Incorrect and out of time!</p>
					<p>You've gained +10 points!</p>
				</div>
				<Link to="/home">
					<Button onClick={addScore}>Finished!</Button>
				</Link>
			</>
		);
	} else {
		return (
			<>
				<div className="resultsPageCorrect">
					<p>Incorrect but in time!</p>
					<p>2X Time Bonus!</p>
					<p>You've gained +20 points!</p>
				</div>
				<Link to="/home">
					<Button onClick={addScore}>Finished!</Button>
				</Link>
			</>
		);
	}
}