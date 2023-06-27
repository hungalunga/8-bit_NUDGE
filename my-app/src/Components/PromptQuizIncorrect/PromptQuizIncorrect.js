import { Button } from "primereact/button";

export default function PromptQuizCorrect({withinTime }) {

	if (withinTime === false) {
		return (
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
		<>
			<div className="resultsPageCorrect">
				<p>Incorrect but in time!</p>
			</div>
			<Button>Finished!</Button>
		</>
	);
}
}
