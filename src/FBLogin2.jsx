import React, { useEffect, useState } from "react";

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
        scope: "public_profile,email",
        config_id: "1121290476363268",
        response_type: "code",
        override_default_response_type: true,
      }
    );
  };

  return (
    <div>
      <button onClick={handleLoginClick}>
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
