import { Container } from "@material-ui/core";
import React from "react";
import useStyles from "./NotFoundPage.styles";
import PageNotFound from "../../assets/banner/page-not-found.png"

export const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.pageNotFound}>
        <Container>
          <div className={classes.pageNotFoundImg}>
            <img src={PageNotFound} alt="PageNotFound" />
          </div>
        </Container>
      </div>
    </>
  );
};
