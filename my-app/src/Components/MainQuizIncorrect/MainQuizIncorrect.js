import { Button } from "primereact/button";
import { Card } from "primereact/card";
import TextToSpeech from "../TextToSpeech/TextToSpeech";

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
        <TextToSpeech
          speech={`Not quite... The question was ${questionObject.question}. The answer is ${questionObject.answer}.`}
        />
      </Card>
      {/* props.nextMessage has different value for main quiz than prompt quiz */}
      <div className="next-button">
        <Button onClick={handleNextClick}>{nextMessage}</Button>
      </div>
    </>
  );
}
