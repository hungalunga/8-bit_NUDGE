// detect when the timer hits <= 0
// then :
//  1. stop
//  2. tell user no time bonus for you
//  3. set a variable to no time bonus to be available for score functionality

import React, { useEffect } from "react";

export default function PromptQuestionTimer({ seconds, setSeconds }) {
	
  useEffect(() => {
		const intervalId = setInterval(() => {
			setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
		}, 1000);

		// Clean up the interval when the component is unmounted
		return () => {
			clearInterval(intervalId);
		};
	},);

	const minutes = Math.floor(seconds / 60);
	const timerValue = `${minutes} : ${seconds % 60}`;
  console.log(seconds);
	return (
		<div>
			<h3>{timerValue}</h3>
		</div>
	);
}

// check current value of timer
