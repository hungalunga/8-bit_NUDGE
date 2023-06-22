import { Button } from "primereact/button";

export default function PromptQuizCorrect({ handleNextClick }) {
	return (
		<>
			<div className="resultsPageCorrect">
				<p>Correct!</p>
			</div>
			<Button onClick={handleNextClick}>Finished!</Button>
		</>
	);
}
