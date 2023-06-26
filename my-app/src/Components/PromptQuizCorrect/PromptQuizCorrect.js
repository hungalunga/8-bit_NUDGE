import { Button } from "primereact/button";

export default function PromptQuizCorrect({withinTime, setScore, score}) {


	if (withinTime === false) {

		return (
			<>
				<div className="resultsPageIncorrect">
					<p>Correct but out of time!</p>
					<p>You've gained +100 points!</p>
				</div>
				<Button>Finished!</Button>
			</>
		);
	}
 else {
	return (
		<>
			<div className="resultsPageCorrect">
				<p>Correct and in time!</p>
				<p>2X Time Bonus!</p>
				<p>You've gained +200 points!</p>
			</div>
			<Button>Finished!</Button>
		</>
	);
}
}