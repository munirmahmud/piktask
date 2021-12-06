import { Button, Card, CardContent, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../../database";
import { imageObjSchema } from "../../../helpers";
import Layout from "../../../Layout";
import useStyles from "./EmailVerification.styles";

const EmailVerification = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername(window.localStorage.getItem("userName"));
    setEmail(window.localStorage.getItem("email"));
    setPassword(window.localStorage.getItem("password"));
  }, []);

  const saveData = async () => {
    const result = await auth.signInWithEmailLink(email, window.location.href);
    console.log(result);

    try {
      if (result.user.emailVerified) {
        // Get User ID token
        const user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });

        // Remove data from localstorage
        window.localStorage.removeItem("userName");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("password");
      }

      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };
  saveData();

  useEffect(() => {
    const schemaObj = {
      name: document.title,
      contentUrl: document.location.href,
      acquireLicensePage: document.location.href,
      thumbnailUrl: `${process.env.REACT_APP_API_URL}/media_images/company/piktak_logo.jpg`,
    };

    imageObjSchema(schemaObj);
  }, []);

  return (
    <Layout title="Email verification" canonical={document.URL}>
      <div className={classes.cardWrapper}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={"classes.title"} variant="h4" gutterBottom>
              Thank you very much to verify your email.
            </Typography>
            <br />
            <Typography variant="h5" component="h2"></Typography>
            <Typography variant="body1">Now you are redirecting to login page or click below to login</Typography>

            <Button className={classes.loginBtn} size="medium" disableRipple component={Link} to="/login">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmailVerification;
