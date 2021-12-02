import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import Spacing from "../../components/Spacing";
import Blog from "../../components/ui/Blog";
import CallToAction from "../../components/ui/CallToAction";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import SectionHeading from "../../components/ui/Heading";
import HeroSection from "../../components/ui/Hero";
import Loader from "../../components/ui/Loader";
import Pagination from "../../components/ui/Pagination";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
import Layout from "../../Layout";
import { getBaseURL } from "./../../helpers/index";
import useStyles from "./Recent.style";

const Recent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const locationPath = location.pathname;

  const [recentProduct, setRecentProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();
  let limit = 60;
  const count = Math.ceil(totalProduct / limit);
  const [thumbnail, setThumbnail] = useState("");

  //Recent images API integration
  useEffect(() => {
    let recentUrl;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.id) {
      recentUrl = `${process.env.REACT_APP_API_URL}/images?sort_by=recent&limit=${limit}&page=${pageCount}&user_id=${user.id}`;
    } else {
      recentUrl = `${process.env.REACT_APP_API_URL}/images?sort_by=recent&limit=${limit}&page=${pageCount}`;
    }
    axios
      .get(recentUrl, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.images.length > 0) {
          setRecentProduct(data?.images);
          setThumbnail(data?.images[0]);
          setTotalProduct(data?.total);
          dispatch({
            type: "RECENT_PHOTOS",
            payload: [...data?.images],
          });
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Category products error:", error);
        setLoading(false);
      });

    return () => source.cancel();
  }, [user?.isLoggedIn, user?.id, limit, pageCount, dispatch]);

  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${thumbnail?.preview}`);

  return (
    <Layout title="Recent Images" canonical={document.URL} ogUrl={document.URL} ogImage={imageThumbnail}>
      <Header />

      <HeroSection size="large" popularKeywords heroButton title="Graphic Resource for Free Download" />

      <Spacing space={{ height: "3rem" }} />

      <Container>
        <SectionHeading title="Recent Images" large />
        <Grid classes={{ container: classes.container }} container spacing={2}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {recentProduct?.length ? (
                recentProduct?.map((photo, index) => (
                  <Grid key={index} item xs={6} sm={4} md={3} className={classes.productItem}>
                    <Product photo={photo} />
                  </Grid>
                ))
              ) : (
                <ProductNotFound />
              )}
            </>
          )}
        </Grid>

        {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
      </Container>

      <Spacing space={{ height: "3.5rem" }} />

      <CallToAction
        title="Daily 10 image/photos Download"
        subtitle="Top website templates with the highest sales volume."
        buttonLink="/subscription"
        buttonText="Get Started"
      />

      <Spacing space={{ height: "2.5rem" }} />

      <Blog />

      <Footer />
    </Layout>
  );
};

export default Recent;
