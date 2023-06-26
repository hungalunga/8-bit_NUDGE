import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function PromptQuizCorrect({
	withinTime,
	setTotalScore,
	totalScore,
}) {
	function addScore() {
		if (withinTime === false) {
			setTotalScore(totalScore + 100);
		} else {
			setTotalScore(totalScore + 200);
		}
	}

	if (withinTime === false) {
		return (
			<>
				<div className="resultsPageIncorrect">
					<p>Correct but out of time!</p>
					<p>You've gained +100 points!</p>
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
					<p>Correct and in time!</p>
					<p>2X Time Bonus!</p>
					<p>You've gained +200 points!</p>
				</div>
				<Link to="/home">
					<Button onClick={addScore}>Finished!</Button>
				</Link>
			</>
		);
	}
}
