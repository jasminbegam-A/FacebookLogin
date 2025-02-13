//USING FRONTEND ONLY
import React, { useState } from "react";

const FacebookBusinessLogin = () => {
  const [userData, setUserData] = useState(null);

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

          fetch(
            `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
          )
            .then((response) => response.json())
            .then((userInfo) => {
              console.log("User Info:", userInfo);
              setUserData(userInfo);
            })
            .catch((error) => {
              console.error("Error fetching user info:", error);
            });
        }
      },
      {
        config_id: "1121290476363268",
        scope: "public_profile,email",
        response_type: "code",
      }
    );
  };

  return (
    <div>
      <button className="login-button" onClick={handleLoginClick}>
        <span>Login with Facebook (F)</span>
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
