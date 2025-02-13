//USING FRONTEND ONLY

import React, { useEffect, useState } from "react";

const FacebookBusinessLogin = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "2525589477642277",
        cookie: true,
        xfbml: true,
        version: "v20.0",
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
       
        console.log("AuthResponse", response.authResponse);
        console.log("AccessToken", response.authResponse.accessToken);

        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
           console.log(accessToken)
          FB.api(
            "/me",
            { fields: "id,name,email", access_token: accessToken },
            function (userInfo) {
              console.log("User Info:", userInfo);
              setUserData(userInfo);
            }
          );
        }
      },
      {
        config_id: "1121290476363268",
        response_type: "code token",
        override_default_response_type: true,
      }
    );
  };

  return (
    <div>
      <button onClick={handleLoginClick} className="login-button">
        Login with Facebook Business
      </button>

      {userData && (
        <div>
          <h3>User Info:</h3>
          <p>
            <strong>ID:</strong> {userData.id}
          </p>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email || "No Email Available"}
          </p>
        </div>
      )}
    </div>
  );
};

export default FacebookBusinessLogin;
