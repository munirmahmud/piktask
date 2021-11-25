import { Card, CardContent, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { getBaseURL, getWords } from "./../../../helpers/index";
import ProductNotFound from "./../../ui/ProductNotFound/index";
import useStyles from "./PublishProduct.style";

const PublishProduct = (props) => {
  const classes = useStyles();
  const { isLoading, allPublishProduct } = props;
  return (
    <>
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
        <Grid container className={classes.publishGridContainer}>
          <Grid item xs={12} sm={12} md={12} className={classes.loaderItem}>
            <Card className={classes.cardRoot}>
              <CardContent className={classes.productCard}>
                {allPublishProduct?.length > 0 ? (
                  <TableContainer className={classes.tableContainer} component={Paper}>
                    <Table className={classes.table} aria-label="publish data table">
                      <TableHead>
                        <TableRow className={classes.tableHead}>
                          <TableCell className={classes.tableCell}></TableCell>
                          <TableCell style={{ textAlign: "left" }} className={classes.tableCell}>
                            Title
                          </TableCell>
                          <TableCell className={classes.tableCell}>Type</TableCell>
                          <TableCell className={classes.tableCell}>Like</TableCell>
                          <TableCell className={classes.tableCell}>Download</TableCell>
                          <TableCell className={classes.tableCell}>Earning</TableCell>
                          <TableCell className={classes.tableCell}>Date</TableCell>
                        </TableRow>
                      </TableHead>

                      {allPublishProduct?.map((product) => (
                        <TableBody key={product?.image_id}>
                          <TableRow key={product?.image_id} className={classes.tableRowContent}>
                            <TableCell className={`${classes.tableCell} ${classes.authProductWrapper}`}>
                              <Link to={`/images/${product?.title.toLowerCase().replace(/\s/g, "-")}&id=${product?.id}`}>
                                <img
                                  className={classes.publishImg}
                                  src={getBaseURL().bucket_base_url + getBaseURL().images + product?.preview}
                                  alt={product?.title}
                                />
                              </Link>

                              {/* {product?.item_for_sale === "sale" && (
                                          <div className={classes.premiumIcon}>
                                            <img src={premiumFileSell} alt="Premium Product" />
                                          </div>
                                        )} */}
                            </TableCell>

                            <TableCell style={{ textAlign: "left" }} className={classes.tableCell}>
                              {product?.title.split(" ").length > 4 ? <>{getWords(4, product?.title)}...</> : <>{product?.title}</>}
                            </TableCell>

                            <TableCell className={classes.tableCell}>{product?.extension}</TableCell>

                            <TableCell className={classes.tableCell}>{product?.total_likes}</TableCell>

                            <TableCell className={classes.tableCell}>{product?.total_downloads}</TableCell>

                            <TableCell className={classes.tableCell}>
                              <AttachMoneyIcon />
                              {product?.total_earning}
                            </TableCell>

                            <TableCell className={classes.tableCell}>{moment(product?.createdAt).format("LL")}</TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>
                ) : (
                  <ProductNotFound publishContent contributorProductNotFound />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PublishProduct;
