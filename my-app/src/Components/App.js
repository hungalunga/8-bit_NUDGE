import PromptNotification from "./PromptNotification/PromptNotification";
import MainQuiz from "./MainQuiz/MainQuiz";
import Dashboard from "./Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import PromptQuiz from "./PromptQuiz/PromptQuiz";
import { useState } from "react";
import "primeicons/primeicons.css";
import "../prime-react-theme/theme.css";
import "./App.css";

// import { ThemeSupa } from "@supabase/auth-ui-shared";
const supabase = createClient(
  "https://suqficsxrflfgpebathx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1cWZpY3N4cmZsZmdwZWJhdGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxNjk3ODQsImV4cCI6MjAwMjc0NTc4NH0.8HlWTJSEkeuM7lHOo8j572i3k_9eEF5855-th3yP3Hw"
);

// theme for login page for supabase
// const customTheme = {
//   default: {
//     colors: {
//       brand: "#FFD500",
//       brandAccent: "#D9D1F3",
//       brandButtonText: "#39207E",
//       defaultButtonBackground: "#F7F7F7",
//       defaultButtonBackgroundHover: "#D9D1F3",
//       defaultButtonBorder: "#F7F7F7",
//       defaultButtonText: "#39207E",
//       dividerBackground: "#eaeaea",
//       inputBackground: "transparent",
//       inputBorder: "lightgray",
//       inputBorderHover: "gray",
//       inputBorderFocus: "gray",
//       inputText: "black",
//       inputLabelText: "gray",
//       inputPlaceholder: "darkgray",
//       messageText: "gray",
//       messageTextDanger: "red",
//       anchorTextColor: "gray",
//       anchorTextHoverColor: "darkgray",
//     },
//     space: {
//       spaceSmall: "4px",
//       spaceMedium: "8px",
//       spaceLarge: "16px",
//       labelBottomMargin: "8px",
//       anchorBottomMargin: "4px",
//       emailInputSpacing: "4px",
//       socialAuthSpacing: "4px",
//       buttonPadding: "10px 15px",
//       inputPadding: "10px 15px",
//     },
//     fontSizes: {
//       baseBodySize: "13px",
//       baseInputSize: "14px",
//       baseLabelSize: "14px",
//       baseButtonSize: "14px",
//     },
//     fonts: {
//       bodyFontFamily: `ui-sans-serif, sans-serif`,
//       buttonFontFamily: `ui-sans-serif, sans-serif`,
//       inputFontFamily: `ui-sans-serif, sans-serif`,
//       labelFontFamily: `ui-sans-serif, sans-serif`,
//     },
//     // fontWeights: {},
//     // lineHeights: {},
//     // letterSpacings: {},
//     // sizes: {},
//     borderWidths: {
//       buttonBorderWidth: "1px",
//       inputBorderWidth: "1px",
//     },
//     // borderStyles: {},
//     radii: {
//       borderRadiusButton: "4px",
//       buttonBorderRadius: "4px",
//       inputBorderRadius: "4px",
//     },
//   }
// };

export default function App() {

  // const items = [
  //   {
  //     label: "Home",
  //     command: () => {
  //       window.location = "/home";
  //     },
  //   },
  //   {
  //     label: "Quiz",

  //     command: () => {
  //       window.location = "/quiz";
  //     },
  //   },
  //   {
  //     label: "Logout",
  //     command: () => {
  //      supabase.auth.signOut();
  //     },
  //   },
  // ];

  const [streak, setStreak] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [totalScore, setTotalScore] = useState(10);

    return (
      <>
        <div className="App"> 
          {/* <Menubar className="menubar" model={items} /> */}
        </div>
        <div>
          <PromptNotification />
          {/* <PromptNotification/>  */}
        </div>  
        <Routes>
          <Route path="/quiz" element={<MainQuiz totalScore = {totalScore} setTotalScore ={setTotalScore} streak = {streak} setStreak = {setStreak} streakCount = {streakCount} setStreakCount = {setStreakCount} />} />
          <Route path="/home" element={<Dashboard totalScore = {totalScore} setTotalScore ={setTotalScore} streakCount = {streakCount}/>} />
          <Route path="/nudge-quiz-late" element={<PromptQuiz late = {true}/>} />
          <Route path="/nudge-quiz" element={<PromptQuiz totalScore = {totalScore} setTotalScore ={setTotalScore} streak = {streak} setStreak = {setStreak} streakCount = {streakCount} setStreakCount = {setStreakCount} />}
           />
        </Routes>
      </>
    );
  }
