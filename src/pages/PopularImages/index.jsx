import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spacing from "../../components/Spacing";
import Header from "../../components/ui/Header";
import SectionHeading from "../../components/ui/Heading";
import Loader from "../../components/ui/Loader";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
// import { TopSeller } from "../../components/ui/TopSeller";
import Layout from "../../Layout";
import { getBaseURL } from "./../../helpers/index";
import useStyles from "./Popular.style";

const HeroSection = lazy(() => import("../../components/ui/Hero"));
const CallToAction = lazy(() => import("../../components/ui/CallToAction"));
const Blog = lazy(() => import("../../components/ui/Blog"));
const Footer = lazy(() => import("../../components/ui/Footer"));

const PopularImages = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState("");
  const [popularProducts, setPopularProducts] = useState({});

  useEffect(() => {
    let recentUrl;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user && user?.id) {
      recentUrl = `${process.env.REACT_APP_API_URL}/images?sort_by=popular&user_id=${user.id}`;
    } else {
      recentUrl = `${process.env.REACT_APP_API_URL}/images?sort_by=popular`;
    }
    axios
      .get(recentUrl, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          setPopularProducts(data?.images);
          setThumbnail(data?.images[0]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Category products error:", error);
        setLoading(false);
      });

    return () => source.cancel();
  }, [user]);

  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${thumbnail?.preview}`);

  return (
    <Layout title="Popular Images" canonical={document.URL} ogUrl={document.URL} ogImage={imageThumbnail}>
      <Header />

      <Suspense fallback={<Loader />}>
        <HeroSection size="large" popularKeywords title="Graphic Resource for Free Download" />
      </Suspense>

      <Spacing space={{ height: "3rem" }} />

      <Container>
        <SectionHeading title="Popular Images" large />
        <Grid classes={{ container: classes.container }} container spacing={2}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {popularProducts?.length ? (
                popularProducts?.map((photo) => (
                  <Grid key={photo.image_id} item xs={6} sm={4} md={3} className={classes.productItem}>
                    <Product photo={photo} />
                  </Grid>
                ))
              ) : (
                <ProductNotFound />
              )}
            </>
          )}
        </Grid>
      </Container>

      <Spacing space={{ height: "3rem" }} />

      <Suspense fallback={<Loader />}>
        <CallToAction
          title="Daily 10 image/photos Download"
          subtitle="Top website templates with the highest sales volume."
          buttonLink="/subscription"
          buttonText="Get Started"
        />
      </Suspense>

      {/* <Container>
        <SectionHeading title="Top Selling Author" large>
          <Button className={classes.headingButton} component={Link} to="/sellers">
            See More
          </Button>
        </SectionHeading>
      </Container> */}

      {/* Top selling author */}
      {/* <TopSeller homeTopSeller /> */}
      {/* BLOG SECTION */}
      <Suspense fallback={<Loader />}>
        <Blog />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default PopularImages;
