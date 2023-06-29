import { useRef } from "react";
import nudgelogo from "../../images/nudgelogo.png";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

function WebsiteEmbed(props) {
  const menuRight = useRef(null);
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
        window.location = "/nudgebot";
      },
    },
    {
      label: "Logout",
      command: () => {
        props.supabase.auth.signOut();
      },
    },
  ];

  const iframeStyle = {
    width: "100%",
    height: "725px",
    border: "none",
  };

  const overlayStyle = {
    position: "relative",
    width: "100%",
    height: "40px",
    backgroundColor: "white",
    bottom: "40px",
    zIndex: "1",
  };

  return (
    <>
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
        <Button
          label="Menu"
          icon="pi pi-align-right"
          className="mr-2"
          onClick={(event) => menuRight.current.toggle(event)}
          aria-controls="popup_menu_right"
          aria-haspopup
        />
      </div>
      <h3>Getting stuck? Ask NUDGE-bot for help</h3>
      <iframe
        title="W3Schools Free Online Web Tutorials"
        style={iframeStyle}
        src="https://app.insertchatgpt.com/embed/349cbae1-318e-4328-9735-deaafd7edb8a"
      ></iframe>
      <div style={overlayStyle}></div>
      {/* <Button variant="contained">Hello World</Button> */}
    </>
  );
}

export default WebsiteEmbed;
