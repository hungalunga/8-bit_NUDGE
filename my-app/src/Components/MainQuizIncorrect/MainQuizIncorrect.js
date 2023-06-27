import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function MainQuizIncorrect({
	questionObject,
	nextMessage,
	handleNextClick,
}) {
	return (
		<>
			<Card className="end-quiz-card">
				<h1>Not quite...</h1>
				<p>The correct answer for "{questionObject.question}" is</p>
				<h2>{questionObject.answer}</h2>
			</Card>
			{/* props.nextMessage has different value for main quiz than prompt quiz */}
			<div className="next-button">
				<Button onClick={handleNextClick}>{nextMessage}</Button>
			</div>
		</>
	);
}
