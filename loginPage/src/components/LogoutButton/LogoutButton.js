import React, { useEffect } from 'react';
import { Route, Redirect} from 'react-router-dom';
import LoginPage from "../LoginPage/LoginPage";

export const LogoutButton = ({history}) => {
    
  //GOOGLE SDK

 const insertGapiScript = () =>  {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => {
      initializeGoogleSignIn()
    }
    document.body.appendChild(script)
  }
  
  const initializeGoogleSignIn = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '324133888500-4nka470k9oki5ne49t9b66l63qomrgvu.apps.googleusercontent.com'
      })
      console.log('Api inited');
    })
  }
  
    const signOut = () => {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        history.push('/');
      });
    }
  
    useEffect(() => {
      insertGapiScript();
    }, []);

    return (
        <div>
            <button onClick={signOut}>Logout</button>
        </div>
    )
}
