import { Button, Container, FormControl, Grid, Select, Typography } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../../components/ui/CallToAction";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import Pagination from "../../components/ui/Pagination";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
import Layout from "../../Layout";
import { getBaseURL } from "./../../helpers/index";
import useStyles from "./Category.styles";

const Category = () => {
  const classes = useStyles();
  const { catName } = useParams();
  const location = useLocation();
  const locationPath = location.pathname;
  const user = useSelector((state) => state.user);

  const [popularSearchKeywords, setPopularSearchKeywords] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();
  const [thumbnail, setThumbnail] = useState("");

  let limit = 24;
  const count = Math.ceil(totalProduct / limit);

  const categoryItem = categories.find((item) => item?.slug === catName);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (categoryItem?.id) {
      let relatedImageURL;

      if (user && user?.id) {
        relatedImageURL = `${process.env.REACT_APP_API_URL}/categories/${categoryItem?.id}?limit=${limit}&page=${pageCount}&user_id=${user?.id}`;
      } else {
        relatedImageURL = `${process.env.REACT_APP_API_URL}/categories/${categoryItem?.id}?limit=${limit}&page=${pageCount}`;
      }

      axios
        .get(relatedImageURL, { cancelToken: source.token })
        .then(({ data }) => {
          if (data?.status) {
            setCategoryProducts(data?.category_image);
            setThumbnail(data?.category_image[0]);
            setTotalProduct(data?.total);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Categories products", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    getCategories();
    popularKeyWords();

    return () => source.cancel();
  }, [categoryItem?.id, pageCount, limit, user]);

  const popularKeyWords = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`${process.env.REACT_APP_API_URL}/client/search/popular_keyword?limit=10}`, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          const popularSearch = data?.keywords;
          setPopularSearchKeywords(popularSearch.filter((e) => e));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Popular search keywords", error);
        setLoading(false);
      });

    return () => source.cancel();
  };

  const getCategories = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`${process.env.REACT_APP_API_URL}/categories?limit=50`, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          setCategories(data.categories);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Categories error:", error);
        setLoading(false);
      });

    return () => source.cancel();
  };

  //Fetch api to get data for the category page by sorting by popularity
  const getCategoryProducts = (e) => {
    const product = e.target.value;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (categoryItem?.id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/categories/${categoryItem?.id}?${product}=1&limit=${limit}&page=${pageCount}`, { cancelToken: source.token })
        .then(({ data }) => {
          if (data?.status) {
            setCategoryProducts(data?.category_image);
            setTotalProduct(data?.total);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Category products error:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    return () => source.cancel();
  };

  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${thumbnail?.preview}`);

  return (
    <Layout title={`${catName}`} canonical={document.URL} ogUrl={document.URL} ogImage={imageThumbnail}>
      <Header />

      <HeroSection size="large" popularKeywords title="Graphic Resource for Free Download" />

      <Container>
        {categoryProducts?.length > 0 && (
          <div className={classes.shortList}>
            <div className={classes.shortListWrapper}>
              <Typography className={classes.shortListTag}>Sort by:</Typography>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  className={classes.selectSortItem}
                  native
                  onChange={getCategoryProducts}
                  inputProps={{
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option value="all_product">All Product</option>
                  <option value="brand_new">Brand New</option>
                  <option value="popular">Popular</option>
                  <option value="top_download">Top Download</option>
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </Select>
              </FormControl>
            </div>
          </div>
        )}
      </Container>

      <Container>
        {totalProduct > 0 && (
          <Typography className={classes.totalResources} variant="h3">
            {`${totalProduct} Resources`}
          </Typography>
        )}

        {categoryProducts === null ? (
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
          <Grid classes={{ container: classes.container }} container spacing={2}>
            {categoryProducts?.length > 0 ? (
              categoryProducts?.map((photo) => (
                <Grid key={photo?.image_id} item xs={6} sm={4} md={3} className={classes.productItem}>
                  <Product photo={photo} />
                </Grid>
              ))
            ) : (
              <ProductNotFound />
            )}
          </Grid>
        )}

        {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
      </Container>

      <div className={classes.tagWrapper}>
        <Container>
          <Grid container>
            <Grid item className={classes.tagsContainer}>
              <Typography className={classes.tagTitle} variant="h3">
                Popular Search:
              </Typography>
              {popularSearchKeywords?.map((tag, index) => (
                <Button className={classes.tagButton} key={index} tag={tag} component={Link} to={`/tag/${tag}`}>
                  {tag}
                </Button>
              ))}
            </Grid>
          </Grid>
        </Container>
      </div>

      <CallToAction title="Join Piktask team" subtitle="Upload your first copyrighted design. Get $5 designer coupon packs" buttonText="Join Us" uppercase />

      <Footer />
    </Layout>
  );
};

export default Category;
