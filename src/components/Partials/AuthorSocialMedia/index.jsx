import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({}));

const AuthorSocialMedia = ({ productDetails }) => {
  const classes = useStyles();
  const authorSocialMedia = {
    facebook: productDetails.imageDetails.user.facebook,
    behance: productDetails.imageDetails.user.behance,
    dribbble: productDetails.imageDetails.user.dribbble,
    instagram: productDetails.imageDetails.user.instagram,
    linkedin: productDetails.imageDetails.user.linkedin,
    pinterest: productDetails.imageDetails.user.pinterest,
    shutterstock: productDetails.imageDetails.user.shutterstock,
    twitter: productDetails.imageDetails.user.twitter,
  };
  console.log("authorSocialMedia", authorSocialMedia);
  return (
    <Grid item style={{ display: "flex", alignItems: "center" }}>
      <Typography>Share: </Typography>
      <div>
        {/* {(profileInfo?.facebook || profileInfo?.instagram || profileInfo?.twitter) && <SocialShare title="Follow this author:" profileInfo={profileInfo} />} */}
      </div>
    </Grid>
  );
};

export default AuthorSocialMedia;
