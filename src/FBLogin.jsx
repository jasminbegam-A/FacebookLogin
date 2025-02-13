//USING FRONTEND AND BACKEND

import React, { useEffect } from "react";

const FacebookBusinessLogin = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "2525589477642277",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleLoginClick = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded yet!");
      return;
    }

    FB.login(
      function (response) {
        console.log("Facebook Login Response:", response);

        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;

          fetch("backend-api", {
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
