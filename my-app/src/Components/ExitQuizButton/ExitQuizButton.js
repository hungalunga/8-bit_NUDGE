import React from "react";
import "./ExitQuizButton.css";

export default function ExitQuizButton() {
	function exitAlert() {
		// Display a confirmation dialog
		var result = window.confirm(
			"Don't quit now! You'll lose any points you've earned so far! Are you sure you want to exit the quiz? "
		);

		if (result) {
			// If the user clicks OK, redirect them to the desired page
			window.location.href = "/home"; // Replace with the desired URL
		} else {
			// If the user clicks Cancel, stay on the current page
			// Do nothing or perform any other desired action
		}
	}
	return (
		<>
			<button className="exit-quiz-button" onClick={exitAlert}>
				X Leave Quiz
			</button>
		</>
	);
}
