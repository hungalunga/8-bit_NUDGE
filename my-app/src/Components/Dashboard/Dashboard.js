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
  const [leaderboard, setLeaderboard] = useState(null);
  const [rank, setRank] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
        const { data: userProfile } = await props.supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id);

        setUserProfile(userProfile)

				function getUsernameFromEmail(email) {
					const index = email.indexOf("@");
					const username = email.slice(0, index);
					// capitalise the first letter of the username
					const upperCaseUsername = username.charAt(0).toUpperCase();
					return upperCaseUsername + username.slice(1);
				}
        if (userProfile[0].user_name.includes("@")) {
          setUsername(getUsernameFromEmail(userProfile[0].user_name));
        } else {
          setUsername(userProfile[0].user_name);
        }

        // function that takes the first letter of username and capitalizes it for the avatar
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

    getUserProfile();
  }, [user, props.supabase, editMode]);

  useEffect(() => {
    async function getLeaderboard() {
      const { data: leaderboard } = await props.supabase
        .from("profiles")
        .select("user_name, user_score")
        .order("user_score", { descending: true })
        .limit(10);
      const rankedProfiles = leaderboard.map((profile, index) => ({
        ...profile,
        rank: index + 1,
      }));

      console.table("leaderboard:", leaderboard);
      console.table("rankedProfiles:", rankedProfiles);
      setLeaderboard(rankedProfiles);
    }

    getLeaderboard();

    async function getScore() {
      const { data: score } = await props.supabase
        .from("profiles")
        .select("user_score")
        .eq("id", user.id);
      console.log("score:", score);
      const currentScore = score[0].user_score;
      props.setTotalScore(currentScore);
    }

    getScore();
  }, [props.supabase, user]);

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

  // function to cause a reRender of the page when the user_name is updated
  async function handleSaveClick() {
    if (selectedFile) {
      try {
        const { data, error } = await props.supabase.storage
          .from("profile_pictures")
          .upload(
            `${props.session.user.id}/${selectedFile.name}`,
            selectedFile
          );

        if (error) {
          console.error("Error uploading file:", error);
        } else {
          console.log("Successfully uploaded file:", data);
        }
      } catch (err) {
        console.error("Unexpected error uploading file:", err);
      }
    }

    await props.supabase
      .from("profiles")
      .update({
        profile_picture:
          (userProfile[0].profile_picture = `https://suqficsxrflfgpebathx.supabase.co/storage/v1/object/public/profile_pictures/${props.session.user.id}/${selectedFile.name}`),
      })
      .eq("id", user.id);

    await props.supabase
      .from("profiles")
      .update({
        user_name: userProfile[0].user_name,
      })
      .eq("id", user.id);

    setEditMode(false);
  }

  // function to get the rank of the user from the leaderboard
  // access the user_name from the userProfile state
  // access the leaderboard state
  // find the user_name in the leaderboard state
  // set the rank of the user to the rank state

  useEffect(() => {
    async function getRank() {
      const userRank = leaderboard.find(
        (leaderboard) => leaderboard.user_name === username
      );
      setRank(userRank.rank);
    }
    getRank();
  }, [leaderboard, username]);

  // handleChange function to update the user_name in the userProfile state
  // access the user_name from the userProfile state
  // update the user_name in the userProfile state
  // pass the updated userProfile state to the handleSaveClick function

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
    const file = e.files[0];
    console.log("file:", file);
    setSelectedFile(file);
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <div className="navbar">
        <Link to="/">
          <img src={nudgelogo} alt="nav-logo" className="nav-logo" />
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
            {editMode ? (
              <FileUpload
                name=""
                url=""
                multiple
                accept="image/*"
                maxFileSize={1000000}
                emptyTemplate={
                  <p className="m-0">Drag and drop files here to upload.</p>
                }
                chooseLabel="Select"
                uploadLabel="Upload"
                cancelLabel="Cancel"
                customUpload
                uploadHandler={onUpload}
                onClear={() => setSelectedFile(null)}
                selectedFiles={selectedFile ? [selectedFile] : []}
              />
            ) : null}
            <div className="welcome">
              <h1 className="welcome-text">Welcome back,</h1>
              {editMode ? (
                <InputText
                  type="text"
                  className="p-inputtext-lg"
                  placeholder={username}
                  onChange={(e) => {
                    const updatedUserProfile = userProfile.map((profile) => ({
                      ...profile,
                      user_name: e.target.value,
                    }));
                    setUserProfile(updatedUserProfile);
                  }}
                />
              ) : (
                <h1 className="magenta" id="username">{username}!</h1>
              )}
            </div>
          </div>
          <div className="user-scores">
            <Card className="correct-XP-card" title={`${props.streakCount}`} subTitle="Day Streak!" />
            <Card className="correct-XP-card" title={`${props.totalScore}`} subTitle="Points!" />
            <Card className="correct-XP-card" title={`No.${rank}`} subTitle="Ranking" />
          </div>
        </div>
  
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
            <DataTable tableStyle={{ minWidth: "27rem" }} value={leaderboard}>
              <Column field="rank" header="Rank" sortable></Column>
              <Column field="user_name" header="Username" sortable></Column>
              <Column field="user_score" header="XP" sortable></Column>
            </DataTable>
          </div>
        </div>
      </div>
      {editMode ? (
        <div>
          <Button label="Save" onClick={handleSaveClick} />
          <Button label="Cancel" onClick={handleCancelClick} />
        </div>
      ) : null}
    </>
  );

}
