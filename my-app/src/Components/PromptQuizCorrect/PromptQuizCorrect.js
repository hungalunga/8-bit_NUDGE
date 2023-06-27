import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import Confetti from "react-confetti";
import WebsiteEmbed from "../WebsiteEmbed/WebsiteEmbed";
import "../MainQuiz/MainQuiz.css";

export default function PromptQuizCorrect({
	withinTime,
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
			setTotalScore(totalScore + 100);
		} else {
			setTotalScore(totalScore + 200);
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
						<Link to="/home">
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
						<Link to="/home">
							<Button onClick={addScore}>Try another quiz</Button>
						</Link>
					</Card>
				</div>
				{/* <WebsiteEmbed /> */}
			</>
		);
	}
}
