import { makeStyles } from "@material-ui/core";
import React from "react";
import { PinterestIcon, PinterestShareButton } from "react-share";
import pinterestIcon from "../../../../../assets/icons/pinterest.png";
import { getBaseURL } from "../../../../../helpers";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontSize: "1.3rem",
  },
  button: {
    ...theme.typography.button,
    fontSize: "1.3rem",
    padding: ".6rem 2.5rem",
    fontWeight: 500,
    border: "1px solid #D9DBE1",
    color: "#14323F",
    marginLeft: "1.5rem",
    "& img": {
      width: 15,
    },
    "&:hover": {
      backgroundColor: "#F0F7EF",
    },
    [theme.breakpoints.up(1279)]: {
      marginLeft: ".8rem",
    },
    [theme.breakpoints.down(480)]: {
      padding: ".6rem 1.2rem",
      fontSize: "1.1rem",
      marginBottom: "0rem",
      marginLeft: "1rem",
    },
  },
  buttonIcon: {
    width: "1.3rem",
    padding: 0,
    marginRight: "0.8rem",
  },
}));

const SaveButton = ({ location, productDetails }) => {
  const classes = useStyles();
  return (
    <PinterestShareButton
      className={classes.button}
      url={location}
      media={encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${productDetails?.imageDetails?.preview}`)}
    >
      <PinterestIcon size={20} round={true} />
      <img src={pinterestIcon} alt="" />
      Save
    </PinterestShareButton>
  );
};

export default SaveButton;
