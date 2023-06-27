import { Button } from "primereact/button";
import { Card } from "primereact/card";
import TextToSpeech from "../TextToSpeech/TextToSpeech";

export default function MainQuizCorrect({nextMessage, setQuizScore, quizScore, handleNextClick}) {

	return (
		<>
			<Card className="end-quiz-card">
				<h1>🌟You got that right🌟!</h1>
				<Card className="correct-XP-card" title= "+10" subTitle=" XP"/>
				<TextToSpeech speech="you got that right!" />
			</Card>
			<Button onClick={handleNextClick}>{nextMessage}</Button>
		</>
	);
}
