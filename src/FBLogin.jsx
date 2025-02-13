//USING FRONTEND AND BACKEND

import React, { useEffect } from "react";

const FacebookBusinessLogin = () => {
 

  const handleLoginClick = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded yet!");
      return;
    }

    FB.login(
      function (response) {
        console.log("Facebook Login Response:", response);
        console.log("AuthResponse", response.authResponse);
        console.log("AccessToken", response.authResponse.code);


        if (response.authResponse) {
          const accessToken = response.authResponse.code;

          fetch("https://app.admini.co.in/callback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ accessToken }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Backend Response:", data);
            })
            .catch((err) => console.error("Error:", err));
        }
      },
      {
        config_id: "1121290476363268",
        response_type: "code",
        override_default_response_type: true,
      }
    );
  };

  return (
    <div>
      <button className="login-button" onClick={handleLoginClick}>
        Login with Facebook (B)
      </button>
    </div>
  );
};

export default FacebookBusinessLogin;
