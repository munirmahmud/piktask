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
import Paginations from "../../components/ui/Pagination";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
import Layout from "../../Layout";
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

  //Recent images API integration
  useEffect(() => {
    let recentUrl;
    if (user?.isLoggedIn && user?.id) {
      recentUrl = `${process.env.REACT_APP_API_URL}/images?sort_by=recent&limit=${limit}&page=${pageCount}&user_id=${user.id}`;
    } else {
      recentUrl = `${process.env.REACT_APP_API_URL}/images?sort_by=recent&limit=${limit}&page=${pageCount}`;
    }
    axios
      .get(recentUrl)
      .then(({ data }) => {
        if (data?.images.length > 0) {
          setRecentProduct(data?.images);
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
  }, [user?.isLoggedIn, user?.id, limit, pageCount, dispatch]);

  //onScroll data load
  // useEffect(() => {
  //   setLoading(true);
  //   window.onscroll = () => {
  //     if (document.documentElement.scrollTop % 300 === 0) {
  //       pageCount = pageCount + 1;
  //       setPageCount(pageCount);
  //       let recentUrl;
  //       if (user && user?.id) {
  //         recentUrl = `${process.env.REACT_APP_API_URL}/images?sort_by=recent&user_id=${user.id}&limit=8&page=${pageCount}`;
  //       } else {
  //         recentUrl = `${process.env.REACT_APP_API_URL}/images?sort_by=recent&limit=8&page=${pageCount}`;
  //       }
  //       axios
  //         .get(recentUrl)
  //         .then(({ data }) => {
  //           if (data?.status) {
  //             console.log("data image", data.images);
  //             setRecentProduct([...recentProduct, ...data.images]);
  //             setLoading(false);
  //           }
  //         })
  //         .catch((error) => {
  //           console.log("Category products error:", error);
  //           setLoading(false);
  //         });
  //     }
  //   };
  // }, []);

  return (
    <Layout title="Recent Images | Piktask" description="Recent Images">
      <Header />
      <HeroSection
        size="large"
        popularKeywords
        heroButton
        title="Graphic Resource for Free Download"
      />
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
                  <Grid
                    key={index}
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    className={classes.productItem}
                  >
                    <Product photo={photo} />
                  </Grid>
                ))
              ) : (
                <ProductNotFound />
              )}
            </>
          )}
        </Grid>
        {totalProduct > limit && (
          <Paginations locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />
        )}
      </Container>

      <Spacing space={{ height: "3.5rem" }} />

      <CallToAction
        title="Daily 10 image/photos Download"
        subtitle="Top website templates with the highest sales volume."
        buttonLink="/subscription"
        buttonText="Get Started"
      />

      <Spacing space={{ height: "2.5rem" }} />

      {/* <Container>
        <SectionHeading title="Top Selling Author" large>
          <Button
            className={classes.headingButton}
            component={Link}
            to="/sellers"
          >
            See More
          </Button>
        </SectionHeading>
      </Container> */}

      {/* Top selling author */}
      {/* <TopSeller homeTopSeller /> */}
      {/* BLOG SECTION */}
      <Blog />

      <Footer />
    </Layout>
  );
};

export default Recent;
