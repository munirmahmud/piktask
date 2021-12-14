import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import Spacing from "./../../Spacing/index";
import useStyles from "./SocialLogin.style";

// const clientId = "523940507800-llt47tmfjdscq2icuvu1fgh20hmknk4u.apps.googleusercontent.com";
const clientId = "928238679381-jf4obccehr2mq8lotat83l4q0n6l6cqi.apps.googleusercontent.com";

const SocialLogin = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { setOpenAuthModal, role } = props;
  const { from } = location.state || { from: { pathname: "/" } };

  //login with google
  const handleGoogleLogin = async (googleData) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/google_login`, {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
        role: role,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    // store user data in localStorage
    if (data.status) {
      setOpenAuthModal(false);
      const token = data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwt_decode(token.split(" ")[1]);
      localStorage.setItem("profileImage", decodedToken.avatar);

      if (decodedToken.email) {
        dispatch({
          type: "SET_USER",
          payload: {
            ...decodedToken,
            token,
          },
        });
      }

      if (decodedToken.role === "contributor") {
        history.push("/contributor/dashboard");
      } else if (location.pathname) {
        history.push(location.pathname);
      } else {
        history.replace(from);
      }
    }
  };

  //login with facebook
  const handleFacebookLogin = async (facebookData) => {
    console.log("facebookData", facebookData);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/facebook_login`, {
      method: "POST",
      body: JSON.stringify({
        accessToken: facebookData.accessToken,
        userID: facebookData.userID,
        role: role,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    // store user data in localStorage
    if (data.status) {
      setOpenAuthModal(false);
      const token = data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwt_decode(token.split(" ")[1]);
      localStorage.setItem("profileImage", decodedToken.avatar);

      if (decodedToken.email) {
        dispatch({
          type: "SET_USER",
          payload: {
            ...decodedToken,
            token,
          },
        });
      }

      if (decodedToken.role === "contributor") {
        history.push("/contributor/dashboard");
      } else if (location.pathname) {
        history.push(location.pathname);
      } else {
        history.replace(from);
      }
    }
  };

  return (
    <div className={classes.socialsButtons}>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <Button className={classes.googleButton} onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <FontAwesomeIcon className={classes.googleIcon} icon={faGoogle} />
            <span>Google</span>
          </Button>
        )}
        buttonText="Login"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        cookiePolicy={"single_host_origin"}
      />

      <Spacing space={{ margin: "0 0.5rem" }} />

      <FacebookLogin
        appId="329833788676604"
        autoLoad={false}
        fields="name,email,picture"
        onClick={handleFacebookLogin}
        callback={handleFacebookLogin}
        render={(renderProps) => (
          <Button className={classes.facebookBtn} onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <FontAwesomeIcon className={classes.facebookIconBtn} icon={faFacebookF} />
            <span>Facebook</span>
          </Button>
        )}
      />
    </div>
  );
};

export default SocialLogin;
