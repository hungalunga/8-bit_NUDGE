import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";
import { Skeleton } from "primereact/skeleton";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
	return (
		<>
			<div className="navbar">
				<Link to="/home">Logo</Link>
				<div>icon</div>
			</div>
			<div className="dashboard-page">
				<div className="dashboard-top">
					<div className="welcome-container">
						<Avatar label="A" size="xlarge" className="circleAvatar" />
						<div className="welcome-text">
							<p>Welcome Back</p>
							<h1>ashwantspizza</h1>
						</div>
					</div>
					<div className="user-scores">
						<Skeleton
							height="75px"
							width="75px"
							borderRadius="20px"
							className="mb-2"
						/>
						<Skeleton
							height="75px"
							width="75px"
							borderRadius="20px"
							className="mb-2"
						/>
						<Skeleton
							height="75px"
							width="75px"
							borderRadius="20px"
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
					</div>

					<div className="leaderboard-container">
						<h2>Leaderboard</h2>
						<DataTable tableStyle={{ minWidth: "50rem" }}>
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
