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
// import { borderColor } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../../components/ui/Footer";
import productData from "../../../data/products.json";
import Layout from "../../../Layout";
import AdminHeader from "../../components/Header";
import Heading from "../../components/Heading";
import Sidebar from "../../components/Sidebar";
import EditItem from "./EditItem";
import useStyles from "./PendingFiles.styles";

const PendingFiles = () => {
  const classes = useStyles();
  const [products, setProducts] = useState(productData.products);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selected, setSelected] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState({});

  const cardRef = useRef();

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

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product._id !== id));
    return;
  };

  const selectedProduct = (e, product) => {
    if (!product.isSelected) {
      product.isSelected = true;
      e.currentTarget.style.border = "2px solid #0088f2";
    } else {
      product.isSelected = false;
      e.currentTarget.style.border = "";
    }

    setSelectedProducts((prevItems) => {
      const isSelected = prevItems.find((item) => item._id === product._id);

      if (isSelected) {
        const index = prevItems.findIndex((item) => item._id === product._id);
        prevItems.splice(index, 1);
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, isSelected: false } : item
        );
      }

      return [...prevItems, { ...product }];
    });
  };

  const editSingleItem = (product) => {
    setOpenModal(true);
    setEditItem(product);
  };

  const [editProducts, setEditProducts] = useState([]);

  const editProduct = (product) => {
    setEditProducts((prevProducts) =>
      setEditProducts([...prevProducts, product])
    );
  };

  const handleWorkInfo = () => {
    if (selectedProducts.length > 0) {
      setOpenModal(true);
    } else {
      toast.error("No product");
      setOpenModal(false);
    }
  };

  // console.log("editProducts", editProducts);

  const selectProduct = () => {
    // console.log("cardRef", cardRef);
    // cardRef.current.style.border = "5px solid red";
  };

  return (
    <Layout title={`Pending || Piktask`}>
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.dashboardGridContainer}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Not Yet Submit</Heading>
              <div>
                <Button className={`${classes.actionBtn} ${classes.deleteBtn}`}>
                  Delete File
                </Button>
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
              {products.length > 0 ? (
                products.map((product) => (
                  <Grid
                    key={product._id}
                    item
                    xs={4}
                    sm={3}
                    md={2}
                    className={classes.productItem}
                  >
                    <Card
                      className={classes.pendingFileCard}
                      onClick={(e) => {
                        // editProduct(product);
                        // selectProduct();
                        selectedProduct(e, product);
                      }}
                      classes={{ root: classes.root }}
                      ref={cardRef}
                    >
                      <DeleteIcon
                        onClick={() => handleDelete(product._id)}
                        className={classes.deleteIcon}
                      />
                      <img
                        // onClick={() => editProduct(product)}
                        src={product.image}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography variant="h3">{product.name}</Typography>
                        <Typography variant="body2">File Size: 10MB</Typography>
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
              setEditProducts={setEditProducts}
              setOpenModal={setOpenModal}
              products={editProducts}
            />
          </Drawer>
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default PendingFiles;
