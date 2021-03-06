import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Spacing from "../../components/Spacing";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import SellerInfo from "../../components/ui/TopSeller/SellerInfo";
import Layout from "../../Layout";
import useStyles from "./Sellers.style";

const Sellers = () => {
  const classes = useStyles();
  const [topSeller, setTopSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //data loading
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/contributor/top/`)
      .then(({ data }) => {
        if (data?.success) {
          setTopSeller(data.sellers);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <Layout title="Seller | Piktask">
      <Header />
      <HeroSection />
      <Spacing space={{ height: "3rem" }} />
      <Container>
        <Grid classes={{ container: classes.container }} container spacing={2}>
          {isLoading ? (
            <h2>Loading now......</h2>
          ) : (
            <>
              {topSeller?.map((photo) => (
                <Grid
                  key={photo.id}
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  className={classes.productItem}
                >
                  <SellerInfo photo={photo} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>
      <Spacing space={{ height: "3rem" }} />
      <Footer />
    </Layout>
  );
};

export default Sellers;
