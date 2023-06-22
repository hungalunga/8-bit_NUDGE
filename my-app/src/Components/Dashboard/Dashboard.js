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

export default function Dashboard() {
	const [firstChar, setFirstChar] = useState('');


	useEffect(() => {
		const usernameElement = document.getElementById('username');
		if (usernameElement) {
		  const textContent = usernameElement.textContent;
		  if (textContent) {
			const capitalFirstChar = textContent.charAt(0).toUpperCase();
			setFirstChar(capitalFirstChar);
		  }
		}
	  }, []);
	  const cardStyles = {
		width: '75px',
		height: '75px',
		borderRadius: '10px'
	  };
	return (
		<>
			<div className="navbar">
				<Link to="/home">  
					  <img src={nudgelogo} alt="nudge-logo" className = "nudgeLogo"/>
				</Link>
			</div>
			<div className="dashboard-page">
				<div className="dashboard-top">
					<div className="welcome-container">
						<Avatar label={firstChar} size="xlarge" className="circleAvatar" />
						<div className="welcome-text">
							<h1>Welcome Back,</h1>
							<h1 id="username">ashwantspizza!</h1>
						</div>
					</div>
					<div className="user-scores">
						<Card subTitle="3 Day Streak!"/>
						<Card subTitle="250 XP"/>
						<Card subTitle="No.4 Ranking"/>
					</div>
				</div>

				<Divider />
				<div className="dashboard-bottom">
					<div className="learning-container">
						<h2>Your Learning:</h2>
						<Link to="/quiz">
							<Button label="Today's Quiz" size="large" />
						</Link>
						<h3>Want to level up? Try one of these...</h3>
					<div className="learning-buttons">
						<Button label="Geometry" severity="secondary"/>
						<Button label="Algebra" severity="secondary"/>
						<Button label="Trigonometry" severity="secondary"/>
						<Button label="Surprise me!" severity="secondary"/>
					</div>
					</div>

					<div className="leaderboard-container">
						<h2 className = "leaderboard-text">Leaderboard</h2>
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
