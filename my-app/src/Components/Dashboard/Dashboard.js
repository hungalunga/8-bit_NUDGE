import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";
import { Skeleton } from "primereact/skeleton";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Dashboard.css";

// write a specific user profile page
// create an SQL table in supabase for user profile
// create a form for user to fill out
// display information user has stored in SQL database on the page
// allow user full access to edit their profile information
// pull JWT from supabase and use it to authenticate user

// useState to store user via JWT
// useEffect to pull user information from SQL database
// useEffect to update user information in SQL database
// button for edit mode (useState to toggle edit mode)
// button for save changes
// button for cancel changes

// create a form for user to fill out
// display information user has stored in SQL database on the page
// allow user full access to edit their profile information
// pull JWT from supabase and use it to authenticate user

export default function Dashboard(props) {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [username, setUsername] = useState(null);
  const [firstLetter, setFirstLetter] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { user } = props.session;
      setUser(user);
    }

    fetchUser();
  }, [props.session]);


  useEffect(() => {
    async function getUserProfile() {
      if (user !== null && user !== undefined) {
        // console.log('user is not null');
        // console.log(user);
        const { data: userProfile } = await props.supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        console.log(userProfile);
        console.log(userProfile[0].user_name);
        setUserProfile(userProfile);

        function getUsernameFromEmail(email) {
          const index = email.indexOf("@");
          const username = email.slice(0, index);
          // capitalise the first letter of the username
          const upperCaseUsername = username.charAt(0).toUpperCase();
          return upperCaseUsername + username.slice(1);
        }

        setUsername(getUsernameFromEmail(userProfile[0].user_name))

        console.log("username is:", username);  
        
          // function that takes the first letter of username and capitalises it for the avatar
          if (username) {
          function getFirstLetter(username) {
        
        const firstLetter = username.charAt(0).toUpperCase();
        return firstLetter;
        
      }
      setFirstLetter(getFirstLetter(username));
      console.log("first letter is:", firstLetter);
    }
      }
    }
  
    // console.log('user is null');
    // console.log(user);
    getUserProfile();
    
  }
  , [user, props.supabase, username, firstLetter]);
  

  async function handleSaveClick() {
    await props.supabase.from("public.profiles").upsert({
      id: user.id,
      ...userProfile,
    });
    setEditMode(false);
  }

  async function handleCancelClick() {
    setEditMode(false);
  }

  async function handleEditClick() {
    setEditMode(true);
  }

  return (
    <>
      {editMode ? (
        <>
          <Button label="Save" onClick={handleSaveClick} />
          <Button label="Cancel" onClick={handleCancelClick} />
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
      ) : (
        <>
          <Button label="Edit" onClick={handleEditClick} />
          <div className="dashboard-page">
            <div className="dashboard-top">
              <div className="welcome-container">
                <Avatar label={firstLetter} size="xlarge" className="circleAvatar" />
                <div className="welcome-text">
                  <p>Welcome Back,</p>
                  <h1>{username}</h1>
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
      )}
    </>
  );
}
