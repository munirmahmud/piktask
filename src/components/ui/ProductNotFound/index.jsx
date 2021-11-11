import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./ProductNotFound.style";
import NotFoundImage from "../../../assets/banner/goto-home.png";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const ProductNotFound = ({
  keywords,
  noCollection,
  contributorProductNotFound,
  publishContent,
}) => {
  const classes = useStyles();

  return (
    <>
      {contributorProductNotFound ? (
        <div className={classes.productNotFround}>
          <div>
            <div className={classes.notFoundImage}>
              <img src={NotFoundImage} alt="Goto home" />
            </div>
            {publishContent ? (
              <Typography variant="h3">There are no files published</Typography>
            ) : (
              <Typography variant="h3">No products are in pending</Typography>
            )}
            <Button
              className={classes.uploadBtn}
              component={Link}
              to="/contributor/upload"
            >
              <CloudUploadIcon className={classes.ButtoncrownIcon} />
              Upload files
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.notFoundSection}>
          <div className={classes.notFoundWrap}>
            <div className={classes.notFoundImage}>
              <img src={NotFoundImage} alt="Goto home" />
            </div>
            <div>
              <Typography className={classes.title} variant="body1">
                {keywords ? (
                  `Sorry, did not find "${keywords}".`
                ) : (
                  <>
                    {noCollection
                      ? `Sorry, did not find the "${noCollection}".`
                      : `Sorry, did not find.`}
                  </>
                )}
              </Typography>
              <Typography className={classes.helperText} variant="body1">
                You can <span>simplify</span>,<span>shorten</span>, or{" "}
                <span>reduce your filter criteria</span>.Or switch the language
                site and search again
              </Typography>
              <Button className={classes.headingButton} component={Link} to="/">
                Go Home
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductNotFound;
