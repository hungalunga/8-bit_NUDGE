import { Button } from "primereact/button";


export default function MainQuizComplete() {

	// handle button redirect to home 
	function handleClick() {
		window.location.href = "/home";
	}

	return (
		<>
			<p>Quiz Complete!</p>
			<Button label="Home" onClick = {handleClick} />
		</>
	);
}
