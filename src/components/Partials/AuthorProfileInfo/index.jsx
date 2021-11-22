import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import authorPhoto from "../../../assets/author.png";
import { getBaseURL } from "./../../../helpers/index";

const useStyles = makeStyles((theme) => ({
  authorProfile: {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    marginRight: "5rem",
    "@media (max-width: 768px)": {
      marginBottom: "2rem",
    },
    [theme.breakpoints.down(480)]: {
      marginRight: "6rem",
    },
  },
  authorImg: {
    width: "4.5rem",
    height: "4.5rem",
    borderRadius: "50%",
    padding: "0.2rem",
    boxShadow: "0px 0px 5px #ddd",
    marginRight: "1.4rem",
    objectFit: "cover",
    color: "#000",
    cursor: "pointer",

    "@media (max-width: 768px)": {
      width: "5.8rem",
      height: "5.8rem",
    },
    [theme.breakpoints.down(480)]: {
      width: "4.5rem",
      height: "4.5rem",
    },
  },
  profileName: {
    color: theme.palette.secondary.main,
    fontSize: "1.6rem",
    fontWeight: 400,
    textDecoration: "none !important",
    cursor: "pointer",
  },
  resourceInfo: {
    fontSize: "1.4rem",
    fontWeight: 400,

    [theme.breakpoints.down(480)]: {
      fontSize: "1.3rem",
    },
  },
}));

const AuthorProfileInfo = ({ productDetails }) => {
  const classes = useStyles();
  return (
    <div className={classes.authorProfile}>
      <Link to={`/author/${productDetails?.imageDetails?.user?.username}`}>
        {productDetails?.imageDetails?.user?.avatar ? (
          <img
            className={classes.authorImg}
            src={getBaseURL().bucket_base_url + "/" + productDetails?.imageDetails?.user?.avatar}
            alt={productDetails?.imageDetails?.user?.username}
          />
        ) : (
          <img className={classes.authorImg} src={authorPhoto} alt={productDetails?.imageDetails?.user?.username} />
        )}
      </Link>

      <div>
        <Typography className={classes.profileName} variant="h3" component={Link} to={`/author/${productDetails?.imageDetails?.user?.username}`}>
          {productDetails?.imageDetails?.user?.username}
        </Typography>

        <Typography className={classes.resourceInfo} variant="body2">
          {productDetails?.imageDetails?.user?.total_resources} Resources
        </Typography>
      </div>
    </div>
  );
};

export default AuthorProfileInfo;
