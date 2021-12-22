import { Button, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";
import useStyles from "./PricingCard.style";

const PricingCard = ({ pricePlan }) => {
  const classes = useStyles();
  return (
    <div className={classes.cardMain}>
      {/* <div className={classes.cardImage}>
        <img src="" alt="" />
      </div> */}
      <div className={classes.cardHeading}>
        <Typography variant="h1">${pricePlan?.price}</Typography>
        <Typography variant="h2">{pricePlan?.title}</Typography>
      </div>

      <div className={classes.cardContent}>
        <Typography>
          <CheckCircleIcon /> Lorem ipsum dolor sit amet.
        </Typography>
        <Typography>
          <CheckCircleIcon /> Lorem ipsum dolor sit amet.
        </Typography>
        <Typography>
          <CheckCircleIcon /> Lorem ipsum dolor sit amet.
        </Typography>
        <Typography>
          <CheckCircleIcon /> Lorem ipsum dolor sit amet.
        </Typography>
        <Typography>
          <CheckCircleIcon /> Lorem ipsum dolor sit amet.
        </Typography>

        <div className={classes.cardButton}>
          <Button className={classes.viewPlanButton}>View Plan</Button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
