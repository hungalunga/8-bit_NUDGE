import React, { useState, useEffect } from 'react';

export default function PromptQuestionTimer() {
  const [seconds, setSeconds] = useState(180);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h1>{Math.floor(seconds/60)} minutes {seconds%60} seconds</h1>
    </div>
  );
}