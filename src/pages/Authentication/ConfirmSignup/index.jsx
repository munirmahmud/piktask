import { Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomBtn, InputField } from "../../../components/InputField";
import Spacing from "../../../components/Spacing";
import Footer from "../../../components/ui/Footer";
import Header from "../../../components/ui/Header";
import Layout from "../../../Layout";
import useStyles from "../ResetPassword/ResetPassword.styles";
import HeroSection from "./../../../components/ui/Hero/index";

const ConfirmSignup = () => {
  const classes = useStyles();

  const [isRedirectTo, setRedirectTo] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "#ECEEF5";

    if (token) {
      setLoading(false);
    }

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [token]);

  //For Set Password
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      setLoading(true);
      setToken("");
      toast.error("Field should not be empty. ", { autoClose: 2200 });
      return;
    } else if (!token.match(/^(?=.*[0-9])/)) {
      setLoading(true);
      setToken("");
      toast.error("Token only contains numeric value", { autoClose: 2200 });
      return;
    } else if (token.match(/^(?=.*[0-9])/) && token.match(/^(?=.*[a-zA-Z])/)) {
      setLoading(true);
      setToken("");
      toast.error("Token only contains numeric values", { autoClose: 2200 });
      return;
    } else if (token.length < 8 || token.length > 8) {
      setLoading(true);
      setToken("");
      toast.error("Token should be 8 digit number", { autoClose: 2200 });
      return;
    }

    if (token) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/verify/account`, { token })
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setLoading(false);
            setRole(res?.data.role);
            setToken("");
            setRedirectTo(true);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
          setToken("");
        });
    }
  };

  return (
    <Layout title="Confirm Signup" canonical={document.URL}>
      {/* if confirm redirect to login */}
      {isRedirectTo && <Redirect to={`/login?${role}`} />}
      <Header />

      <HeroSection title="Graphic Resources for Free Download" />

      <Spacing space={{ height: "10rem" }} />
      <Container>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={6}>
            <div className={classes.cardWrapper} style={{ padding: "4rem" }}>
              <div className={classes.cardHeadingWrapper}>
                <Typography className={classes.cardHeading} variant="h2">
                  Confirm Signup
                </Typography>

                <Spacing space={{ height: "1.5rem" }} />

                <Typography className={classes.cardSubtitle}>
                  We've sent you an email with some digits. Please check your email and enter below to confirm your signup.
                </Typography>
              </div>

              <Spacing space={{ height: "3.5rem" }} />

              <form autoComplete="off" onSubmit={handleSubmit}>
                <InputField label="Enter Token" name="token" value={token} onChange={(e) => setToken(e.target.value)} />

                <CustomBtn text="Confirm Signup" disabledBtn={isLoading} />
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Spacing space={{ height: "10rem" }} />

      <Footer />
    </Layout>
  );
};

export default ConfirmSignup;
