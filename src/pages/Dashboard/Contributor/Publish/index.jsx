import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
// import premiumFileSell from '../../../assets/icons/crownEnterpriseIcon.svg';
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import { getBaseURL, getWords } from "../../../../helpers";
import Layout from "../../../../Layout";
import useStyles from "./Publish.styles";

const Publish = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [allPublishProduct, setAllPublishProduct] = useState([]);

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

    // Author last file API
    if (user?.token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/contributor/earning/images`, {
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.images.length > 0) {
            setAllPublishProduct(data?.images);
            setLoading(false);
            dispatch({
              type: "TOTAL_IMAGE_EARNING",
              payload: [...data?.images],
            });
          } else {
            setLoading(false);
          }
        });
    }
  }, [user?.token, dispatch]);

  // Date wise API integration

  // From
  const fromMonths = moment.months();
  let [fromYear, setFromYear] = useState(moment().year());
  let [fromMonth, setFromMonth] = useState(moment().format("MMMM"));
  let [fromCurrentDate, setFromCurrentDate] = useState(moment().date());

  // To
  const toMonths = moment.months();
  let [toYear, setToYear] = useState(moment().year());
  let [toMonth, setToMonth] = useState(moment().format("MMMM"));
  let [toCurrentDate, setToCurrentDate] = useState(moment().date());

  const getAllDays = () => {
    const days = [];
    for (let i = 0; i < moment().daysInMonth(); i++) {
      days.push(i + 1);
    }
    return days;
  };

  const getAllYears = () => {
    const years = [];
    for (let i = 1990; i <= moment().year(); i++) {
      years.push(i);
    }
    return years.sort((a, b) => b - a);
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();

    let fromDateMonths = moment().month(fromMonth).format("M");
    if (fromDateMonths < 10) {
      fromDateMonths = "0" + fromDateMonths;
    }
    if (fromCurrentDate < 10) {
      fromCurrentDate = "0" + fromCurrentDate;
    }
    const fromDates = fromYear + "-" + fromDateMonths + "-" + fromCurrentDate;

    let toDateMonths = moment().month(toMonth).format("M");
    if (toDateMonths < 10) {
      toDateMonths = "0" + toDateMonths;
    }
    if (toCurrentDate < 10) {
      toCurrentDate = "0" + toCurrentDate;
    }
    const toDates = fromYear + "-" + toDateMonths + "-" + toCurrentDate;

    // Current date wise publish product
    if (user?.token) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/earning/images/?start=${fromDates}&end=${toDates}`,
          {
            headers: { Authorization: user?.token },
          }
        )
        .then(({ data }) => {
          if (data?.status) {
            setAllPublishProduct(data?.images);
            setLoading(false);
          }
        });
    }
  };

  return (
    <Layout title="Publish | Piktask">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.publishFileWrapper}>
            <div className={classes.headingWrapepr}>
              <Heading tag="h2">Publish File</Heading>
            </div>

            <div className={classes.dateRanges}>
              <div className={classes.statisticsFormWrapper}>
                <div className={classes.selectPeriodFrom}>
                  <div className={classes.fields}>
                    <Typography
                      className={classes.fieldTitle}
                      variant="subtitle1"
                    >
                      From
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
                      <Select
                        native
                        value={fromMonth}
                        onChange={(e) => setFromMonth(e.target.value)}
                        inputProps={{
                          // name: 'age',
                          id: "months",
                        }}
                      >
                        {fromMonths?.length > 0 &&
                          fromMonths?.map((month, index) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
                      <Select
                        native
                        value={fromCurrentDate}
                        onChange={(e) => setFromCurrentDate(e.target.value)}
                        inputProps={{
                          id: "date",
                        }}
                      >
                        {getAllDays().map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
                      <Select
                        native
                        value={fromYear}
                        onChange={(e) => setFromYear(e.target.value)}
                        inputProps={{
                          id: "year",
                        }}
                      >
                        {getAllYears().map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={classes.fields}>
                    <Typography
                      className={classes.fieldTitle}
                      variant="subtitle1"
                    >
                      To
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
                      <Select
                        native
                        value={toMonth}
                        onChange={(e) => setToMonth(e.target.value)}
                        inputProps={{
                          // name: 'age',
                          id: "months",
                        }}
                      >
                        {toMonths?.length > 0 &&
                          toMonths?.map((month, index) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
                      <Select
                        native
                        value={toCurrentDate}
                        onChange={(e) => setToCurrentDate(e.target.value)}
                        inputProps={{
                          id: "date",
                        }}
                      >
                        {getAllDays().map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
                      <Select
                        native
                        value={toYear}
                        onChange={(e) => setToYear(e.target.value)}
                        inputProps={{
                          id: "year",
                        }}
                      >
                        {getAllYears().map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <Button
                    onClick={(e) => handleDateSubmit(e)}
                    className={classes.showMoreBtn}
                  >
                    View More
                  </Button>
                </div>
              </div>
            </div>

            <Grid container className={classes.publishGridContainer}>
              <Grid item xs={12} sm={12} md={12} className={classes.loaderItem}>
                <Card className={classes.cardRoot}>
                  <CardContent className={classes.productCard}>
                    <TableContainer
                      className={classes.tableContainer}
                      component={Paper}
                    >
                      <Table
                        className={classes.table}
                        aria-label="publish data table"
                      >
                        <TableHead>
                          <TableRow className={classes.tableHead}>
                            <TableCell
                              className={classes.tableCell}
                            ></TableCell>
                            <TableCell
                              style={{ textAlign: "left" }}
                              className={classes.tableCell}
                            >
                              Title
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              Type
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              Like
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              Download
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              Earning
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              Date
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
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
                              {allPublishProduct?.length > 0 ? (
                                allPublishProduct?.map((product) => (
                                  <TableRow
                                    key={product?.id}
                                    className={classes.tableRowContent}
                                  >
                                    <TableCell
                                      className={`${classes.tableCell} ${classes.authProductWrapper}`}
                                    >
                                      <Link
                                        to={`/images/${product?.title.replace(
                                          / /g,
                                          "_"
                                        )}&id=${product?.id}`}
                                      >
                                        <img
                                          className={classes.publishImg}
                                          src={
                                            getBaseURL().bucket_base_url +
                                            getBaseURL().images +
                                            product?.preview
                                          }
                                          alt={product?.preview}
                                        />
                                      </Link>

                                      {/* {product?.item_for_sale === "sale" && (
                                        <div className={classes.premiumIcon}>
                                          <img src={premiumFileSell} alt="Premium Product" />
                                        </div>
                                      )} */}
                                    </TableCell>
                                    <TableCell
                                      style={{ textAlign: "left" }}
                                      className={classes.tableCell}
                                    >
                                      {product?.title.split(" ").length > 4 ? (
                                        <>{getWords(4, product?.title)}...</>
                                      ) : (
                                        <>{product?.title}</>
                                      )}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                      {product?.extension}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                      {product?.total_likes}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                      {product?.total_downloads}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                      <AttachMoneyIcon />
                                      {product?.earn_per_image}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                      {moment(product?.createdAt).format("LL")}
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <div
                                  className={classes.noItemsFound}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: "0 auto",
                                    height: 300,
                                  }}
                                >
                                  <Typography variant="h3">
                                    No products are in pending
                                  </Typography>
                                </div>
                              )}
                            </>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default Publish;
