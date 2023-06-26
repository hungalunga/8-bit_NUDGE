import { Button } from "primereact/button";

export default function PromptQuizCorrect({withinTime, setScore, score }) {

	if (withinTime === false) {
		return (
			setScore(score + 10),
			<>
				<div className="resultsPageIncorrect">
					<p>Incorrect and out of time!</p>
					<p>You've gained +10 points!</p>
				</div>
				<Button>Finished!</Button>
			</>
		);
	}
 else {
	return (
		setScore(score + 10),
		<>
			<div className="resultsPageCorrect">
				<p>Incorrect but in time!</p>
				<p>2X Time Bonus!</p>
				<p>You've gained +20 points!</p>
			</div>
			<Button>Finished!</Button>
		</>
	);
}
}

