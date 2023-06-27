import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import Confetti from 'react-confetti'
import WebsiteEmbed from "../WebsiteEmbed/WebsiteEmbed";

export default function PromptQuizCorrect({
	withinTime,
	setTotalScore,
	totalScore,
	streak,
	setStreak,
	streakCount,
	setStreakCount
}) {
	function addScore() {
		if (streak === false) {
			setStreakCount(streakCount+1)
			setStreak(true) 
		}
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
				<WebsiteEmbed />
			</>
		);
	} else {
		return (
			<>
				<div className="resultsPageCorrect">
				<Confetti></Confetti>
					<p>Correct and in time!</p>
					<p>2X Time Bonus!</p>
					<p>You've gained +200 points!</p>
				</div>
				<Link to="/home">
					<Button onClick={addScore}>Finished!</Button>
				</Link>
				<WebsiteEmbed />
			</>
		);
	}
}
