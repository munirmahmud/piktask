import {
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Spacing from "../../../../components/Spacing";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import Layout from "../../../../Layout";
import useStyles from "./ContributorPricePlan.styles";

const ContributorPricePlan = () => {
  const classes = useStyles();
  const [menuSate, setMenuSate] = useState({ mobileView: false });
  const { mobileView } = menuSate;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 769
        ? setMenuSate((prevState) => ({ ...prevState, mobileView: true }))
        : setMenuSate((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const [showViewDetails, setViewDetails] = useState(false);
  const handleShowDetails = () => {
    setViewDetails(true);
  }
  const handleDownloadEarning = () => {
    setViewDetails(false);
  }

  return (
    <Layout title="Contributor Price Plan | Piktask">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.pricePlanGridContainer}>
            <Heading tag="h2">Contributor Price Plan</Heading>
            <Spacing space={{ height: "2rem" }} />
            <div className={classes.pricePlanBanner}></div>
            <Spacing space={{ height: "2rem" }} />
            <div>
              <Grid container spacing={2}>
                <Grid item sm={12} md={12} xs={12}>
                  {showViewDetails ? (
                    <div className={classes.priceInfo}>
                      <div>
                        <Typography>You will earn royalties each time one of your approved images is downloaded by a Piktask customer.</Typography>
                        <Typography>How much you earn per each download depends on one or a combination of the following: the license and subscription that was used for each download.</Typography>
                        <Typography>For a detailed breakdown of earnings per download, please reference our <span style={{color: "blue", cursor: "pointer"}} onClick={handleDownloadEarning}>Earnings Schedule</span> .</Typography>
                      </div>
                      {/* <div>
                        <Button onClick={handleShowDetails} className={classes.detailsBtn}>View Details</Button>
                      </div> */}
                    </div>
                  ) : (
                    <div className={classes.priceInfo}>
                      <div>
                        <Typography variant="h2">Piktask Contributor Price Plan</Typography>
                        <Typography>Amount earning 1000 downloads</Typography>
                      </div>
                      <div>
                        <Button onClick={handleShowDetails} className={classes.detailsBtn}>View Details</Button>
                      </div>
                    </div>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
          <Spacing space={{ height: "2rem" }} />
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default ContributorPricePlan;
