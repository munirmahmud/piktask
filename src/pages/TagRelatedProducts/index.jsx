import { CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Spacing from "../../components/Spacing";
// import TagButtons from "../../components/ui/TagButtons/index";
import CallToAction from "../../components/ui/CallToAction";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
import Layout from "../../Layout";
import { getBaseURL } from "./../../helpers/index";
import useStyles from "./TagRelatedProducts.style";

const TagTemplate = () => {
  const classes = useStyles();
  const { tagName } = useParams();
  const location = useLocation();
  const keywords = location.pathname.split("/tag/").pop().replace(/-/g, " ");
  const [isLoading, setLoading] = useState(false);
  const [tagRelatedProducts, setTagRelatedProducts] = useState(null);
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    setLoading(true);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`${process.env.REACT_APP_API_URL}/client/search/?tag=${keywords}`, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          setTagRelatedProducts(data?.results);
          setThumbnail(data?.results[0]);
          setLoading(false);
        }
      })
      .catch((error) => console.log(" Related Tag Image error: ", error));

    return () => source.cancel();
  }, [keywords]);

  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${thumbnail?.preview}`);

  return (
    <Layout title={`${tagName}`} description={`${tagName}`} canonical={document.URL} ogUrl={document.URL} ogImage={imageThumbnail}>
      <Header />
      <HeroSection size="medium" popularKeywords title="Graphic Resources for Free Download" />
      <Container>
        {tagRelatedProducts?.length > 0 && (
          <Typography className={classes.totalResources} variant="h4">
            {`${tagRelatedProducts?.length} Resources for "${tagName.replace(/-/g, " ")}"`}
          </Typography>
        )}

        <Grid classes={{ container: classes.container }} container spacing={2}>
          {tagRelatedProducts === null ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                height: 300,
              }}
            >
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              {tagRelatedProducts?.length ? (
                tagRelatedProducts?.map((photo) => (
                  <Grid key={photo.image_id} item xs={12} sm={4} md={3} className={classes.productItem}>
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

      <Spacing space={{ height: "5rem" }} />

      <CallToAction
        title="Join Designhill designer team"
        subtitle="Upload your first copyrighted design. Get $5 designer coupon packs"
        buttonText="Join Us"
        uppercase
      />
      <Footer />
    </Layout>
  );
};

export default TagTemplate;
