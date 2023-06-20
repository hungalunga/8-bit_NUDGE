import { Route, Routes } from "react-router-dom";
import "./App.css";
import PromptQuiz from "./PromptQuiz/PromptQuiz";
import MainQuiz from "./MainQuiz/MainQuiz";
import Dashboard from "./Dashboard/Dashboard";
import { Menubar } from "primereact/menubar";
import PromptRandomGrab from "./PromptRandomGrab/PromptRandomGrab";
import "primeicons/primeicons.css";
import "../theme.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://suqficsxrflfgpebathx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1cWZpY3N4cmZsZmdwZWJhdGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxNjk3ODQsImV4cCI6MjAwMjc0NTc4NH0.8HlWTJSEkeuM7lHOo8j572i3k_9eEF5855-th3yP3Hw"
);

const customTheme = {
  default: {
    colors: {
      brand: "#FFD500",
      brandAccent: "#D9D1F3",
      brandButtonText: "#39207E",
      defaultButtonBackground: "#F7F7F7",
      defaultButtonBackgroundHover: "#D9D1F3",
      defaultButtonBorder: "#F7F7F7",
      defaultButtonText: "#39207E",
      dividerBackground: "#eaeaea",
      inputBackground: "transparent",
      inputBorder: "lightgray",
      inputBorderHover: "gray",
      inputBorderFocus: "gray",
      inputText: "black",
      inputLabelText: "gray",
      inputPlaceholder: "darkgray",
      messageText: "gray",
      messageTextDanger: "red",
      anchorTextColor: "gray",
      anchorTextHoverColor: "darkgray",
    },
    space: {
      spaceSmall: "4px",
      spaceMedium: "8px",
      spaceLarge: "16px",
      labelBottomMargin: "8px",
      anchorBottomMargin: "4px",
      emailInputSpacing: "4px",
      socialAuthSpacing: "4px",
      buttonPadding: "10px 15px",
      inputPadding: "10px 15px",
    },
    fontSizes: {
      baseBodySize: "13px",
      baseInputSize: "14px",
      baseLabelSize: "14px",
      baseButtonSize: "14px",
    },
    fonts: {
      bodyFontFamily: `ui-sans-serif, sans-serif`,
      buttonFontFamily: `ui-sans-serif, sans-serif`,
      inputFontFamily: `ui-sans-serif, sans-serif`,
      labelFontFamily: `ui-sans-serif, sans-serif`,
    },
    // fontWeights: {},
    // lineHeights: {},
    // letterSpacings: {},
    // sizes: {},
    borderWidths: {
      buttonBorderWidth: "1px",
      inputBorderWidth: "1px",
    },
    // borderStyles: {},
    radii: {
      borderRadiusButton: "4px",
      buttonBorderRadius: "4px",
      inputBorderRadius: "4px",
    },
  }
};

export default function App() {
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location = "/home";
      },
    },
    {
      label: "Quiz",
      icon: "pi pi-fw pi-calendar",
      command: () => {
        window.location = "/quiz";
      },
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        const { error } = supabase.auth.signOut();
      },
    },
  ];
  return (
    <>
      <div className="App">
        <header className="App-header">NUDGE</header>
        <PromptQuiz />
        <Menubar className= "menubar" model={items} />
      </div>
      <Routes>
        <Route path="/quiz" element={<MainQuiz />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/daily-quiz" element={<PromptRandomGrab />} />
      </Routes>
    </>
  );
}
