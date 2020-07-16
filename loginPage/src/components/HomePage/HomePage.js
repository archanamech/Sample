import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";


export const HomePage = (props) => {
  const { fbAccessToken } = props.location.state;
  console.log(fbAccessToken);

  const { idToken } = props.location.state;
  console.log(idToken);

  const [logout, setLogout] = useState(false);

  //fetch user country
  useEffect(() => {
    fetchCountry();
  });

  const fetchCountry = async () => {
    const data = await fetch("//freegeoip.app/json/");
    console.log(data);

    const response = await data.json();
    console.log(response);
  };

  //Facebook SDK
  const loadFbLoginApi = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 323972495296732,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
        status: true,
      });
      /***************************************/
      //   FB.getLoginStatus(function(response) {
      //     statusChangeCallback(response);

      // });
      /*********************************** */
    };

    console.log("Loading fb api");

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      console.log(fjs);
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  useEffect(() => {
    loadFbLoginApi();
  }, []);

  //Google login in
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
          onsuccess: (googleUser) => {
            var profile = googleUser.getBasicProfile();
            console.log("User has finished signing in!");
            console.log("Name: " + profile.getName());
            console.log("Email: " + profile.getEmail());
          },
        };
        window.gapi.signin2.render("loginButton");
      });
    });
  };

  const signOut = () => {
    
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed outmfrom google");
      setLogout(true);
    });
  };

  const faceBookLogout = () => {
    setLogout(true);
    console.log('i am still there')
    window.FB.logout(() => {
      console.log("u are out of the page from facebook");
    });
  };

  const handleLogout = () => {
    if(fbAccessToken){
    faceBookLogout();
    }else{
    signOut();
    }
  }
  return (
    <>
      {/* {fbAccessToken==='' && <Redirect to="/" />} */}
      {logout && <Redirect to="/" />}
      <h1>Welcome Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};
