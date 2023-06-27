import React from "react";


function WebsiteEmbed() {

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
    <div>


      <h3>Getting stuck? Ask NUDGE-bot for help</h3>
      <iframe  
      title="W3Schools Free Online Web Tutorials"
      style={iframeStyle}
      src="https://app.insertchatgpt.com/embed/349cbae1-318e-4328-9735-deaafd7edb8a"></iframe>
      <div style={overlayStyle}></div>
      {/* <Button variant="contained">Hello World</Button> */}
    </div>
  );
}

export default WebsiteEmbed;
