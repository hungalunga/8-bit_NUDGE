import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";

export default function MainQuizComplete(props) {
  // console.log("props.totalScore:", props.totalScore);

  function resetClick() {
    const quizscore = props.quizScore;
    updateScore(quizscore);
    if (props.streak === false) {
      props.setStreakCount(props.streakCount + 1);
      props.setStreak(true);
    }
  }

  async function updateScore(quizscore) {
    const { data: score } = await props.supabase
      .from("profiles")
      .select("user_score")
      .eq("id", props.session.user.id);

    console.log("score:", score);
    if (isNaN(score[0].user_score) === false) {
      const currentScore = score[0].user_score;
      const newScore = currentScore + quizscore;
      props.setTotalScore(newScore);
      console.log("newScore:", newScore);
      await props.supabase
        .from("profiles")
        .update({ user_score: newScore })
        .eq("id", props.session.user.id);
    }
  }

  return (
    <>
      <Card className="end-quiz-card">
        <h1>You did it!</h1>
        {props.quizScore / 10 === 1 ? <h3>You answered {props.quizScore / 10} question correctly first time.</h3> :
          <h3>You answered {props.quizScore / 10} questions correctly first time.</h3>}
        <Card
          className="correct-XP-card"
          title={`+${props.quizScore}`}
          subTitle=" XP"
        />
        <Link to="/">
          <Button label="Keep Quizzing" onClick={resetClick} size="large" />
        </Link>
      </Card>
    </>
  );
}
