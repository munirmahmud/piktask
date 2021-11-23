import { Button, Card, Drawer, Grid, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import Spacing from "../../../../components/Spacing";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import Paginations from "../../../../components/ui/Pagination";
import ProductNotFound from "../../../../components/ui/ProductNotFound";
import { getBaseURL } from "../../../../helpers";
import Layout from "../../../../Layout";
import EditItem from "./EditItem";
import useStyles from "./PendingFiles.styles";

const PendingFiles = () => {
  const classes = useStyles();
  const cardRef = useRef();
  const location = useLocation();
  const locationPath = location.pathname;
  const user = useSelector((state) => state.user);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [addProductDetails, setAddProductDetails] = useState(false);
  const [successProduct, setSuccessProduct] = useState(false);
  const [productsSubmitted, setProductsSubmitted] = useState(false);

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
    setAddProductDetails(!true);
    setSuccessProduct(!true);
    setProductsSubmitted(!true);
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/contributor/images/not_submit?limit=${limit}&page=${pageCount}`, { headers: { Authorization: user?.token } })
        .then(({ data }) => {
          if (data?.images.length > 0) {
            setPendingProducts(data?.images);
            setTotalProduct(data?.total);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Not submit", error);
          setLoading(false);
        });
    }
  }, [user?.isLoggedIn, user?.token, user?.role, addProductDetails, successProduct, pageCount, limit, productsSubmitted]);

  const handleDelete = (image_id) => {
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/images/${image_id}`, {
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            const index = pendingProducts.findIndex((item) => item.token_id === image_id);
            pendingProducts.splice(index, 1);
            setPendingProducts([...pendingProducts]);
            setLoading(false);
            toast.success(data.message);
          }
        })
        .catch((error) => {
          console.log("Product delete", error);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Product delete", error);
        });
    }
  };

  const selectedProduct = (e, product) => {
    if (product.is_save === 1) return;

    if (!product.isSelected) {
      product.isSelected = true;
      e.currentTarget.style.border = "2px solid #0088f2";
    } else {
      product.isSelected = false;
      e.currentTarget.style.border = "";
    }

    setSelectedProducts((prevItems) => {
      const isSelected = prevItems.find((item) => item.id === product.id);

      if (isSelected) {
        const index = prevItems.findIndex((item) => item.id === product.id);
        prevItems.splice(index, 1);
        return prevItems.map((item) => (item.id === product.id ? { ...item, isSelected: false } : item));
      }
      return [...prevItems, { ...product }];
    });
  };

  const handleWorkInfo = () => {
    if (selectedProducts?.length > 0) {
      if (selectedProducts?.length > 12) {
        toast.error("You can not select more than 12");
        return;
      }
      setOpenModal(true);
    } else {
      toast.error("Please select at least 1 product");
      setOpenModal(false);
    }
  };

  const handleSubmit = async () => {
    let token_ids = [];
    pendingProducts.map((item) => item.is_save === 1 && token_ids.push(item.token_id));

    if (token_ids?.length === 0) {
      toast.error("No submit ready product found.");
      return;
    }

    if (user?.isLoggedIn && user?.role === "contributor") {
      const url = `${process.env.REACT_APP_API_URL}/images/submit`;
      try {
        const response = await axios({
          method: "put",
          url,
          headers: {
            Authorization: user?.token,
            "Content-Type": "application/json",
          },
          data: { images: token_ids },
        });
        if (response.data?.status) {
          pendingProducts.forEach((element) => {
            if (element.is_save === 1) {
              setProductsSubmitted(pendingProducts);
            }
          });
          toast.success(response.data?.message || "Image submitted successfully");
        }
      } catch (error) {
        console.log("Submit image", error);
        toast.success(error.response.data?.message || "Image submitted fail");
      }
    }
  };

  return (
    <Layout title="Pending | Piktask">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.dashboardGridContainer}>
            <div className={classes.headingWrapper}>
              <div className={classes.contentWrapper}>
                <Heading tag="h2">Not yet submitted</Heading>
                <Typography variant="h3">This is your first upload!</Typography>
                <Typography>
                  Upload and send your 20 best resources. Our team will review them to ensure they <br /> meet our requirements, so make sure they show your
                  true potential.
                </Typography>
              </div>
              <div>
                {/* <Button onClick={() => deleteSelectionProduct()} className={`${classes.actionBtn} ${classes.deleteBtn}`}>
                  Delete File
                </Button> */}
                {pendingProducts.length > 0 && (
                  <Button className={`${classes.actionBtn} ${classes.addFileBtn}`} onClick={() => handleSubmit()}>
                    Submit
                  </Button>
                )}
                {/* <Button
                  to={`/contributor/upload`}
                  component={Link}
                  className={`${classes.actionBtn} ${classes.addFileBtn}`}
                >
                  Add File
                </Button> */}
                {pendingProducts.length > 0 && (
                  <Button className={`${classes.actionBtn} ${classes.workInfoBtn}`} onClick={() => handleWorkInfo()}>
                    Add Work Information
                  </Button>
                )}
              </div>
            </div>

            <Spacing space={{ height: "3rem" }} />

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
                {pendingProducts?.length > 0 ? (
                  pendingProducts?.map((product) => (
                    <Grid key={product?.id} item xs={4} sm={3} md={2} className={classes.productItem}>
                      <div className={classes.btnWrapper}>
                        <DeleteIcon onClick={() => handleDelete(product?.token_id)} className={classes.deleteIcon} />
                      </div>

                      <Card
                        className={classes.pendingFileCard}
                        onClick={(e) => {
                          selectedProduct(e, product);
                        }}
                        classes={{ root: classes.root }}
                        ref={cardRef}
                        style={{
                          border: product?.is_save === 1 && "2px solid #008000",
                        }}
                      >
                        <img src={getBaseURL().bucket_base_url + getBaseURL().images + product?.original_file} alt={product?.original_name} />

                        <div className={classes.productInfo}>
                          <Typography variant="h3">{product?.original_name}</Typography>
                          <Typography variant="body2">File Size: {(product.size / 1024 / 1024).toFixed(2)} MB</Typography>
                        </div>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <ProductNotFound pendingContent contributorProductNotFound />
                )}
              </Grid>
            )}
            {totalProduct > limit && <Paginations locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
          </div>

          <Spacing space={{ height: "5rem" }} />

          <Drawer anchor="right" open={openModal} onClose={() => setOpenModal(false)} className={classes.editItemContainer}>
            <div className={classes.editItemHeader}>
              <div className={classes.headingContent}>
                <Heading>Work Details</Heading>
                <CloseIcon className={classes.closeIcon} onClick={() => setOpenModal(false)} />
              </div>
              <hr />
            </div>

            <EditItem
              setSelectedProducts={setSelectedProducts}
              setOpenModal={setOpenModal}
              products={selectedProducts}
              setAddProductDetails={setAddProductDetails}
              pendingProducts={pendingProducts}
              setSuccessProduct={setSuccessProduct}
            />
          </Drawer>
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default PendingFiles;
