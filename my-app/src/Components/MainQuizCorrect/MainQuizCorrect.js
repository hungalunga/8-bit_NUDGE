import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function MainQuizCorrect({nextMessage, handleNextClick}) {
	return (
		<>
			<Card className="end-quiz-card">
				<h1>🌟You got that right🌟!</h1>
				<Card className="correct-XP" title= "+5" subTitle=" XP"/>
			</Card>
			<Button onClick={handleNextClick}>{nextMessage}</Button>
		</>
	);
}
