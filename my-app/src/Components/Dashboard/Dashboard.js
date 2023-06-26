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

	return (
		<>
		<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
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
							<h1 className='welcome-text'>Welcome Back,</h1>
							<h1 id="username">ashwantspizza!</h1>
						</div>
					</div>
					<div className="user-scores">
						<Card title= {`${props.streakCount}`} subTitle= 'Day Streak!'/>
						<Card title= {`${props.totalScore}`} subTitle=" Points!"/>
						<Card title= "No.4" subTitle=" Ranking"/>
					</div>
				</div>

				<Divider />
				<div className="dashboard-bottom">
					<div className="learning-container">
						<h2><b>Your Learning:</b></h2>
						<Link to="/quiz">
							<Button label="Daily Quiz" size="large" />
						</Link>
						<div className = 'socials'>
							{/* social stuff here */}
							<p>Share your progress</p>
							<i className = 'pi pi-facebook'></i>
							<img alt="dropdown icon" src="/icons/arrow_down.png" />
							<span className='material-symbols-outlined'>tiktok</span>
						</div>
						<h3>Want to level up? <b>Try one of these...</b></h3>

					<div className="learning-buttons-container">
						<Button className="learning-button" label="Geometry" severity="secondary"/>
						<Button className="learning-button" label="Algebra" severity="secondary"/>
						<Button className="learning-button" label="Trig" severity="secondary"/>
						<Button className="learning-button" label="Surprise me!" severity="secondary"/>
					</div>
					</div>

					<div className="leaderboard-container">
						<h2 className = "leaderboard-text"><b>Leaderboard</b></h2>
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
