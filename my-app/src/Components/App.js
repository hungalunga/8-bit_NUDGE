import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import PromptQuiz from "./PromptQuiz/PromptQuiz";
import MainQuiz from "./MainQuiz/MainQuiz";
import Dashboard from "./Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import PromptNotification from "./PromptNotification/PromptNotification";
import nudgelogo from "../images/nudgelogo.png"
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
			defaultButtonBorder: "#F7F7F7",
			defaultButtonText: "#39207E",
			dividerBackground: "#eaeaea",
			inputBackground: "transparent",
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
	const [streak, setStreak] = useState(false);
	const [streakCount, setStreakCount] = useState(0);
	const [totalScore, setTotalScore] = useState(10);
	const [session, setSession] = useState(null);

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
				<div className="login-page">
					<div className="login-container">
					<div className="logo-tagline-container">
					<img src={nudgelogo} alt="nudge-logo" className="nudge-logo" />
					<h3>The revision app that <strong>actually works</strong>.</h3>
					</div>
						<div className="login-form"> 
						<div className="auth">
							<Auth
								supabaseClient={supabase}
								theme="default"
								appearance={{ theme: customTheme }}
								providers={["google", "facebook"]}
							/> </div>
						</div>
					</div>
					
					<div className="description-container">
						<h1>How it works</h1>
						<div className="steps-container">
							<div className="step">
								<h3 className="magenta">
									<strong>Each day we’ll send you a NUDGE.</strong>
								</h3>
								<p>The catch? You won’t know when to expect it.</p>
							</div>
							<div className="step">
								<h3 className="magenta">
									<strong>Act fast!</strong>
								</h3>
								<p>
									You have 3 minutes to tap the notification & answer the
									question.
								</p>
							</div>
							<div className="step">
								<h3 className="magenta">
									<strong>Missed your NUDGE?</strong>
								</h3>
								<p>
									Keep your streak by completing any of the quizzes on the app.
								</p>
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
