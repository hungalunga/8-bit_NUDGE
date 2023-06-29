import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import "../MainQuiz/MainQuiz.css";

export default function PromptQuizCorrect({
  withinTime,
  supabase,
  session,
  setTotalScore,
  totalScore,
  correctAnswer,
  question,
}) {
  function addScore() {
    if (withinTime === false) {
      updateScore(10);
    } else {
      updateScore(20);
    }
  }


  async function updateScore(quizscore) {
    const { data: score } = await supabase
      .from("profiles")
      .select("user_score")
      .eq("id", session.user.id);

    console.log("score:", score);
    if (isNaN(score[0].user_score) === false) {
      const currentScore = score[0].user_score;
      const newScore = currentScore + quizscore;
      setTotalScore(newScore);
      console.log("newScore:", newScore);
      await supabase
        .from("profiles")
        .update({ user_score: newScore })
        .eq("id", session.user.id);
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
            <Link to="/">
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

            <Link to="/">
              <Button onClick={addScore}>Try another quiz</Button>
            </Link>
          </Card>{" "}
        </div>
      </>
    );
  }
}
