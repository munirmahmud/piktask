import { Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import Spacing from "../../../../components/Spacing";
import UserSideBar from "../../../../components/ui/dashboard/user/UserSideBar";
import Footer from "../../../../components/ui/Footer";
import Header from "../../../../components/ui/Header";
import SectionHeading from "../../../../components/ui/Heading";
import Loader from "../../../../components/ui/Loader";
import Paginations from "../../../../components/ui/Pagination";
import ProductNotFound from "../../../../components/ui/ProductNotFound";
import Product from "../../../../components/ui/Products/Product";
import Layout from "../../../../Layout";

const useStyles = makeStyles({
  cardItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
});

const DownloadItems = () => {
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const locationPath = location.pathname;

  const [isLoading, setLoading] = useState(true);
  const [downloadsItem, setDownloadsItem] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();
  let limit = 15;
  const count = Math.ceil(totalProduct / limit);

  useEffect(() => {
    setLoading(true);
    if (user?.isLoggedIn) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/user/downloads?limit=${limit}&page=${pageCount}`,
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            setDownloadsItem(data?.downloads);
            setTotalProduct(data?.total);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Category products error:", error);
          setLoading(false);
        });
    }
  }, [user?.isLoggedIn, user?.token, pageCount, limit]);

  return (
    <Layout title="Downloads | Piktask">
      <Header />
      <Spacing space={{ height: "5rem" }} />
      <Container>
        <Grid container spacing={2}>
          <Grid item md={3} sm={3} xs={12} className={classes.cardItem}>
            <UserSideBar />
          </Grid>
          <Grid item md={9} sm={9} xs={12} className={classes.cardItem}>
            <SectionHeading title="Download" large />
            <Grid
              classes={{ container: classes.container }}
              container
              spacing={2}
            >
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {downloadsItem?.length ? (
                    downloadsItem?.map((photo) => (
                      <Grid
                        key={photo.image_id}
                        item
                        xs={6}
                        sm={4}
                        // md={3}
                        className={classes.productItem}
                      >
                        <Product photo={photo} />
                      </Grid>
                    ))
                  ) : (
                    <ProductNotFound noCollection="Downloads" />
                  )}
                </>
              )}
            </Grid>
            {totalProduct > limit && (
            <Paginations locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />
            )}
          </Grid>
        </Grid>
      </Container>
      <Spacing space={{ height: "3rem" }} />
      <Footer />
    </Layout>
  );
};

export default DownloadItems;
