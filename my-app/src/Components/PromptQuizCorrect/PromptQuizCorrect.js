import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import Confetti from 'react-confetti'


export default function PromptQuizCorrect({withinTime,late }) {

	// handle button redirect to home 
	function handleClick() {
		window.location.href = "/home";
	}

	if (withinTime === false) {
		return (
			<>
				<div className="resultsPageIncorrect">
					<p>Correct but out of time!</p>
					<p>You've gained +100 points!</p>
				</div>
				<Button onClick={handleClick}>Finished!</Button>
				{/* <Confetti	/> */}
			</>
		);
	}
 else if (!late) {
	return (
		<>
			<div className="resultsPageCorrect">
				<p>Correct and in time!</p>
			</div>
			<Button onClick={handleClick}>Finished!</Button>
			<Confetti	/>
			
		</>
	)}
	else { // this else is unnecessary now but the logic still works for if you arrive late to the nudge quiz and get the question right
		return (
			<>
				<div className="resultsPageCorrect">
				<Confetti></Confetti>
					<p>Correct and in time!</p>
					<p>2X Time Bonus!</p>
					<p>You've gained +200 points!</p>
				</div>
				<Link to="/home">
					<Button onClick={addScore}>Finished!</Button>
				</Link>
			</>
		);
	}
}
