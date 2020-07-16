import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import { withRouter } from "react-router-dom";

const FacebookLogin = (props) => {
  const { history } = props;

  const loadFbLoginApi = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 323972495296732,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
      });
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
  });

  const checkLoginState = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Welcome!  Fetching your information.... ");
          // var uid = response.authResponse.userID;
          // var accessToken = response.authResponse.accessToken;
          // console.log(uid);
          // console.log(accessToken);
          tesAPI();
          history.push("/home");
          window.FB.api("/me", function (response) {
            console.log(response);
            console.log("Good to see you, " + response.name + ".");
            console.log("Good to see you, " + response.email + ".");
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email" }
    );
  };

  const testAPI = () => {
    var api ="https://graph.facebook.com/v2.8/" + data.credentials.userId + "?fields=name,email&access_token=" + data.credentials.token;
    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.access_token);
        console.log(responseData.email);
      })
      .done();
  };

  const handleFBLogin = () => {
    window.FB.login(checkLoginState());
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleFBLogin}>
        <FacebookIcon />
        Sign in with Facebook
      </Button>
      {/* <Route path="/employees" component={EmployeeList}/> */}
    </>
  );
};

export default withRouter(FacebookLogin);
