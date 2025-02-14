// //USING FRONTEND ONLY

// import React, { useEffect, useState } from "react";

// const FacebookBusinessLogin = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     window.fbAsyncInit = function () {
//       FB.init({
//         appId: "2525589477642277",
//         cookie: true,
//         xfbml: true,
//         version: "v20.0",
//       });
//     };

//     (function (d, s, id) {
//       let js,
//         fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) return;
//       js = d.createElement(s);
//       js.id = id;
//       js.src = "https://connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     })(document, "script", "facebook-jssdk");
//   }, []);

//   const handleLoginClick = () => {
//     if (!window.FB) {
//       console.error("Facebook SDK not loaded yet!");
//       return;
//     }

//     FB.login(
//       function (response) {
//         console.log("Facebook Login Response:", response);
       
//         console.log("AuthResponse", response.authResponse);
//         console.log("AccessToken", response.authResponse.accessToken);

//         if (response.authResponse) {
//           const accessToken = response.authResponse.accessToken;
//            console.log(accessToken)
//           FB.api(
//             "/me",
//             { fields: "id,name,email", access_token: accessToken },
//             function (userInfo) {
//               console.log("User Info:", userInfo);
//               setUserData(userInfo);
//             }
//           );
//         } else {
//           console.log("User cancelled login or not authorize")
//         }
//       },
      
//       {
//         config_id: "1121290476363268",
//         response_type: "code",
//         override_default_response_type: true,
//         scope:"email,public_profile"
//       }
      
      
        
//     );
//   };

//   return (
//     <div>
//       <button onClick={handleLoginClick} className="login-button">
//         Login with Facebook Business
//       </button>

//       {userData && (
//         <div>
//           <h3>User Info:</h3>
//           <p>
//             <strong>ID:</strong> {userData.id}
//           </p>
//           <p>
//             <strong>Name:</strong> {userData.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {userData.email || "No Email Available"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacebookBusinessLogin;

import React, { useState } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";

const FacebookAuth = () => {
  const [userData, setUserData] = useState(null);

  const responseFacebook = (response) => {
    console.log("Facebook Response:", response);
    setUserData(response);
  };

  return (
    <div>
      <FacebookLogin
        appId="2525589477642277"
        onSuccess={responseFacebook}
        onFail={(error) => console.log("Login Failed:", error)}
        fields="name,email,picture"
      />

      {userData && (
        <div>
          <h3>User Info:</h3>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email || "No Email Available"}
          </p>
          <img src={userData.picture?.data?.url} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default FacebookAuth;

