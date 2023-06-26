import { Button } from "primereact/button";
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
	else {
		return (
			<>
				<div className="resultsPageCorrect">
					<p>Correct and in time!</p>
				</div>
				<Button onClick={handleClick}>Finished!</Button>
			</>
		);
}
}