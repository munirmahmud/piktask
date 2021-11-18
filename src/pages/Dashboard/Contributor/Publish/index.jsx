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
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import Paginations from "../../../../components/ui/Pagination";
import ProductNotFound from "../../../../components/ui/ProductNotFound";
import { getBaseURL, getWords } from "../../../../helpers";
import Layout from "../../../../Layout";
import useStyles from "./Publish.styles";

const Publish = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const locationPath = location.pathname;
  const user = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [allPublishProduct, setAllPublishProduct] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();
  let limit = 30;
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
      if (i + 1 < 10) {
        days.push("0" + (i + 1));
      } else {
        days.push(i + 1);
      }
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

  // const dateFormat = "YYYY-MM-DD";
  // const date = new Date();
  // const today = moment(date).format(dateFormat);

  useEffect(() => {
    var newDate = new Date();
    var firstDayCurrentMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      2
    );
    var firstDay = firstDayCurrentMonth.toISOString().substring(0, 10);
    var todayCurrentMonth = newDate.toISOString().substring(0, 10);
    // Author last file API
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/images/published/?start=${firstDay}&end=${todayCurrentMonth}&limit=${limit}&page=${pageCount}`,
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.images.length > 0) {
            setAllPublishProduct(data?.images);
            setTotalProduct(data?.total);
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
    }
  }, [user?.token, dispatch, pageCount, limit, user?.isLoggedIn, user?.role]);

  const handleDateSubmit = (e) => {
    e.preventDefault();

    let fromDateMonths = moment().month(fromMonth).format("M");
    if (fromDateMonths < 10) {
      fromDateMonths = "0" + fromDateMonths;
    }
    const fromDates = fromYear + "-" + fromDateMonths + "-" + fromCurrentDate;

    let toDateMonths = moment().month(toMonth).format("M");
    if (toDateMonths < 10) {
      toDateMonths = "0" + toDateMonths;
    }
    const toDates = fromYear + "-" + toDateMonths + "-" + toCurrentDate;

    // Current date wise publish product
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/images/published/?start=${fromDates}&end=${toDates}&limit=${limit}&page=${pageCount}`,
          { headers: { Authorization: user?.token } }
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
                    onClick={handleDateSubmit}
                    className={classes.showMoreBtn}
                  >
                    View More
                  </Button>
                </div>
              </div>
            </div>

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
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.loaderItem}
                >
                  <Card className={classes.cardRoot}>
                    <CardContent className={classes.productCard}>
                      {allPublishProduct?.length > 0 ? (
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

                            {allPublishProduct?.map((product) => (
                              <TableBody key={product?.id}>
                                <TableRow
                                  key={product?.id}
                                  className={classes.tableRowContent}
                                >
                                  <TableCell
                                    className={`${classes.tableCell} ${classes.authProductWrapper}`}
                                  >
                                    <Link
                                      to={`/images/${product?.title
                                        .toLowerCase()
                                        .replace(/\s/g, "-")}&id=${
                                        product?.id
                                      }`}
                                    >
                                      <img
                                        className={classes.publishImg}
                                        src={
                                          getBaseURL().bucket_base_url +
                                          getBaseURL().images +
                                          product?.preview
                                        }
                                        alt={product?.title}
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
                                    {product?.total_earning}
                                  </TableCell>

                                  <TableCell className={classes.tableCell}>
                                    {moment(product?.createdAt).format("LL")}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            ))}
                          </Table>
                        </TableContainer>
                      ) : (
                        <ProductNotFound
                          publishContent
                          contributorProductNotFound
                        />
                      )}
                      {totalProduct > limit && (
                        <Paginations
                          locationPath={locationPath}
                          count={count}
                          pageCount={pageCount}
                          setPageCount={setPageCount}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default Publish;
