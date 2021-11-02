import {
  Button,
  Card,
  CardContent,
  Drawer,
  Grid,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { element } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../../components/ui/Footer";
import { getBaseURL } from "../../../helpers";
import Layout from "../../../Layout";
import AdminHeader from "../../components/Header";
import Heading from "../../components/Heading";
import Sidebar from "../../components/Sidebar";
import EditItem from "./EditItem";
import useStyles from "./PendingFiles.styles";

const PendingFiles = () => {
  const classes = useStyles();
  const cardRef = useRef();
  const user = useSelector((state) => state.user);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");

  pendingProducts.forEach(element => {
    if(productId.includes(element.token_id)){
      element.title = productName;
      console.log("title", element.title);
    }
  })

  // pendingProducts.forEach(element => {
  //   console.log("element.token_id", element.token_id);
  // });


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
    if (user?.isLogged && user?.role === "contributor") {
      try {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/contributor/images/not_submit`,
            { headers: { Authorization: user?.token } }
          )
          .then(({ data }) => {
            if (data?.status) {
              setPendingProducts(data.images);
            }
          });
      } catch (error) {
        console.log("Not submit", error);
      }
    }
  }, [user?.isLogged, user?.token, user?.role]);


  const handleDelete = (id) => {
    try {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/images/${id}`, {
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          console.log("data", data);
          if (data?.status) {
            const index = pendingProducts.findIndex((item) => item.token_id === id);
            pendingProducts.splice(index, 1);
            setPendingProducts([...pendingProducts]);
            toast.success(data.message);
          }
        });
    } catch (error) {
      console.log("Product delete", error);
    }
  };

  // const deleteSelectionProduct = () => {
  //   const filteredProducts = products.filter(product => !product.isSelected);
  //   setProducts(filteredProducts);
  //   setSelectedProducts([]);
  // }
  // console.log("deleteSelectionProduct", selectedProducts);

  const selectedProduct = (e, product) => {
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
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, isSelected: false } : item
        );
      }
      return [...prevItems, { ...product }];
    });
  };

  const handleWorkInfo = () => {
    if (selectedProducts.length > 0) {
      if (selectedProducts.length > 12) {
        toast.error("You can not select more than 12");
        return;
      }
      setOpenModal(true);
    } else {
      toast.error("Select your product");
      setOpenModal(false);
    }
  };

  return (
    <Layout title={"Pending || Piktask"}>
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.dashboardGridContainer}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Not Yet Submit</Heading>
              <div>
                {/* <Button onClick={() => deleteSelectionProduct()} className={`${classes.actionBtn} ${classes.deleteBtn}`}>
                  Delete File
                </Button> */}
                <Button
                  to={`/contributor/upload`}
                  component={Link}
                  className={`${classes.actionBtn} ${classes.addFileBtn}`}
                >
                  Add File
                </Button>
                <Button
                  className={`${classes.actionBtn} ${classes.workInfoBtn}`}
                  onClick={() => handleWorkInfo()}
                >
                  Add Work Information
                </Button>
              </div>
            </div>

            <Grid container spacing={2}>
              {pendingProducts.length > 0 ? (
                pendingProducts.map((product) => (
                  <Grid
                    key={product?.id}
                    item
                    xs={4}
                    sm={3}
                    md={2}
                    className={classes.productItem}
                  >
                    <div className={classes.btnWrapper}>
                      <DeleteIcon
                        onClick={() => handleDelete(product.token_id)}
                        className={classes.deleteIcon}
                      />
                    </div>
                    <Card
                      className={classes.pendingFileCard}
                      onClick={(e) => {
                        selectedProduct(e, product);
                      }}
                      classes={{ root: classes.root }}
                      ref={cardRef}
                    >

                      <img
                        src={getBaseURL().bucket_base_url + getBaseURL().images + product.original_file}
                        alt={product?.title}
                      />
                      <CardContent>
                        <Typography variant="h3">{productName ? productName : product.title}</Typography>
                        <Typography variant="body2"> 
                          File Size: {(product.size / 1024 / 1024).toFixed(2)}{" "} MB
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <div className={classes.noItemsFound}>
                  <Typography>No products are in pending</Typography>
                </div>
              )}
            </Grid>
          </div>

          <Drawer
            anchor="right"
            open={openModal}
            onClose={() => setOpenModal(false)}
            className={classes.editItemContainer}
          >
            <div className={classes.editItemHeader}>
              <div className={classes.headingContent}>
                <Heading>Work Details</Heading>
                <CloseIcon
                  className={classes.closeIcon}
                  onClick={() => setOpenModal(false)}
                />
              </div>
              <hr />
            </div>

            <EditItem
              setSelectedProducts={setSelectedProducts}
              setOpenModal={setOpenModal}
              products={selectedProducts}
              setProductName={setProductName}
              setProductId={setProductId}
            />
          </Drawer>
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default PendingFiles;
