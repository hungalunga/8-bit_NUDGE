import { Button } from "primereact/button";

export default function PromptQuizCorrect({ handleNextClick, withinTime }) {

	if (withinTime === false) {
		return (
			<>
				<div className="resultsPageIncorrect">
					<p>Correct but out of time!</p>
				</div>
				<Button onClick={handleNextClick}>Finished!</Button>
			</>
		);
	}
 else {
	return (
		<>
			<div className="resultsPageCorrect">
				<p>Correct and in time!</p>
			</div>
			<Button onClick={handleNextClick}>Finished!</Button>
		</>
	);
}
}