import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";
import { Skeleton } from "primereact/skeleton";
import { Link } from "react-router-dom";
import "./Dashboard.css";
// import nudgelogo from "../logo-image/nudgelogo.png";

export default function Dashboard() {
	return (
		<>
			<div className="navbar">
				<Link to="/home"> logo </Link>
				{/* <img src={nudgelogo} alt="nudge-logo" /> */}
			</div>
			<div className="dashboard-page">
				<div className="dashboard-top">
					<div className="welcome-container">
						<Avatar label="A" size="xlarge" className="circleAvatar" />
						<div className="welcome-text">
							<p>Welcome Back,</p>
							<h1>ashwantspizza</h1>
						</div>
					</div>
					<div className="user-scores">
						<Skeleton
							height="75px"
							width="75px"
							borderRadius="15px"
							className="mb-2"
						/>
						<Skeleton
							height="75px"
							width="75px"
							borderRadius="15px"
							className="mb-2"
						/>
						<Skeleton
							height="75px"
							width="75px"
							borderRadius="15px"
							className="mb-2"
						/>
					</div>
				</div>

				<Divider />
				<div className="dashboard-bottom">
					<div className="learning-container">
						<h2>Your Learning</h2>
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
						<h2>Leaderboard</h2>
						<DataTable tableStyle={{ minWidth: "30rem" }}>
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
