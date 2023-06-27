import React from "react";

import { Button } from "primereact/button";

export default function ExitQuizButton() {


    function handleClick() {
        const result = window.confirm("Are you sure you want to exit the quiz?");
        if (result) {
            window.location.href = "/home";
    }
    }

  return (
    <>
      <Button label="Exit Quiz" onClick = {handleClick} />
    </>

  );
}
