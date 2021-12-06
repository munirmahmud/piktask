import { Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import formIconBottom from "../../../assets/formIconBottom.png";
import formIconTop from "../../../assets/formIconTop.png";
import lockIcon from "../../../assets/password.png";
import Spacing from "../../../components/Spacing";
import Footer from "../../../components/ui/Footer";
import Header from "../../../components/ui/Header";
import { imageObjSchema } from "../../../helpers";
import Layout from "../../../Layout";
import useStyles from "../Auth.styles";

const Login = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [history, from]);

  const handleShowHidePassword = () => {
    setValue((value) => !value);
  };

  const handleUserRole = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username) {
      toast.error("User name should not be empty!");
      setLoading(false);
      return;
    } else if (!password) {
      toast.error("Password is required!");
      setLoading(false);
      return;
    } else if (!role) {
      toast.error("Please, select your role.");
      setLoading(false);
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username,
        password,
        role,
      })
      .then((res) => {
        if (res.data.status) {
          const token = res.data.token;
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
            history.push(location.state.from.pathname);
          } else if (decodedToken.role === "user") {
            history.push(location.state.from.pathname);
          } else {
            history.replace(from);
          }

          setUsername("");
          setPassword("");
          setRole("");
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setUsername("");
        setPassword("");
        setRole("");
        setLoading(false);
      });
  };

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
    <Layout title="Login" canonical={document.URL}>
      <Header />

      <div className={classes.rootContainer}>
        <Spacing space={{ height: "5rem" }} />

        <div className={classes.formPageContainer}>
          <img src={formIconTop} alt="Background Icon" className={classes.backgroundIconTop} />

          <div className={classes.formWrapper}>
            <div className={classes.formWrapperInner}>
              <div className={classes.formHeading}>
                <Typography className={classes.formTitle} variant="h2">
                  Sign In
                </Typography>
                <Typography className={classes.formSubtitle}>Sign in with your email & password</Typography>
              </div>

              <div>
                <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="User name / Email"
                    className={classes.formControl}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <div className={classes.passwordField}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Password"
                      type={value ? "text" : "password"}
                      className={classes.formControl}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <img src={lockIcon} alt="Show or hide password" onClick={handleShowHidePassword} />
                  </div>

                  <RadioGroup onChange={handleUserRole} row aria-label="gender" name="row-radio-buttons-group">
                    <FormControlLabel value="user" control={<Radio />} label="User" />
                    <FormControlLabel value="contributor" control={<Radio />} label="Contributor" />
                  </RadioGroup>

                  <FormControlLabel
                    value="end"
                    label="I can't remember my password"
                    labelPlacement="end"
                    control={<Checkbox color="primary" />}
                    className={classes.checkboxLabel}
                  />

                  <Button variant="contained" fullWidth className={classes.formButton} type="submit" disabled={!username || !password || !role}>
                    Sign In
                  </Button>

                  <Link to="/reset-password" className={classes.passwordResetLink}>
                    Password Reset
                  </Link>
                  <Spacing space={{ height: "1rem" }} />
                </form>

                {/* <Button component={Link} to="/registration" className={classes.formLink}>
                  Not a member? Sign up
                </Button> */}
              </div>
            </div>
          </div>
          <img src={formIconBottom} alt="Background" className={classes.backgroundIconBottom} />
        </div>

        <Spacing space={{ height: "5rem" }} />
      </div>
      <Footer />
    </Layout>
  );
};

export default Login;
