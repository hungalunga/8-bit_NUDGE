import { Menubar } from 'primereact/menubar';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button'
import {Link} from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';
import './Dashboard.css';
import { Avatar } from 'primereact/avatar';


export default function Dashboard(){
    return(<div>
        <div className="Profile">
        <Card title="Welcome Back">
            <div className ='cardTitle'>
            <Avatar label="P" size="xlarge" shape="circle" className='circleAvatar'/>
                Username
                <div className = 'points'>
                    <Skeleton height='75px' width='75px' borderRadius="20px" className="mb-2"></Skeleton>
                    <Skeleton height='75px' width='75px' borderRadius="20px" className="mb-2"></Skeleton>
                    <Skeleton height='75px' width='75px' borderRadius="20px" className="mb-2"></Skeleton>
                </div>
            </div>
        </Card>
        </div>
        <div className="bottomHalf">
            <div className="Quiz">
                <h2>today's learning quiz</h2>
                <Link to='/quiz'>
                    <Button label="Today's Quiz" size="large"/>
                </Link>
            </div>
            <div className="Leaderboard">
                <h2>leaderboard</h2>
                <div className="leaderboardCard">
                    
                        <div className="leaderboardCardTitle">
                        </div>
                    </div>

                </div>
        </div>
    </div>);
};
