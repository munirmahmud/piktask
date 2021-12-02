import { Card, CardContent, CircularProgress, Drawer, Grid, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import Spacing from "../../../../components/Spacing";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import Pagination from "../../../../components/ui/Pagination";
import ProductNotFound from "../../../../components/ui/ProductNotFound";
import { getBaseURL } from "../../../../helpers";
import Layout from "../../../../Layout";
import useStyles from "./RejectFiles.styles";

const RejectFiles = () => {
  const classes = useStyles();
  const location = useLocation();
  const locationPath = location.pathname;
  const user = useSelector((state) => state.user);

  const [rejectMessage, setRejectMessage] = useState([]);
  const [rejectProduct, setRejectProduct] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();

  let limit = 36;
  const count = Math.ceil(totalProduct / limit);

  const [menuSate, setMenuSate] = useState({ mobileView: false });
  const { mobileView } = menuSate;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 769
        ? setMenuSate((prevState) => ({ ...prevState, mobileView: true }))
        : setMenuSate((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/contributor/images/rejected?limit=${limit}&page=${pageCount}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.images?.length > 0) {
            setRejectProduct(data?.images);
            setTotalProduct(data?.total);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Rejected product", error);
          setLoading(false);
        });
    }

    return () => source.cancel();
  }, [user?.isLoggedIn, user?.role, user?.token, pageCount, limit]);

  const handleClick = (product) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Reject API integration
    if (product?.token_id) {
      setOpenModal(true);

      axios
        .get(`${process.env.REACT_APP_API_URL}/contributor/images/rejected/${product?.token_id}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setRejectMessage(data.reasons);
          }
        })
        .catch((error) => {
          console.log("Reject issue", error);
          setLoading(false);
        });
    }

    return () => source.cancel();
  };

  return (
    <Layout title="RejectFiles">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.rejectFilesWrapper}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Reject Files</Heading>
              <Typography>
                Here you will see your rejected resources. The reason for rejection is specified in each <br /> case. For more information, consult our Reasons
                for rejection.
              </Typography>
            </div>

            <Spacing space={{ height: "4rem" }} />

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
              <Grid container spacing={2}>
                {rejectProduct?.length > 0 ? (
                  rejectProduct?.map((product) => (
                    <Grid key={product?.id} item xs={4} sm={2} md={2} className={classes.productItem}>
                      <Card className={classes.cardWrapper} onClick={() => handleClick(product)}>
                        <div className={classes.cardImage}>
                          <img src={getBaseURL().bucket_base_url + getBaseURL().images + product?.original_file} alt={product?.original_name} />
                        </div>

                        <CardContent className={classes.cardContent}>
                          <Typography variant="h3">{product?.original_name}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <ProductNotFound rejectFileContent contributorProductNotFound />
                )}
              </Grid>
            )}

            {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
          </div>

          <Spacing space={{ height: "4rem" }} />

          <Footer />
        </main>
      </div>

      <Drawer
        anchor="right"
        open={openModal}
        onClose={() => setOpenModal(false)}
        className={classes.modalContainer}
        classes={{ paper: classes.paper, root: classes.drawerRoot }}
      >
        <div className={classes.modalHeader}>
          <div className={classes.headingContent}>
            <Typography variant="h3" className={classes.headingTitle}>
              Reasons for rejection
            </Typography>
            <CloseIcon className={classes.closeIcon} onClick={() => setOpenModal(false)} />
          </div>
        </div>
        <hr />

        <div className={classes.rejectionMessage}>
          {rejectMessage.length > 0 ? (
            rejectMessage.map((reject) => (
              <div key={reject?.reason_id} className={classes.article}>
                <Typography variant="h3" className={classes.title}>
                  {reject?.title}
                </Typography>
                <Typography variant="body1">{reject?.description}. </Typography>
              </div>
            ))
          ) : (
            <div className={classes.noItemsFound}>
              <Typography>No products reason.</Typography>
            </div>
          )}
        </div>
      </Drawer>
    </Layout>
  );
};

export default RejectFiles;
