import { Container } from "@material-ui/core";
import React from "react";
import PageNotFound from "../../assets/banner/page-not-found.png";
import useStyles from "./NotFoundPage.styles";

const NotFoundPage = () => {
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

export default NotFoundPage;
