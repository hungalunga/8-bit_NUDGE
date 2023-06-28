import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import "../MainQuiz/MainQuiz.css";

export default function PromptQuizCorrect({
  withinTime,
  setTotalScore,
  totalScore,
  correctAnswer,
  question,
}) {
  function addScore() {
    if (withinTime === false) {
      setTotalScore(totalScore + 10);
    } else {
      setTotalScore(totalScore + 20);
    }
  }

  if (withinTime === false) {
    return (
      <>
        <div className="content-container">
          <Card className="end-prompt-quiz-card">
            <h1>Not quite!</h1>
            <p>The correct answer is</p>
            <h2>{correctAnswer}</h2>
            <Card className="correct-XP-card" title="+10" subTitle="XP" />
            <Link to="/home">
              <Button onClick={addScore}>Try another quiz</Button>
            </Link>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <>
        {" "}
        <div className="content-container">
          <Card className="end-prompt-quiz-card">
            <h1>Not quite!</h1>
            <p>The correct answer is</p>
            <h2>{correctAnswer}</h2>

            {/* <div className="quiz-score-container">
							<Card className="correct-XP-card" title="+10" subTitle="XP" />
							<Card
								className="correct-XP-card"
								title="x2"
								subTitle="Time Bonus"
							/>
						</div> */}

            <Link to="/home">
              <Button onClick={addScore}>Try another quiz</Button>
            </Link>
          </Card>{" "}
        </div>
      </>
    );
  }
}
