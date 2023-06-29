import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { Route, Routes } from "react-router-dom";
import { Button } from "primereact/button";
import PromptQuiz from "./PromptQuiz/PromptQuiz";
import MainQuiz from "./MainQuiz/MainQuiz";
import WebsiteEmbed from "./WebsiteEmbed/WebsiteEmbed";
import Dashboard from "./Dashboard/Dashboard";
import nudgelogo from "../images/nudgelogo.png";
import notification from "../images/notification.png";
import alarm from "../images/alarm.png";
import calendar from "../images/calendar.png";
import "primeicons/primeicons.css";
import "../prime-react-theme/theme.css";
import "./App.css";
// import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
	"https://suqficsxrflfgpebathx.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1cWZpY3N4cmZsZmdwZWJhdGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxNjk3ODQsImV4cCI6MjAwMjc0NTc4NH0.8HlWTJSEkeuM7lHOo8j572i3k_9eEF5855-th3yP3Hw"
);

// theme for login page for supabase
const customTheme = {
	default: {
		colors: {
			brand: "#FFD500",
			brandAccent: "#D9D1F3",
			brandButtonText: "#39207E",
			defaultButtonBackground: "#F7F7F7",
			defaultButtonBackgroundHover: "#D9D1F3",
			defaultButtonBorder: "#D9D1F3",
			defaultButtonText: "#39207E",
			dividerBackground: "#eaeaea",
			inputBackground: "#F7F7F7",
			inputBorder: "transparent",
			inputBorderHover: "#891891",
			inputBorderFocus: "#39207E",
			inputText: "#39207E",
			inputLabelText: "#39207E",
			inputPlaceholder: "darkgray",
			messageText: "gray",
			messageTextDanger: "red",
			anchorTextColor: "#891891",
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
			baseInputSize: "15px",
			baseLabelSize: "20px",
			baseButtonSize: "18px",
		},
		fonts: {
			bodyFontFamily: `"Quicksand", sans-serif`,
			buttonFontFamily: `"Quicksand", sans-serif`,
			inputFontFamily: `"Quicksand", sans-serif`,
			labelFontFamily: `"Quicksand", sans-serif`,
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
			borderRadiusButton: "15px",
			buttonBorderRadius: "30px",
			inputBorderRadius: "8px",
		},
	},
};

export default function App() {
  console.log("netlify");

  const [streak, setStreak] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [session, setSession] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    async function updateScore() {
      await supabase
        .from("profiles")
        .update({ user_score: totalScore })
        .eq("id", session.user.id);
    }
    if (session !== null) {
      updateScore();
    }
  }, [totalScore, session]);


	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	// if not logged in, then show login page
	if (!session) {
		return (
			<>
				<div id="getstarted" className="login-page">
					<div className="login-container">
						<div className="logo-tagline-container">
							<img src={nudgelogo} alt="nudge-logo" className="nudge-logo" />
							<h2>
								The revision app that <strong>actually works</strong>.
							</h2>
							<HashLink smooth to="/#findoutmore">
								Find out more
							</HashLink>
						</div>
						<div className="login-form">
							<div className="auth">
								<Auth
									supabaseClient={supabase}
									theme="default"
									appearance={{ theme: customTheme }}
									providers={[]}
								/>
							</div>
						</div>
					</div>
					<div className="landing-footer">
						<div id="findoutmore" className="description-container">
							<h1 className="magenta">How it works</h1>
							<div className="steps-container">
								<div className="step">
									<img
										src={notification}
										alt="notification"
										className="step-icon"
									/>
									<h3>
										<strong>Each day we’ll send you a NUDGE.</strong>
									</h3>
									<p className="step-p">
										The catch? You won’t know when to expect it.
									</p>
								</div>
								<div className="step">
									<img src={alarm} alt="alarm" className="step-icon" />
									<h3>
										<strong>Act fast!</strong>
									</h3>
									<p className="step-p">
										You have 3 minutes to tap the notification & answer the
										question.
									</p>
								</div>
								<div className="step">
									<img src={calendar} alt="calendar" className="step-icon" />
									<h3>
										<strong>Missed your NUDGE?</strong>
									</h3>
									<p className="step-p">
										Save your streak by finishing any quiz on the app.
									</p>
								</div>
							</div>
						</div>
						<div className="about-us-container">
							<div className="about-us">
								<h3 className="off-white">
									The hardest part of revising is finding the will-power to get
									started - NUDGE disrupts your doom-scrolling, getting you
									right back into your learning.
								</h3><div className="get-started-button">
								<HashLink smooth to="/#getstarted">
									<Button
										className="confirm-button"
										severity="primary"
										label="Get Started"
									></Button>
								</HashLink></div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
		// else if logged in, then show dashboard
	} else {
		return (
			<>
				<Routes>
					<Route
						path="/quiz"
						element={
							<MainQuiz
                supabase={supabase}
                session={session}
								totalScore={totalScore}
								setTotalScore={setTotalScore}
								streak={streak}
								setStreak={setStreak}
								streakCount={streakCount}
								setStreakCount={setStreakCount}
							/>
						}
					/>
										<Route
						path="/nudgebot"
						element={
              <WebsiteEmbed
                supabase={supabase}
							/>
						}
					/>
					<Route
						path="/"
						element={
							<Dashboard
                session={session}
                supabase={supabase}
                totalScore={totalScore}
                setTotalScore={setTotalScore}
                streakCount={streakCount}
              />
						}
					/>
					<Route path="/nudge-quiz-late" element={<PromptQuiz late={true} />} />
					<Route
						path="/nudge-quiz"
						element={
              <PromptQuiz
                supabase={supabase}
                session={session}
                totalScore={totalScore}
                setTotalScore={setTotalScore}
                streak={streak}
                setStreak={setStreak}
                streakCount={streakCount}
                setStreakCount={setStreakCount}
              />
						}
					/>
				</Routes>
			</>
		);
	}
}
