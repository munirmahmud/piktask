import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import Paginations from "../Pagination";
import Product from "../Products/Product";
import useStyles from "./RelatedImage.style";

const RelatedImage = ({ imageID }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [relatedImage, setRelatedImage] = useState([]);

  console.log("imageID1", imageID);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();
  let limit = 28;
  const count = Math.ceil(totalProduct / limit);

  useEffect(() => {
    // related product API
    let relatedImageURL;

    if (user?.isLoggedIn && user?.id && user?.role === "user") {
      relatedImageURL = `${process.env.REACT_APP_API_URL}/images/${imageID}/related_image?limit=${limit}&page=${pageCount}&user_id=${user?.id}`;
    } else {
      relatedImageURL = `${process.env.REACT_APP_API_URL}/images/${imageID}/related_image?limit=${limit}&page=${pageCount}`;
    }
    axios
      .get(relatedImageURL)
      .then(({ data }) => {
        if (data?.status) {
          setRelatedImage(data?.images);
          setTotalProduct(data?.total);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Related image error: ", error);
        setLoading(false);
      });
  }, [imageID, user?.id, user?.isLoggedIn, user?.role, limit, pageCount]);

  return (
    <>
      <Grid classes={{ container: classes.container }} container spacing={2}>
        {isLoading ? (
          <Loader />
        ) : (
          relatedImage?.map((photo) => (
            <Grid
              key={photo?.image_id}
              item
              xs={6}
              sm={4}
              md={3}
              className={classes.productItem}
            >
              <Product photo={photo} />
            </Grid>
          ))
        )}
      </Grid>
      {totalProduct > limit && (
        <Paginations
          productPagination
          count={count}
          pageCount={pageCount}
          setPageCount={setPageCount}
        />
      )}
    </>
  );
};

export default RelatedImage;