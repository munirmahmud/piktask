import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import Spacing from "../../../../components/Spacing";
import Header from "../../../../components/ui/Header";
import SectionHeading from "../../../../components/ui/Heading";
import Loader from "../../../../components/ui/Loader";
import Pagination from "../../../../components/ui/Pagination";
import ProductNotFound from "../../../../components/ui/ProductNotFound";
import Product from "../../../../components/ui/Products/Product";
import { expiredLoginTime, imageObjSchema } from "../../../../helpers";
import Layout from "../../../../Layout";

const UserSideBar = lazy(() => import("../../../../components/ui/dashboard/user/UserSideBar"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));

const useStyles = makeStyles({
  cardItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
});

const FavoriteItems = () => {
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const locationPath = location.pathname;

  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();

  let limit = 15;
  const count = Math.ceil(totalProduct / limit);

  useEffect(() => {
    setLoading(true);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/favourite_image/?limit=${limit}&page=${pageCount}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setFavoriteProducts(data?.images);
            setTotalProduct(data?.total);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Category products error:", error);
          setLoading(false);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  }, [user?.isLoggedIn, user?.token, pageCount, limit]);

  useEffect(() => {
    const schemaObj = {
      name: document.title,
      contentUrl: document.location.href,
      acquireLicensePage: document.location.href,
      thumbnailUrl: `${process.env.REACT_APP_API_URL}/media_images/company/piktak_logo.jpg`,
    };

    imageObjSchema(schemaObj);
  }, []);

  return (
    <Layout title="Favorite Items">
      <Header />

      <Spacing space={{ height: "5rem" }} />

      <Container>
        <Grid container spacing={2}>
          <Suspense fallback={<Loader />}>
            <Grid item md={3} sm={3} xs={12} className={classes.cardItem}>
              <UserSideBar />
            </Grid>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Grid item md={9} sm={9} xs={12} className={classes.cardItem}>
              <SectionHeading title="Favorite" large />
              <Grid classes={{ container: classes.container }} container spacing={2}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {favoriteProducts?.length ? (
                      favoriteProducts?.map((photo) => (
                        <Grid
                          key={photo?.like_id}
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
                      <ProductNotFound noCollection="Favorite" />
                    )}
                  </>
                )}
              </Grid>
              {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
            </Grid>
          </Suspense>
        </Grid>
      </Container>

      <Spacing space={{ height: "3rem" }} />

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default FavoriteItems;
