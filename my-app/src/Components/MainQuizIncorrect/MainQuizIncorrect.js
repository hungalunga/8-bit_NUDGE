import { Button } from "primereact/button";


export default function MainQuizIncorrect({ questionObject, nextMessage, handleNextClick }) {
	return (
		<>
			<div className="resultsPageIncorrect">
						<p>Not quite...</p>
						<p>The correct answer for </p>
						<p>{questionObject.question}</p>
						<p>is</p>
						<p>{questionObject.answer}</p>
					</div>
					{/* props.nextMessage has different value for main quiz than prompt quiz */}
					<Button onClick={handleNextClick}>{nextMessage}</Button>
		</>
	);
}
