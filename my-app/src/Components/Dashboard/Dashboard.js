import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import "./Dashboard.css";
import nudgelogo from "../../images/nudgelogo.png";
import "primeicons/primeicons.css";

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
          .eq("id", user.id);
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

        setUsername(getUsernameFromEmail(userProfile[0].user_name));

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
  }, [user, props.supabase, username, firstLetter]);

  const menuRight = useRef(null);
  //const router = useRouter();
  const toast = useRef(null);
  const menuItems = [
    {
      label: "My Dashboard",
      command: () => {
        window.location = "/";
      },
    },
    {
      label: "Today's Quiz",

      command: () => {
        window.location = "/quiz";
      },
    },
    {
      label: "NUDGE-bot Help",

      command: () => {
        window.location = "/quiz";
      },
    },
    {
      template: (item, options) => {
        return <button label="Edit Profile" onClick={handleEditClick} />;
      },
    },
    {
      label: "Logout",
      command: () => {
        props.supabase.auth.signOut();
      },
    },
  ];

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

  async function onUpload(e) {
    // upload file to storage bucket
    // bucket is called profile_pictures
    // file is uploaded to public folder
    const file = e.target.files[0];
    await props.supabase.storage
      .from("profile_pictures")
      .upload(`public/${user.id}`, file);
  }

  return (
    <>
      {editMode ? (
        <>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
            rel="stylesheet"
          />
          <div className="navbar">
            <Link to="/">
              <img src={nudgelogo} alt="nudge-logo" className="nudge-logo" />
            </Link>
            <Toast ref={toast}></Toast>

            <Menu
              model={menuItems}
              popup
              ref={menuRight}
              id="popup_menu_right"
              popupAlignment="right"
            />
            <Avatar
              label={firstLetter}
              className="avatar-small"
              onClick={(event) => menuRight.current.toggle(event)}
              aria-controls="popup_menu_right"
              aria-haspopup
            />
          </div>
          <div className="dashboard-page">
            <div className="dashboard-top">
              <div className="welcome-container">
                <Avatar
                  label={firstLetter}
                  size="xlarge"
                  className="circleAvatar"
                />
                <FileUpload
                  mode="basic"
                  name="demo[]"
                  url="/api/upload"
                  accept="image/*"
                  maxFileSize={1000000}
                  onUpload={onUpload}
                />
                <div className="welcome">
                  <h1 className="welcome-text">Welcome back,</h1>
                  <InputText
                    type="text"
                    className="p-inputtext-lg"
                    placeholder={username}
                  />
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
                  <h2>
                    <strong>Your Learning</strong>
                  </h2>
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
                <h2 className="leaderboard-text">
                  <strong>Leaderboard</strong>
                </h2>
                <DataTable tableStyle={{ minWidth: "27rem" }}>
                  <Column field="user" header="User"></Column>
                  <Column field="ranking" header="Ranking"></Column>
                  <Column field="xp" header="XP"></Column>
                </DataTable>
              </div>
            </div>
          </div>
          <div>
            <Button label="Save" onClick={handleSaveClick} />
            <Button label="Cancel" onClick={handleCancelClick} />
          </div>
        </>
      ) : (
        <>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
            rel="stylesheet"
          />
          <div className="navbar">
            <Link to="/home">
              <img src={nudgelogo} alt="nudge-logo" className="nudge-logo" />
            </Link>
            <Toast ref={toast}></Toast>

            <Menu
              model={menuItems}
              popup
              ref={menuRight}
              id="popup_menu_right"
              popupAlignment="right"
            />
            <Avatar
              label={firstLetter}
              className="avatar-small"
              onClick={(event) => menuRight.current.toggle(event)}
              aria-controls="popup_menu_right"
              aria-haspopup
            />
          </div>
          <div className="dashboard-page">
            <div className="dashboard-top">
              <div className="welcome-container">
                <Avatar
                  label={firstLetter}
                  size="xlarge"
                  className="circleAvatar"
                />
                <div className="welcome">
                  <h1 className="welcome-text">Welcome back,</h1>
                  <h1 id="username">{username}!</h1>
                </div>
              </div>
              <div className="user-scores">
                <Card className="correct-XP-card" title={`${props.streakCount}`} subTitle="Day Streak!" />
                <Card className="correct-XP-card"title={`${props.totalScore}`} subTitle=" Points!" />
                <Card className="correct-XP-card"title="No.4" subTitle=" Ranking" />
              </div>
            </div>

            <Divider />
            <div className="dashboard-bottom">
              <div className="learning-container">
                <div className="learning-header">
                  <h2>
                    <strong>Your Learning</strong>
                  </h2>
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
                <h2 className="leaderboard-text">
                  <strong>Leaderboard</strong>
                </h2>
                <DataTable tableStyle={{ minWidth: "27rem" }}>
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
