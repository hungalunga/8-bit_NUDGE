import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import nudgelogo from "../../images/nudgelogo.png";
import "primeicons/primeicons.css";

export default function Dashboard(props) {
	const [firstChar, setFirstChar] = useState("");

	useEffect(() => {
		const usernameElement = document.getElementById("username");
		if (usernameElement) {
			const textContent = usernameElement.textContent;
			if (textContent) {
				const capitalFirstChar = textContent.charAt(0).toUpperCase();
				setFirstChar(capitalFirstChar);
			}
		}
	}, []);

	return (
		<>
			<link
				href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
				rel="stylesheet"
			/>
			<div className="navbar">
				<Link to="/home">
					<img src={nudgelogo} alt="nudge-logo" className="nudge-logo" />
				</Link>
				<Avatar label={firstChar} className="avatar-small" />
			</div>
			<div className="dashboard-page">
				<div className="dashboard-top">
					<div className="welcome-container">
						<Avatar label={firstChar} size="xlarge" className="circleAvatar" />
						<div className="welcome">
							<h1 className="welcome-text">Welcome back,</h1>
							<h1 id="username">ashwantspizza!</h1>
						</div>
					</div>
					<div className="user-scores">
						<Card title={`${props.streakCount}`} subTitle="Day Streak!" />
						<Card title={`${props.totalScore}`} subTitle=" Points!" />
						<Card title="No.4" subTitle=" Ranking" />
					</div>
				</div>

				<Divider />
				<div className="dashboard-bottom">
					<div className="learning-container">
						<div className="learning-header">
							<h2><strong>Your Learning</strong></h2>
						</div>
						<Link to="/quiz">
							<Button
								className="primary-quiz-button"
								label="Today's Quiz"
								size="large"
							/>
						</Link>
						<h3>
							Want to level up? <b>Try one of these...</b>
						</h3>

						<div className="learning-buttons-container">
							<Button
								className="learning-button"
								label="Geometry"
								severity="secondary"
							/>
							<Button
								className="learning-button"
								label="Algebra"
								severity="secondary"
							/>
							<Button
								className="learning-button"
								label="Trig"
								severity="secondary"
							/>
							<Button
								className="learning-button"
								label="Surprise me!"
								severity="secondary"
							/>
						</div>
					</div>

					<div className="leaderboard-container">
						<h2 className="leaderboard-text"><strong>Leaderboard</strong></h2>
						<DataTable tableStyle={{ minWidth: "27rem" }}>
							<Column field="user" header="User"></Column>
							<Column field="ranking" header="Ranking"></Column>
							<Column field="xp" header="XP"></Column>
						</DataTable>
					</div>
				</div>
			</div>
		</>
	);
}
