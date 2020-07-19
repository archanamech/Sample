import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

const GoogleLogin = (props) => {
  const [idToken, setIdToken] = useState(false);
  useEffect(() => {
    insertGapiScript();
  }, []);

  const insertGapiScript = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      initializeGoogleSignIn();
    };
    document.body.appendChild(script);
  };

  const initializeGoogleSignIn = () => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id:
          "324133888500-4nka470k9oki5ne49t9b66l63qomrgvu.apps.googleusercontent.com",
      });
      console.log("Api inited");

      window.gapi.load("signin2", () => {
        const params = {
          onsuccess: onSuccess,
          onfailure: onFailure
        };
        window.gapi.signin2.render("loginButton", params);
      });
    });
  };

  const onSuccess = (googleUser) => {
    var profile = googleUser.getBasicProfile();

    console.log("User has finished signing in from google!");

    console.log("Name: " + profile.getName());
    console.log("Email: " + profile.getEmail());
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);
    setIdToken(true);

    // axios.post('https://yourbackend.example.com/tokensignin', id_token)
    //   .then(response => {console.log(response)})
    //   .catch(error => {console.log(error)})
  }

  const onFailure = (error) => {
    console.log(error);
  }

  //     var xhr = new XMLHttpRequest();
  // xhr.open('POST', 'https://yourbackend.example.com/tokensignin');
  // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // xhr.onload = function() {
  //   console.log('Signed in as: ' + xhr.responseText);
  // };
  // xhr.send('idtoken=' + id_token);

  return (
    <>
      <h1>Google Login Demo</h1>
      <button id="loginButton">Sign in with Google</button>
      {idToken && (
        <Redirect
          to={{
            pathname: "/home",
            state: { idToken: idToken },
          }}
        />
      )}
    </>
  );
};

export default GoogleLogin;
