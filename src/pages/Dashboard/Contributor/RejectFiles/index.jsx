import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Drawer,
  Grid,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../../../components/ui/Footer";
import { getBaseURL } from "../../../../helpers";
import Layout from "../../../../Layout";
import useStyles from "./RejectFiles.styles";
import Sidebar from "../../../../components/ui/Dashboard/Contributor/Sidebar";
import AdminHeader from "../../../../components/ui/Dashboard/Contributor/Header";
import Heading from "../../../../components/ui/Dashboard/Contributor/Heading";
import Spacing from "../../../../components/Spacing";

const RejectFiles = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [rejectMessage, setRejectMessage] = useState([]);
  const [rejectProduct, setRejectProduct] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [menuSate, setMenuSate] = useState({ mobileView: false });
  const { mobileView } = menuSate;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMenuSate((prevState) => ({ ...prevState, mobileView: true }))
        : setMenuSate((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  useEffect(() => {
    if (user?.isLoggedIn && user?.role === "contributor") {
      try {
        axios
          .get(`${process.env.REACT_APP_API_URL}/contributor/images/rejected`, {
            headers: { Authorization: user?.token },
          })
          .then(({ data }) => {
            if (data?.images.length > 0) {
              setRejectProduct(data.images);
              setLoading(false);
            } else {
              setLoading(false);
            }
          });
      } catch (error) {
        console.log("Rejected product", error);
        setLoading(false);
      }
    }
  }, [user?.isLoggedIn, user?.role, user?.token]);

  const handleClick = (product) => {
    // Reject API integration
    if (product?.id) {
      setOpenModal(true);
      try {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/contributor/images/rejected/${product?.id}`,
            {
              headers: { Authorization: user?.token },
            }
          )
          .then(({ data }) => {
            if (data?.status) {
              setRejectMessage(data.reasons);
            }
          });
      } catch (error) {
        console.log("Reject issue", error);
      }
    }
  };

  return (
    <Layout title="RejectFiles | Piktask">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.rejectFilesWrapper}>
            <div className={classes.headingWrapepr}>
              <Heading tag="h2">Reject Files</Heading>
              <Typography>
                Here you will see your rejected resources. The reason for
                rejection is specified in each <br /> case. For more
                information, consult our Reasons for rejection.
              </Typography>
            </div>

            <Grid container spacing={2}>
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
                <>
                  {rejectProduct?.length > 0 ? (
                    rejectProduct?.map((product) => (
                      <Grid
                        key={product?.id}
                        item
                        xs={3}
                        sm={2}
                        md={2}
                        className={classes.productItem}
                      >
                        <Card
                          className={classes.cardWrapper}
                          onClick={() => handleClick(product)}
                        >
                          <div className={classes.cardImage}>
                            <img
                              src={
                                getBaseURL().bucket_base_url +
                                getBaseURL().images +
                                product?.original_file
                              }
                              alt={product?.original_name}
                            />
                          </div>
                          <CardContent className={classes.cardContent}>
                            <Typography variant="h3">{product?.original_name}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <div 
                      className={classes.noItemsFound}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                        height: 300
                      }}
                    >
                      <Typography variant="h3">No products are in pending</Typography>
                    </div>
                  )}
                </>
              )}
            </Grid>
          </div>
          <Spacing space={{ height: "2.5rem" }} />
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
            <Typography variant="h3" className={classes.title}>
              Reasons for rejection
            </Typography>
            <CloseIcon
              className={classes.closeIcon}
              onClick={() => setOpenModal(false)}
            />
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
        <Button variant="contained" className={classes.viewBtn}>
          View More Reasons
        </Button>
      </Drawer>
    </Layout>
  );
};

export default RejectFiles;
