import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import Confetti from "react-confetti";
//import WebsiteEmbed from "../WebsiteEmbed/WebsiteEmbed";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import "../MainQuiz/MainQuiz.css";

export default function PromptQuizCorrect({
  withinTime,
  supabase,
  session,
  setTotalScore,
  totalScore,
  streak,
  setStreak,
  streakCount,
  setStreakCount,
}) {
  function addScore() {
    if (streak === false) {
      setStreakCount(streakCount + 1);
      setStreak(true);
    }
    if (withinTime === false) {
      updateScore(100);
    } else {
      updateScore(200);
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
            <h3>Better late than never...</h3>
            <h1>You got that correct!</h1>
            <Card className="correct-XP-card" title="+200" subTitle="XP" />
            <h3>
              Answer before the timer's up to get double points next time!
            </h3>
            <Link to="/">
              <Button onClick={addScore}>Try another quiz</Button>
            </Link>
          </Card>
          {/* <WebsiteEmbed /> */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Confetti></Confetti>
        <div className="content-container">
          <Card className="end-prompt-quiz-card">
            <h2>Correct</h2>
            <h1>You smashed it!</h1>
            <div className="quiz-score-container">
              <Card
                className="correct-XP-card"
                title="x2"
                subTitle=" Time Bonus"
              />
              <Card className="correct-XP-card" title="+200" subTitle="XP" />
            </div>
            <h3>Look at all those points!</h3>
            <p> Watch out for tomorrow's NUDGE.</p>
            <Link to="/">
              <Button onClick={addScore}>Try another quiz</Button>
            </Link><div className="quiz-speech">
            <TextToSpeech speech="Correct and in time! Double Time Bonus! You've gained +200 points" /></div>
          </Card>
        </div>
        {/* <WebsiteEmbed /> */}
      </>
    );
  }
}
