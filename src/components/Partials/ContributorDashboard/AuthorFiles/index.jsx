import { Button, Card, CardContent, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authorBadge from "../../../../assets/badge.png";
import authorPhoto from "../../../../assets/user/user-man.png";
import { getBaseURL } from "../../../../helpers";
import Heading from "../../../ui/dashboard/contributor/Heading";
import ProductNotFound from "./../../../ui/ProductNotFound/index";
import useStyles from "./AuthorFiles.styles";

const AuthorFiles = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [topFiles, setTopFiles] = useState(null);
  const [authorFiles, setAuthorFiles] = useState(null);

  function pikTaskEncodeURI(data) {
    if (data) {
      return (
        "/category" + encodeURI(`/${data?.category.toLowerCase().trim().replace(/\s/g, "-")}/${data?.title.toLowerCase().replace(/\s/g, "-")}&id=${data?.id}`)
      );
    }
  }

  useEffect(() => {
    // Author last file API integration
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios.get(`${process.env.REACT_APP_API_URL}/contributor/earning/images?limit=5`, { headers: { Authorization: user?.token } }).then(({ data }) => {
        if (data?.status) {
          setAuthorFiles(data?.images);
          setLoading(false);
        }
      });
    }

    // Piktask top file API  integration
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios.get(`${process.env.REACT_APP_API_URL}/contributor/dashboard/top_files?limit=5`, { headers: { Authorization: user?.token } }).then(({ data }) => {
        if (data?.status) {
          setTopFiles(data?.images);
          setLoading(false);
        }
      });
    }
  }, [user?.token, user?.role, user?.isLoggedIn]);

  return (
    <Grid container className={classes.filesGridContainer}>
      <Grid item xs={12} sm={12} md={6} className={classes.loaderItem}>
        {authorFiles === null ? (
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
          <Card className={classes.cardRoot}>
            {authorFiles?.length ? (
              <CardContent className={classes.authorCard}>
                <div className={classes.cardHeading}>
                  <Heading tag="h2">Your Latest File's</Heading>
                  <Button className={classes.loadMoreBtn} component={Link} to={`/contributor/publish`}>
                    Load more
                  </Button>
                </div>
                <TableContainer className={classes.tableContainer} component={Paper}>
                  <Table className={classes.table} aria-label="earning data table">
                    <TableHead>
                      <TableRow className={classes.tableHead}>
                        <TableCell align="left" className={classes.tableCell}>
                          Item
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          Type
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          Download
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          Earning
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {authorFiles?.map((authLastFile) => (
                        <TableRow key={authLastFile?.id} className={classes.tableRowContent}>
                          <TableCell className={`${classes.tableCell} ${classes.authProductWrapper}`}>
                            <Link to={pikTaskEncodeURI(authLastFile)}>
                              <img
                                className={classes.earningImg}
                                src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + authLastFile?.preview)}
                                alt={authLastFile?.title}
                              />
                            </Link>

                            {/* {authLastFile?.item_for_sale === "sale" && (
                                  <div className={classes.premiumIcon}>
                                    <img src={encodeURI(premiumFileSell)} alt="Premium Product" />
                                  </div>
                                )} */}
                          </TableCell>
                          <TableCell align="center" className={classes.tableCell}>
                            {authLastFile?.extension}
                          </TableCell>
                          <TableCell align="center" className={classes.tableCell}>
                            {authLastFile?.total_downloads}
                          </TableCell>
                          <TableCell align="center" className={classes.tableCell}>
                            <AttachMoneyIcon />
                            {authLastFile?.earn_per_image}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            ) : (
              <ProductNotFound contributorProductNotFound />
            )}
          </Card>
        )}
      </Grid>

      <Grid item xs={12} sm={12} md={6} className={classes.loaderItem}>
        {topFiles === null ? (
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
          <Card className={classes.cardRoot}>
            <CardContent className={classes.authorCard}>
              <div className={classes.cardHeading}>
                <Heading style={{ padding: "0.4rem 0rem" }} tag="h2">
                  Piktask Top File's
                </Heading>
              </div>

              <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="earning data table">
                  <TableHead>
                    <TableRow className={classes.tableHead}>
                      <TableCell align="left" className={classes.tableCell}>
                        Item
                      </TableCell>
                      <TableCell align="center" className={classes.tableCell}>
                        Type
                      </TableCell>
                      <TableCell align="center" className={classes.tableCell}>
                        Downloads
                      </TableCell>
                      <TableCell align="center" className={classes.tableCell}>
                        Author
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {topFiles?.length > 0 ? (
                      topFiles?.map((topFile) => (
                        <TableRow key={topFile?.id} className={classes.tableRowContent}>
                          <TableCell className={`${classes.tableCell} ${classes.authProductWrapper}`}>
                            <Link to={pikTaskEncodeURI(topFile)}>
                              <img
                                className={classes.earningImg}
                                src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + topFile?.preview)}
                                alt={topFile?.title}
                              />
                            </Link>
                            {/* {topFile?.item_for_sale === "sale" && (
                                <div className={classes.premiumIcon}>
                                  <img src={encodeURI(premiumFileSell)} alt="Premium Product" />
                                </div>
                              )} */}
                          </TableCell>
                          <TableCell align="center" className={classes.tableCell}>
                            {topFile?.extension}
                          </TableCell>
                          <TableCell align="center" className={classes.tableCell}>
                            {topFile?.total_downloads}
                          </TableCell>
                          <TableCell align="center" className={`${classes.tableCell} ${classes.authorImgWrapper}`}>
                            <Link to={`/author/${topFile?.username}`}>
                              {topFile?.avatar ? (
                                <img className={classes.authorImg} src={getBaseURL().bucket_base_url + "/" + topFile?.avatar} alt={topFile?.username} />
                              ) : (
                                <img className={classes.authorImg} src={authorPhoto} alt={topFile?.username} />
                              )}
                            </Link>
                            <img className={classes.bestAuthorBadge} src={authorBadge} alt="Badge" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <ProductNotFound contributorProductNotFound />
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

export default AuthorFiles;
