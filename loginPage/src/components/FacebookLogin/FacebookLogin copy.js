import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { HomePage } from "../HomePage/HomePage";
import axios from 'axios';

const FacebookLogin = () => {
  const [fbAccessToken, setFbAccessToken] = useState("");

  const loadFbLoginApi = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 646324019294890,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
        status: true,
      });
    };

    console.log("Loading fb api");

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      // console.log(fjs);
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  useEffect(() => {
    loadFbLoginApi();
  });

  const checkLoginState = () => {
    window.FB.login(
      function (response) {
        console.log(response);
        if (response.authResponse) {
          console.log("Welcome!  Fetching your information.... ");
          //  var uid = response.authResponse.userID;
          var input_token = response.authResponse.accessToken;
          console.log(input_token);

          const res = axios({
            method: "POST",
            url:
              "https://gopoolit.herokuapp.com/authenticate/userFacebookLogin",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              input_token: input_token,
            },
            withCredentials: true,
          })
            .then((res) => console.log(res));

          window.FB.api("/me", function (response) {
            console.log(response);
            console.log("Good to see you, " + response.name + ".");
            setFbAccessToken(response.name);
            console.log("email, " + response.email + ".");
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email", return_scopes: true, auth_type: "rerequest" }
    );
  };

  const handleFBLogin = () => {
    window.FB.login(checkLoginState());
  };

  console.log(fbAccessToken);

  return (
    <>
      <button variant="contained" color="primary" onClick={handleFBLogin}>
        Sign in with Facebook
      </button>
      {fbAccessToken && (
        <Redirect
          to={{
            pathname: "/home",
            state: { fbAccessToken: fbAccessToken },
          }}
        />
      )}

      {/* <Route path="/employees" component={EmployeeList}/> */}
    </>
  );
};

export default FacebookLogin;
