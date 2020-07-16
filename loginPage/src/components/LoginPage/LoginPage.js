import React from "react";
import { Container, Grid } from "@material-ui/core";
import  GoogleLogin  from "../GoogleLogin/GoogleLogin";
import FacebookLogin from "../FacebookLogin/FacebookLogin";

const LoginPage = () => {
    
  return (
    <div>
      <Container>
        <Grid>
          <FacebookLogin />
          
          <GoogleLogin />
        </Grid>
      </Container>
    </div>
  );
};

export default LoginPage;
