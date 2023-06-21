// detect when the timer hits <= 0
// then : 
//  1. stop
//  2. tell user no time bonus for you
//  3. set a variable to no time bonus to be available for score functionality

import React, { useState, useEffect } from 'react';

export default function PromptQuestionTimer() {
  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds > 0? prevSeconds - 1:0);
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h1>{Math.floor(seconds/60)} : {seconds%60} </h1>
    </div>
  );
}

