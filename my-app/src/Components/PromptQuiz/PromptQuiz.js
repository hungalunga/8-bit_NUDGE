import {useRef } from "react";

export default function PromptQuiz() {
  const date = new Date();
  const showTime = date.getHours();
  const buttonRef = useRef(null);

  const createNotification = (title, body) => {
    const options = {
      body: body,
      // icon: logoIcon,
      // badge: logoIcon,
    };

    if (
      "Notification" in window &&
      Notification.permission === "granted" &&
      showTime >= 9 &&
      showTime <= 17
    ) {
      const notification = new Notification(title, options);
      notification.addEventListener("click", function (event) {
        window.open("http://localhost:3000/daily-quiz");
      });
    } else if (
      "Notification" in window &&
      Notification.permission !== "denied" &&
      showTime >= 9 &&
      showTime <= 17
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(title, options);

          notification.addEventListener("click", function (event) {
            window.open("http://localhost:3000/daily-quiz");;
          });
        }
      });
    }
  };

  const handleClick = () => { createNotification("Hello, Bernard! Hurry!", "👾⏰👾\nClick to complete your daily quiz too!!"); };


  if (showTime >= 9 && showTime <= 17) {
    let range = 17 - showTime;
    let randomTime = Math.floor(
      Math.random() * (range * 60 * 60 * 1000 - 1000) + 1000
    ); // this will give a random point in time between the current time and 17:00
    console.log(randomTime);
    setTimeout(() => {
      createNotification("Reminder", "Time for your daily quiz!!");
    }, randomTime);
  }

    return (
      <button ref={buttonRef} onClick={handleClick}>
        Click me to get a notification
      </button>
    );
}
