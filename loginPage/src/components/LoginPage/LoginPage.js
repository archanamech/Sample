import React from "react";
import  GoogleLogin  from "../GoogleLogin/GoogleLogin";
import FacebookLogin from "../FacebookLogin/FacebookLogin";

const LoginPage = () => {
    
  return (
    <div>
      <div>
        <div>
          <FacebookLogin />
          
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
