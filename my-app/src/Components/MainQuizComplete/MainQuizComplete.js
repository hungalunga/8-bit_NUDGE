import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function MainQuizComplete() {
	return (
		<>
		    <Card className="end-quiz-card">
			<h1>Quiz Complete!</h1>
			<Button label="Keep quizzing!" />
			</Card>
			<Button label="Home" />
		</>
	);
}
