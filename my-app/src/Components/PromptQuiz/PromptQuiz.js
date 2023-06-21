import {useRef } from "react";
import logoIcon from "./logo2.png";
import { Button } from "primereact/button";
export default function PromptQuiz() {
  const date = new Date();
  const showTime = date.getHours(); //gets the current hour of the day
  const buttonRef = useRef(null);

  const createNotification = (title, body) => { //function that creates the notification with the title and body
    const options = {
      body: body,
      icon: logoIcon, //this shows the wizard
      badge: logoIcon, //this shows the wizard
    };

    if ( //if the user has granted permission, and if the current time is between 9 and 17, then the notification will be created and the user will be able to click on it to go to the daily quiz
      "Notification" in window &&
       Notification.permission === "granted" &&
       showTime >= 9 && showTime <= 17
       ){
      const notification = new Notification(title, options);
      notification.addEventListener("click", function (event) {
        window.open("http://localhost:3000/daily-quiz"); 
      });
    } else if (
      "Notification" in window &&
      Notification.permission === "denied" &&
      showTime >= 9 &&
      showTime <= 17
    ) //this checks if the browser supports notifications, if the user has denied permission, and if the current time is between 9 and 17
    {
      Notification.requestPermission().then((permission) => { //this asks the user for permission to send notifications
        if (permission === "granted") {
          const notification = new Notification(title, options);

          notification.addEventListener("click", function (event) {
            window.open("http://localhost:3000/daily-quiz");;
          });
        }
      });
    }
  };

  const handleClick = () => { createNotification("Hello, Ash! Hurry!", "👾⏰👾\nClick to complete your daily quiz too!!"); };


  if (showTime >= 9 && showTime <= 17) { // this will only run if the current time is between 9 and 17
    let range = 17 - showTime; // this will give the number of hours between the current time and 17:00
    let randomTime = Math.floor(Math.random() * (range * 60 * 60 * 1000 - 1000) + 1000); // this will give a random point in time between the current time and 17:00
    console.log(randomTime);
    setTimeout(() => { // this will run the createNotification function after the random time has passed
      createNotification("Reminder", "Time for your daily quiz!!");
    }, randomTime); 
  }

    return (
      <Button ref={buttonRef} onClick={handleClick}>
        Click me to get a notification
      </Button>
    );
}
