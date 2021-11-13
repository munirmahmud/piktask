import { Card, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./TotalCountHistory.style";

const TotalCountHistory = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const [totalSummary, setTotalSummery] = useState({});

  useEffect(() => {
    // Total earning summary API integration
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/contributor/earning/summary`, 
          {headers: { Authorization: user?.token },}
        )
        .then(({ data }) => {
          if (data?.status) {
            setTotalSummery(data?.total_summery);
          }
        });
    }
  }, [user?.isLoggedIn, user?.role, user?.token])

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Card className={classes.cardWrapper}>
            <div className={classes.graphBox}>
              <div className={classes.amount}>
                ${totalSummary?.total_earning}
              </div>
              <span className={classes.title}>Total Earning</span>
            </div>
            <div className={classes.graphBox}>
              <div className={classes.amount}>
                ${totalSummary?.balance}
              </div>
              <span className={classes.title}>Total Balance</span>
            </div>
            <div className={classes.graphBox}>
              <span
                className={`${classes.amount} ${classes.paidDownloadColor}`}
              >
                {totalSummary?.total_images}
              </span>
              <span className={classes.title}>Total Files</span>
            </div>
            <div className={classes.graphBox}>
              <span
                className={`${classes.amount} ${classes.freeDownloadColor}`}
              >
                {totalSummary?.total_followers}
              </span>
              <span className={classes.title}>Total Follower</span>
            </div>
            <div className={classes.graphBox}>
              <span
                className={`${classes.amount} ${classes.totalDownloadColor}`}
              >
                {totalSummary?.total_downloads}
              </span>
              <span className={classes.title}>Total Download</span>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TotalCountHistory;
