import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";

export default function MainQuizComplete(props) {
  console.log("props.totalScore:", props.totalScore);

  function resetClick() {
    props.setTotalScore(props.totalScore + props.quizScore);
    if (props.streak === false) {
      props.setStreakCount(props.streakCount + 1);
      props.setStreak(true);
    }
  }

  return (
    <>
      <Card className="end-quiz-card">
        <h1>You did it!</h1>
        <h3>You answered {props.quizScore}% correctly first time.</h3>
        <Card
          className="correct-XP-card"
          title={`+${props.quizScore}`}
          subTitle=" XP"
        />
        <Link to="/home">
          <Button label="Keep Quizzing" onClick={resetClick} size="large" />
        </Link>
      </Card>
    </>
  );
}
