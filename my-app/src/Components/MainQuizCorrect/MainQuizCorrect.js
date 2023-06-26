import { Button } from "primereact/button";


export default function MainQuizCorrect({nextMessage, handleNextClick}) {
	return (
		<>
			<div className="resultsPageCorrect">
				<p>Correct!</p>
			</div>
			<Button onClick={handleNextClick}>{nextMessage}</Button>
		</>
	);
}
