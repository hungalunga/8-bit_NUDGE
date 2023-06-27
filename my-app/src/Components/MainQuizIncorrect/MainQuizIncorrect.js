import { Button } from "primereact/button";
import { Card } from "primereact/card";
import TextToSpeech from "../TextToSpeech/TextToSpeech";

export default function MainQuizIncorrect({ questionObject, nextMessage, handleNextClick }) {
	return (
	  <>
		<Card className="end-quiz-card">
		  <h1>Not quite...</h1>
		  <p>The correct answer for "{questionObject.question}" is</p>
			<p><strong>{questionObject.answer}</strong>.</p>
			<TextToSpeech />
		</Card>
		{/* props.nextMessage has different value for main quiz than prompt quiz */}
		<Button onClick={handleNextClick}>{nextMessage}</Button>
	  </>
	);
  }
