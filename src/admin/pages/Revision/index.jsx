import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spacing from "../../../components/Spacing";
import Footer from "../../../components/ui/Footer";
import { getBaseURL } from "../../../helpers";
import Layout from "../../../Layout";
import AdminHeader from "../../components/Header";
import Heading from "../../components/Heading";
import Sidebar from "../../components/Sidebar";
import useStyles from "./Revision.styles";

const Revision = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [revisionProduct, setRevisionProduct] = useState([]);

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
          .get(`${process.env.REACT_APP_API_URL}/contributor/images/pending`, {
            headers: { Authorization: user?.token },
          })
          .then(({ data }) => {
            if (data?.images.length > 0) {
              setRevisionProduct(data.images);
              setLoading(false);
            } else {
              setLoading(false);
            }
          });
      } catch (error) {
        console.log("Revision product", error);
        setLoading(false);
      }
    }
  }, [user?.isLoggedIn, user?.role, user?.token]);

  return (
    <Layout title="Under Revision | Piktask">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.cardContentWrapper}>
            <div className={classes.headingWrapepr}>
              <Heading tag="h2">Under Revision</Heading>
              <Typography>
                Here you can see the submitted files. Our team will review them
                and check if they meet our <br /> requirements. The files could
                remain in this stage for a few days. Please be patient!
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
                  {revisionProduct?.length > 0 ? (
                    revisionProduct?.map((product) => (
                      <Grid
                        key={product?.id}
                        item
                        xs={3}
                        sm={2}
                        md={2}
                        className={classes.productItem}
                      >
                        <Card className={classes.cardWrapper}>
                          <div className={classes.cardImage}>
                            <img
                              src={ getBaseURL().bucket_base_url + getBaseURL().images + product?.original_file }
                              alt={product.original_name}
                            />
                          </div>
                          <CardContent className={classes.cardContent}>
                            <Typography variant="h3">{product.original_name}</Typography>
                            <Typography>File Size:{" "}{(product.size / 1024 / 1024).toFixed(2)} MB</Typography>
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
          <Spacing space={{ height: "1.8rem" }} />
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default Revision;
