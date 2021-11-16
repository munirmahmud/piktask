import { makeStyles } from "@material-ui/core";
import React from "react";
import { getBaseURL } from "../../../../helpers";

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down(480)]: {
      backgroundColor: "transparent",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    padding: "2rem 2rem",

    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
    [theme.breakpoints.down(480)]: {
      padding: "0",
    },
  },
}));

const ProductImage = ({ imageDetails }) => {
  const classes = useStyles();
  return (
    <div className={classes.imageWrapper}>
      <img
        title={imageDetails.title}
        className={classes.image}
        src={encodeURI(
          getBaseURL().bucket_base_url +
            getBaseURL().images +
            imageDetails?.preview
        )}
        alt={imageDetails?.original_name}
      />
    </div>
  );
};

export default ProductImage;
