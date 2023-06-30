import { useRef } from "react";
import { Button } from "primereact/button";
import nudgeicon from "../../images/nudgeicon.ico";
export default function PromptNotification() {
  const date = new Date();
  const showTime = date.getHours(); //gets the current hour of the day
  const buttonRef = useRef(null);

  const createNotification = (title, body) => {
    //function that creates the notification with the title and body
    const inTimeRedirect =
      "https://8bit-nudge.netlify.app/nudge-quiz";
    const outOfTimeRedirect = "https://8bit-nudge.netlify.app/nudge-quiz-late";
    let redirect = inTimeRedirect;
    const options = {
      body: body,
      icon: nudgeicon, //this shows the nudge icon
      badge: nudgeicon, //this shows the nudge icon
    };
    setTimeout(() => {
      redirect = outOfTimeRedirect;
    }, 5000);

    if (
      //if the user has granted permission, and if the current time is between 9 and 17, then the notification will be created and the user will be able to click on it to go to the daily quiz
      "Notification" in window &&
       Notification.permission === "granted" // &&
      // showTime >= 9 &&  // time restrictions switched off temporarily for demo
      // showTime <= 6
    ) {
      console.log("notification requested")
      const notification = new Notification(title, options);
      console.log(notification)

      notification.addEventListener("click", function (event) {
        window.open(redirect);
      });
    } else if (
      "Notification" in window &&
      Notification.permission !== "granted"  // && // consider changing to === "default" || === "denied"
      // showTime >= 9 &&
      // showTime <= 17
    ) {
      //this checks if the browser supports notifications, if the user has denied permission, and if the current time is between 9 and 17
      console.log("notification permission not granted")
      Notification.requestPermission().then((permission) => {
        //this asks the user for permission to send notifications
        if (permission === "granted") {
          const notification = new Notification(title, options);

          notification.addEventListener("click", function (event) {
            window.open(redirect);
          });
        }
      });
    }
  };

  let notificationUserName = "Ash";

  function dQNotificationMessage(username) {
    let messagesArray = [
      `Hello, ${username}! Hurry!👾⏰👾`,
      `It's time for your daily quiz, ${username}!`,
      `Nudge nudge! ⏰ ${username}! Get to work!`,
    ]; //this is an array of messages that will be randomly selected from
    let randomMessage = Math.floor(Math.random() * messagesArray.length); //this will select a random message from the array
    return messagesArray[randomMessage]; //this will return the random message
  }

  function PromptQuizNotificationMessage(username) {
    let messagesArray = [
      `Time for your daily quiz!!⏰⏰⏰`,
      `⏰ 3 minutes counting down, ${username}!⏰⏰⏰`,
      `⏰ 180 secs to get your bonus, ${username}`,
    ]; //this is an array of messages that will be randomly selected from
    let randomMessage = Math.floor(Math.random() * messagesArray.length); //this will select a random message from the array
    return messagesArray[randomMessage]; //this will return the random message
  }

  const handleClick = () => {
    createNotification(PromptQuizNotificationMessage(notificationUserName));
  };

  if (showTime >= 9 && showTime <= 17) {
    // this will only run if the current time is between 9 and 17
    let range = 17 - showTime; // this will give the number of hours between the current time and 17:00
    let randomTime = Math.floor(
      Math.random() * (range * 60 * 60 * 1000 - 1000) + 1000
    ); // this will give a random point in time between the current time and 17:00
    console.log(randomTime);
    setTimeout(() => {
      // this will run the createNotification function after the random time has passed
      createNotification(dQNotificationMessage(notificationUserName));
    }, randomTime);
  }

  return (
    <Button ref={buttonRef} onClick={handleClick}>
      Click me to get a NUDGE
    </Button>
  );
}
