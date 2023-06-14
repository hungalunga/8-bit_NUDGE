import { useEffect, useRef } from "react";
// import logoIcon from "./logo2.png";

// Write an if statement to check if the notification has been sent or not
    // if notification has been sent do not send another notification
    // if notification hasn't been sent randomly send notification between 9:00 - 17:00
        // Internal clock that checks time and does not send notification at unsociable hours
        // send notification logic at random time
// Notification link to send to a singular quiz question        
  
    
export default function PromptQuiz() { 

const date = new Date();
const showTime = date.getHours()
// const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    //   const buttonRef = useRef(null);
    //   const timer = useRef(null);
      const awayTimer = useRef(null);
    
    //   useEffect(() => {
    //     timer.current = setTimeout(() => {
    //       if (buttonRef.current) {
    //         buttonRef.current.click();
    //       }
    //     }, 5000);
    
    //     return () => {
    //       clearTimeout(timer.current);
    //     };
    //   }, []);




    //while (showTime >= 9 && showTime <= 17) {
     //   const notification = new Notification("Quiz Time");
     //   console.log("Quiz Time")
    //    break;
    //}
    
      
    
      const createNotification = (title, body) => {
        const options = {
          body: body,
          // icon: logoIcon,
          // badge: logoIcon,
        };
    
        if ("Notification" in window && Notification.permission === "granted" && showTime >= 9 && showTime <= 17) {
          const notification = new Notification(title, options);
          notification.addEventListener("click", function (event) {
            window.open("https://localhost:3000", "_blank");
          });
        } else if ("Notification" in window && Notification.permission !== "denied" && showTime >= 9 && showTime <= 17) {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              const notification = new Notification(title, options);
    
              notification.addEventListener("click", function (event) {
                window.open("https://localhost:3000", "_blank");
              });
            }
          });
        }
    };
    
console.log(showTime)
// const random time for between 10 minutes and an hour (in milliseconds)


if (showTime >= 9 && showTime <= 17) {
    let range = 17 - showTime;
    let randomTime = Math.floor(Math.random() * (range * 60 * 60 * 1000 - 1000) + 1000); // this will give a random point in time between the current time and 17:00
    console.log(randomTime)
    setTimeout(() => {
    createNotification("Reminder", "Time for your daily quiz!!");
    }, randomTime); 
}
// const getRandomInterval = () => {
//   const startHour = 9; // 9am
//   const endHour = 17; // 5pm
//   const millisecondsInHour = 60 * 60 * 1000;
//   const randomInterval = Math.floor(Math.random() * (endHour - startHour + 1) + startHour);
//   return randomInterval * millisecondsInHour;
// };128478


 /*   useEffect(() => {
        if (typeof window !== 'undefined') {
          const handleVisibilityChange = () => {
            if (document.hidden) {
              awayTimer.current = setInterval(() => {
                createNotification("Reminder", "Time for your daily quiz!!");
              }, 1000000);  // 10 seconds reminder
            } else {
              clearInterval(awayTimer.current);
            }
          };
    
          document.addEventListener('visibilitychange', handleVisibilityChange);
          return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
      }, []);
    */
    //   const handleClick = () => {
    //     createNotification("Hello, Bernard! Hurry!", "👾⏰👾\nClick to complete your daily quiz too!!");
    //   };
    
    //   return (
    //     <button ref={buttonRef} onClick={handleClick}>
    //       Click here for push test!<br></br>I will auto press after 5 seconds
    //     </button>
    //   );


    }
    
    

