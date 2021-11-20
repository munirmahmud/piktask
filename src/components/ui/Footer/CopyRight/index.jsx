import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import behance from "../../../../assets/icons/behance.svg";
import dribbble from "../../../../assets/icons/dribble.svg";
import facebook from "../../../../assets/icons/facebook.svg";
import instagram from "../../../../assets/icons/instagram.svg";
import linkedIn from "../../../../assets/icons/linkdin.svg";
import pinterest from "../../../../assets/icons/pintarest.svg";
import youTube from "../../../../assets/icons/youtube.svg";
import logo from "../../../../assets/Logo/piktask.png";
import SocialShare from "../../SocialShare";
import useStyles from "./CopyRight.styles";

const CopyRight = () => {
  const classes = useStyles();
  const socialMedias = [
    {
      name: "Dribbble",
      url: "https://dribbble.com/piktask",
      image: dribbble,
    },
    {
      name: "Behance",
      url: "https://www.behance.net/piktask/",
      image: behance,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/piktaskltd/",
      image: instagram,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/piktaskltd",
      image: facebook,
    },
    {
      name: "Pinterest",
      url: "https://www.pinterest.com/piktaskltd",
      image: pinterest,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/piktask/",
      image: linkedIn,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCoZMhCh5CVHIjBbQhfZ_k0A",
      image: youTube,
    },
  ];

  return (
    <div className={classes.copyrightWrapper}>
      <Container className={classes.root}>
        <div>
          <Grid className={classes.gridRoot}>
            <Grid item xs={12} sm={3} md={3} className={classes.logoWrapper}>
              <Link to="/">
                <img className={classes.logo} src={logo} alt="Piktask" />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography className={classes.copyRightText}>
                &copy; Piktask International Ltd. {new Date().getFullYear()}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3} md={3}>
              <SocialShare socialMedias={socialMedias} />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default CopyRight;
