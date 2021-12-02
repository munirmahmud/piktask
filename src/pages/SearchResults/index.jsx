import { CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Spacing from "../../components/Spacing";
import CallToAction from "../../components/ui/CallToAction";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import Pagination from "../../components/ui/Pagination";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
import Layout from "../../Layout";
import SignUpModal from "../Authentication/SignUpModal";
import { getBaseURL } from "./../../helpers/index";
import useStyles from "./SearchResults.styles";

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
    axios
      .get(url)
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
  }, [pathname, pageCount]);

  const handleJoinUsButton = () => {
    if (!user.token) {
      setOpenAuthModal(true);
    }
  };

  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${thumbnail?.preview}`);

  return (
    <Layout title={`${searchKey}`} canonical={canonicalURL} ogUrl={document.URL} ogImage={imageThumbnail}>
      <Header></Header>
      <HeroSection size="large" popularKeywords title="Graphic Resources for Free Download" />

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
      <Spacing space={{ height: "3rem" }} />

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

      {/* Sign up modal section*/}
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} />
      <Footer></Footer>
    </Layout>
  );
};

export default SearchResults;
