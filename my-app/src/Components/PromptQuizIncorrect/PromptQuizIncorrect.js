import { Button } from "primereact/button";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function PromptQuizCorrect({withinTime }) {
	// handle button redirect to home 
	function handleClick() {
		window.location.href = "/home";
	}

	// const { width, height } = useWindowSize()

	

	if (withinTime === false) {
		return (
			<>
				<div className="resultsPageIncorrect">
					<p>Incorrect and out of time!</p>
				</div>
				<Button onClick={handleClick}>Finished!</Button>
				{/* <Confetti width={width}	height={height}	/> */}
	
			</>
		);
	}
 else {
	return (
		<>
			<div className="resultsPageCorrect">
				<p>Incorrect but in time!</p>
			</div>
			<Button onClick={handleClick}>Finished!</Button>
			{/* <Confetti width={width}	height={height}	/> */}
		</>
	);
}
}

