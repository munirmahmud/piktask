import { Button, CardContent, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import box from "../../../../../assets/dashboardicons/box.svg";
import arrowDown from "../../../../../assets/dashboardicons/icon1.svg";
import moneyIcon from "../../../../../assets/dashboardicons/money.svg";
import followerIcon from "../../../../../assets/icons/followerIcon.png";
import Heading from "../../../dashboard/contributor/Heading";
import useStyles from "./CurrentMonthStatus.styles";

const CurrentMonthStatus = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [earnCurrentMonth, setEarnCurrentMonth] = useState({});
  const [earnPreviousMonth, setEarnPreviousMonth] = useState({});

  useEffect(() => {
    // Author current month earning API integration
    if (user?.isLoggedIn && user?.role === "contributor") {
      var newDate = new Date();
      var firstDayCurrentMonth = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        2
      );
      var firstDay = firstDayCurrentMonth.toISOString().substring(0, 10);
      var todayCurrentMonth = newDate.toISOString().substring(0, 10);

      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/dashboard/summery/?start=${firstDay}&end=${todayCurrentMonth}`,
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            setEarnCurrentMonth(data?.user_statistics);
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
    }

    // Author previous month earning API integration
    if (user?.isLoggedIn && user?.role === "contributor") {
      var previousDate = new Date();
      var previousMonthFirstDay = new Date(
        previousDate.getFullYear(),
        previousDate.getMonth() - 1,
        2
      );
      var previousFirstDays = previousMonthFirstDay
        .toISOString()
        .substring(0, 10);

      const previousMonthLastDay = new Date(
        previousDate.getFullYear(),
        previousDate.getMonth(),
        1
      );
      var previousFirstDay = previousMonthLastDay
        .toISOString()
        .substring(0, 10);

      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/dashboard/summery/?start=${previousFirstDays}&end=${previousFirstDay}`,
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            setEarnPreviousMonth(data?.user_statistics);
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
    }
  }, [user?.isLoggedIn, user?.role, user?.token]);

  return (
    <div className={classes.dashboardGridContainer}>
      <div className={classes.totalStatus}>
        <Heading tag="h2">Current Month</Heading>
        <Button
          className={classes.loadMoreBtn}
          component={Link}
          to={`/contributor/earnings`}
        >
          More status
        </Button>
      </div>
      <Grid container>
        <Grid item xs={6} sm={6} md={3} className={classes.loaderItem}>
          <CardContent className={classes.statisticsContent}>
            <div className={`${classes.arrowIcon} ${classes.statisticsIcon}`}>
              <img src={moneyIcon} alt="Money" />
            </div>
            <Typography className={classes.totalCount} variant="h1">
              {earnCurrentMonth?.total_earning}
              <span>Earning</span>
            </Typography>
            <Typography className={classes.lastTotalCount}>
              Last month: {earnPreviousMonth?.total_earning}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={6} sm={6} md={3} className={classes.loaderItem}>
          <CardContent className={classes.statisticsContent}>
            <div className={`${classes.arrowIcon} ${classes.statisticsIcon}`}>
              <img src={arrowDown} alt="Download" />
            </div>
            <Typography className={classes.totalCount} variant="h1">
              {earnCurrentMonth?.total_downloads}
              <span>Download</span>
            </Typography>
            <Typography className={classes.lastTotalCount}>
              Last month: {earnPreviousMonth?.total_downloads}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={6} sm={6} md={3} className={classes.loaderItem}>
          <CardContent className={classes.statisticsContent}>
            <div className={`${classes.arrowIcon} ${classes.statisticsIcon}`}>
              <img src={followerIcon} alt="followerIcon" />
            </div>
            <Typography className={classes.totalCount} variant="h1">
              {earnCurrentMonth?.total_follower}
              <span>Follower</span>
            </Typography>
            <Typography className={classes.lastTotalCount}>
              Last month: {earnPreviousMonth?.total_follower}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={6} sm={6} md={3} className={classes.loaderItem}>
          <CardContent className={classes.statisticsContent}>
            <div className={`${classes.arrowIcon} ${classes.statisticsIcon}`}>
              <img src={box} alt="Products" />
            </div>
            <Typography className={classes.totalCount} variant="h1">
              {earnCurrentMonth?.total_image}
              <span>Files</span>
            </Typography>
            <Typography className={classes.lastTotalCount}>
              Last month: {earnPreviousMonth?.total_image}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default CurrentMonthStatus;
