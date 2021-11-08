import { Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Spacing from "../../components/Spacing";
import CallToAction from "../../components/ui/CallToAction";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import Loader from "../../components/ui/Loader";
import Paginations from "../../components/ui/Pagination";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
import Layout from "../../Layout";
import SignUpModal from "../Authentication/SignUpModal";
import useStyles from "./SearchResults.styles";

const SearchResults = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const location = useLocation();
  const keywords = location.pathname.split("=").pop().replace(/-/g, " ");
  const locationPath = location.pathname;
  const user = useSelector((state) => state.user);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();
  
  let limit = 32;
  const count = Math.ceil(totalProduct / limit);

  const searchQuery = pathname.split("=");
  // const keywords = searchQuery[1];
  const searchCategoryID = searchQuery[3];

  const prepareSearchQuery = () => {
    let url;
    if (searchCategoryID) {
      url = `${process.env.REACT_APP_API_URL}/client/search/?title=${keywords}&category_id=${searchCategoryID}&limit=${limit}&page=${pageCount}`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/client/search/?title=${keywords}&limit=${limit}&page=${pageCount}`;
    }

    return encodeURI(url);
  };

  useEffect(() => {
    const url = prepareSearchQuery();
    axios
      .get(url)
      .then(({ data }) => {
        if (data?.status) {
          setSearchResults(data?.results);
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

  return (
    <Layout title={`${keywords} | Piktask`}>
      <Header></Header>
      <HeroSection
        size="large"
        popularKeywords
        title="Graphic Resources for Free Download"
      />

      <Container>
        <Typography className={classes.totalResources} variant="h3">
          {`${totalProduct} Resources for "${keywords.replace(/-/g, " ")}"`}
        </Typography>
        <Grid classes={{ container: classes.container }} container spacing={2}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {searchResults.length ? (
                searchResults?.map((photo) => (
                  <Grid
                    key={photo.image_id}
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
                <ProductNotFound keywords={keywords} />
              )}
            </>
          )}
        </Grid>
        {totalProduct > 32 && (
          <Paginations locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />
        )} 
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
      <SignUpModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
      />
      <Footer></Footer>
    </Layout>
  );
};

export default SearchResults;
