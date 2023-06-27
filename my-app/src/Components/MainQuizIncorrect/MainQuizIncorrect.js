import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function MainQuizIncorrect({ questionObject, nextMessage, handleNextClick }) {
	return (
	  <><div className="main-quiz-page">
		<Card className="end-quiz-card">
		  <h1>Not quite...</h1>
		  <p>The correct answer for "{questionObject.question}" is</p>
			<p><strong>{questionObject.answer}</strong>.</p>
		</Card>
		{/* props.nextMessage has different value for main quiz than prompt quiz */}
		<Button onClick={handleNextClick}>{nextMessage}</Button></div>
	  </>
	);
  }
