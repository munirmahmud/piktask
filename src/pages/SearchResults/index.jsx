import { CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Spacing from "../../components/Spacing";
import Header from "../../components/ui/Header";
import Pagination from "../../components/ui/Pagination";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
import Layout from "../../Layout";
import SignUpModal from "../Authentication/SignUpModal";
import Loader from "./../../components/ui/Loader/index";
import { getBaseURL } from "./../../helpers/index";
import useStyles from "./SearchResults.styles";

const HeroSection = lazy(() => import("../../components/ui/Hero"));
const CallToAction = lazy(() => import("../../components/ui/CallToAction"));
const Footer = lazy(() => import("../../components/ui/Footer"));

const SearchResults = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const location = useLocation();
  const locationPath = location.pathname;
  const user = useSelector((state) => state.user);
  const keywords = location.pathname.split("=").pop().replace(/-/g, " ");

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [canonicalURL, setCanonicalURL] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [totalProduct, setTotalProduct] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [thumbnail, setThumbnail] = useState("");

  let limit = 24;
  const count = Math.ceil(totalProduct / limit);

  const [, searchQuery, categoryID] = pathname.split("=");
  const [keyword] = searchQuery.split("&");
  const [searchKey] = searchQuery.split("&");

  const prepareSearchQuery = () => {
    let url;
    if (categoryID && keyword) {
      url = `${process.env.REACT_APP_API_URL}/client/search/?title=${searchKey.replace(/-/g, " ")}&category_id=${categoryID}&limit=${limit}&page=${pageCount}`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/client/search/?title=${searchKey.replace(/-/g, " ")}&limit=${limit}&page=${pageCount}`;
    }

    return encodeURI(url);
  };

  useEffect(() => {
    // Remove the parts after  "search" text from the URL
    const location = document.URL.split("/");
    location.pop();
    setCanonicalURL(location.join("/"));

    const url = prepareSearchQuery();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(url, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          setSearchResults(data?.results);
          setThumbnail(data?.results[0]);
          setTotalProduct(data?.total);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => source.cancel();
  }, [pathname, pageCount]);

  const handleJoinUsButton = () => {
    if (!user.token) {
      setOpenAuthModal(true);
    }
  };

  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${thumbnail?.preview}`);

  return (
    <Layout title={`${searchKey}`} canonical={canonicalURL} ogUrl={document.URL} ogImage={imageThumbnail}>
      <Header />

      <Suspense fallback={<Loader />}>
        <HeroSection size="large" popularKeywords title="Graphic Resources for Free Download" />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Container>
          {totalProduct > 0 && (
            <Typography className={classes.totalResources} variant="h3">
              {`${totalProduct} Resources for "${searchKey.replace(/-/g, " ")}"`}
            </Typography>
          )}

          <Grid classes={{ container: classes.container }} container spacing={2}>
            {searchResults === null ? (
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
                {searchResults.length ? (
                  searchResults?.map((photo) => (
                    <Grid key={photo.image_id} item xs={6} sm={4} md={3} className={classes.productItem}>
                      <Product photo={photo} />
                    </Grid>
                  ))
                ) : (
                  <ProductNotFound keywords={keywords} />
                )}
              </>
            )}
          </Grid>

          {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
        </Container>
      </Suspense>

      <Spacing space={{ height: "3rem" }} />

      <Suspense fallback={<Loader />}>
        {!user.token ? (
          <CallToAction
            title="Join Piktask team"
            subtitle="Upload your first copyrighted design. Get $5 designer coupon packs"
            buttonText="Join Us"
            buttonClicked={() => handleJoinUsButton()}
          />
        ) : (
          <CallToAction
            title="Go Premium"
            subtitle="Upload your first copyrighted design. Get $5 designer coupon packs"
            buttonLink="/subscription"
            buttonText="See Plans"
          />
        )}
      </Suspense>

      {/* Sign up modal section*/}
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} />

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default SearchResults;
