import React from "react";
import FacebookBusinessLogin1 from "./FBLogin";
import FacebookBusinessLogin2 from "./FBLogin2";
import "./App.css"; // Import the CSS file

function App() {
  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <FacebookBusinessLogin1 />
        </div>
        <div className="login-box">
          <FacebookBusinessLogin2 />
        </div>
      </div>
    </>
  );
}

export default App;
