import { CircularProgress, Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Spacing from "../../components/Spacing";
import Post from "../../components/ui/Blog/Post";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import Layout from "../../Layout";
import { getBaseURL } from "./../../helpers/index";

const useStyles = makeStyles((theme) => ({
  postsWrapper: {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "@media (max-width: 768)": {
      justifyContent: "flex-start",
    },
  },
}));

const AllBlogs = () => {
  const classes = useStyles();
  const [blogsPost, setBlogsPost] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios.get(`${process.env.REACT_APP_API_URL}/blogs/`, { cancelToken: source.token }).then(({ data }) => {
      if (data?.status) {
        setBlogsPost(data?.blogs);
        setThumbnail(data?.blogs[0]);
        setLoading(false);
      }
    });

    return () => source.cancel();
  }, []);

  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${thumbnail?.thumbnail}`);

  return (
    <Layout title="All Blog Posts" canonical={document.URL} ogUrl={document.URL} ogImage={imageThumbnail}>
      <Header />
      <HeroSection size="medium" blogsTitle isSearch />
      <Spacing space={{ height: "3rem" }} />
      <Container>
        <Grid container spacing={2} className={classes.postsWrapper}>
          {isLoading ? (
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
            <>{blogsPost?.length > 0 && blogsPost?.map((post) => <Post key={post?.id} post={post} />)}</>
          )}
        </Grid>
      </Container>
      <Footer />
    </Layout>
  );
};

export default AllBlogs;
