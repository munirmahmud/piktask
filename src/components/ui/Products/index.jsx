import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SectionHeading from "../Heading";
import Loader from "../Loader";
import ProductNotFound from "../ProductNotFound";
import Product from "./Product";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "2.2rem",
  },
  productItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  headingButton: {
    ...theme.typography.button,
    padding: "0.4rem 1rem",
    fontSize: "1.3rem",
    fontWeight: 500,
    color: "#1B3F4E",
    transition: "all 0.3s linear",

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
}));

const Products = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { category, count, showHeading, piktaskCollection } = props;
  const [images, setImages] = useState([]);
  const [piktaskProduct, setPiktaskProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // Data load
  useEffect(() => {
    if(category?.id === 53) return;

    let categoryURL;

    if (user?.id && user?.role === "user") {
      categoryURL = `${process.env.REACT_APP_API_URL}/categories/${category?.id}?user_id=${user?.id}`;
    } else {
      categoryURL = `${process.env.REACT_APP_API_URL}/categories/${category?.id}`;
    }
    if (category) {
      axios.get(categoryURL).then(({ data }) => {
        if (data?.status) {
          setImages(data?.category_image);
          setLoading(false);
          dispatch({
            type: "CATEGORY_BASED_ITEMS",
            payload: {
              totalImages: data?.total,
              images: data?.category_image,
            },
          });
        }
      });
    } else {
      setLoading(true);
    }
  }, [dispatch, category, user?.id, user?.role]);

 
  useEffect(() => {
    let categoryURL;

    if (user?.id && user?.role === "user") {
      categoryURL = `${process.env.REACT_APP_API_URL}/categories/53?limit=16&user_id=${user?.id}`;
    } else {
      categoryURL = `${process.env.REACT_APP_API_URL}/categories/53/?limit=16`;
    }
    axios.get(categoryURL).then(({ data }) => {
      if (data?.status) {
        setPiktaskProduct(data?.category_image);
        setLoading(false);
      }
    });
  }, [user?.id, user?.role]);
  

  return (
    <>
      {piktaskCollection ? (
        <>
          {piktaskProduct.length !== 0 &&  (
            <SectionHeading title="Piktask Collection" large>
              <Button
                className={classes.headingButton}
                component={Link}
                to={"category/piktask-collection"}
              >
                See More
              </Button>
            </SectionHeading>
          )}

          <Grid
            classes={{ container: classes.container }}
            container
            spacing={2}
          >
            {isLoading ? (
              <Loader item={images} />
            ) : (
              <>
                {piktaskProduct?.length > 0 &&
                  piktaskProduct?.slice(0, 16).map((photo) => (
                    <Grid
                      key={photo?.image_id}
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      className={classes.productItem}
                    >
                      <Product
                        key={photo?.image_id}
                        catId={piktaskProduct?.id}
                        photo={photo}
                      />
                    </Grid>
                  ))}
              </>
            )}
          </Grid>
        </>
      ) : (
        <>
          {images.length !== 0 && showHeading && (
            <SectionHeading title={category?.name} large>
              <Button
                className={classes.headingButton}
                component={Link}
                to={`category/${category?.slug}`}
              >
                See More
              </Button>
            </SectionHeading>
          )}

          <Grid
            classes={{ container: classes.container }}
            container
            spacing={2}
          >
            {isLoading ? (
              <Loader item={images} />
            ) : (
              <>
                {images?.length > 0 &&
                  images?.slice(0, count).map((photo) => (
                    <Grid
                      key={photo?.image_id}
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      className={classes.productItem}
                    >
                      <Product
                        key={photo?.image_id}
                        catId={category?.id}
                        photo={photo}
                      />
                    </Grid>
                  ))}
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Products;
