import {
  Button,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import Chart from "chart.js";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import TotalCountHistory from "../../../../components/ui/dashboard/contributor/TotalCountHistory";
import Footer from "../../../../components/ui/Footer";
import Layout from "../../../../Layout";
import useStyles from "./EarningManagement.styles";
import TabPanel from "./TabPanel";
import WithdrawModal from "./WithdrawModal";

const EarningManagement = () => {
  const refChart = useRef();
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const [onClickEvent, setOnClickEvent] = useState(true);
  const [earningData, setEarningData] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [openWithdrawModal, setWithdrawModal] = useState(false);

  const [username, setUsername] = useState("");
  const [paymentGateway, setPaymentGateway] = useState("");
  const [paypalAccount, setPaypalAccount] = useState("");
  const [payoneerAccount, setPayoneerAccount] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [minWithdraw, setMinWithdraw] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [chartData, setChartData] = useState({});
  const [selectName, setSelectName] = useState("earning");

  // Mobile responsive
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

    // Total earning management statistics API integrate
    if (user?.isLoggedIn && user?.role === "contributor") {
      let totalCount = [];
      let labelCount = [];

      var newDate = new Date();
      var firstDayCurrentMonth = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        2
      );
      var firstDay = firstDayCurrentMonth.toISOString().substring(0, 10);
      var todayCurrentMonth = newDate.toISOString().substring(0, 10);

      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/dashboard/statistics/?start=${firstDay}&end=${todayCurrentMonth}&status=earning`,
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            data?.images.forEach((element) => {
              totalCount.push(element.value);
              labelCount.push(element.date);
            });
            setChartData({
              labels: labelCount,
              datasets: [
                {
                  label: "earning",
                  data: totalCount,
                  backgroundColor: "#2195F2",
                  borderColor: "#2195F2",
                  fill: false,
                },
              ],
            });
            setLoading(false);
          }
        });
    }
  }, [user?.token, user?.isLoggedIn, user?.role]);

  const handleChange = (e, newValue) => {
    setEarningData(newValue);
  };

  const selectData = (index) => {
    return {
      id: `earning-tab-${index}`,
      "aria-controls": `earning-tabpanel-${index}`,
    };
  };

  // Date wise dashboard statistics API integration
  // From
  const fromMonths = moment.months();
  let [fromYear, setFromYear] = useState(moment().year());
  let [fromMonth, setFromMonth] = useState(moment().format("MMMM"));
  let [fromCurrentDate, setFromCurrentDate] = useState("0" + moment(1).date());

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
        // if(!i){
        //   setFromCurrentDate("0" + (i + 1))
        // } 
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

  let fromDateMonths = moment().month(fromMonth).format("M");
  if (fromDateMonths < 10) {
    fromDateMonths = "0" + fromDateMonths;
  }

  let fromDates = fromYear + "-" + fromDateMonths + "-" + fromCurrentDate;

  let toDateMonths = moment().month(toMonth).format("M");
  if (toDateMonths < 10) {
    toDateMonths = "0" + toDateMonths;
  }

  let toDates = fromYear + "-" + toDateMonths + "-" + toCurrentDate;

  const format2 = "YYYY-MM-DD"
  const date = new Date(toDates);
  const today = moment(date).format(format2);

  const handleDateSubmit = (e) => {
    e.preventDefault();

    if (user?.isLoggedIn && user?.role === "contributor") {
      let totalCount = [];
      let labelCount = [];

      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/dashboard/statistics/?start=${fromDates}&end=${today}&status=${selectName}`,
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            data?.images.forEach((element) => {
              totalCount.push(element.value);
              labelCount.push(element.date);
            });
            setChartData({
              labels: labelCount,
              datasets: [
                {
                  label: `${selectName}`,
                  data: totalCount,
                  backgroundColor: "#2195F2",
                  borderColor: "#2195F2",
                  fill: false,
                },
              ],
            });
            setLoading(false);
          }
        });
    }
  };

  const handleSelectedGraphRatio = (e) => {
    var selectedName = e.target.name;
    setSelectName(e.target.name);

    if (user?.isLoggedIn && user?.role === "contributor") {
      let totalCount = [];
      let labelCount = [];

      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/dashboard/statistics/?start=${fromDates}&end=${toDates}&status=${selectedName}`,
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            data?.images.forEach((element) => {
              totalCount.push(element.value);
              labelCount.push(element.date);
            });
            setChartData({
              labels: labelCount,
              datasets: [
                {
                  label: `${selectedName}`,
                  data: totalCount,
                  backgroundColor: "#2195F2",
                  borderColor: "#2195F2",
                  fill: false,
                },
              ],
            });
            setLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    const canvasID = refChart.current;

    new Chart(canvasID, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        indexAxis: "y",
        showLine: true,
        spanGaps: true,
        legend: {
          labels: {
            fontColor: "#788F9B",
            fontSize: 15,
            boxWidth: 10,
            boxHeight: 5,
          },
        },
        scales: {
          y: {
            stacked: true,
          },
          xAxes: [
            {
              display: true,
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              type: "logarithmic",
              gridLines: {
                display: true,
              },
              ticks: {
                suggestedMin: 10,
                suggestedMax: 50,
              },
              // stacked: true
            },
          ],
        },
      },
    });
  }, [onClickEvent, chartData]);

  const handleWithdrawInfo = () => {
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/contributor/withdrawals/info`, {
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setUsername(data.username);
            setPaymentGateway(data.payment_gateway);
            setPaypalAccount(data.paypal_account);
            setPayoneerAccount(data.payoneer_account);
            setTotalBalance(data.balance);
            setMinWithdraw(data.amount_min_withdrawal);
            setAccountNumber(data.account_number);
            setWithdrawModal(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <Layout title="Earning Management | Piktask">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.earningManagementWrapper}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Earning Management</Heading>
              <div>
                <Button
                  className={classes.withdrawBtn}
                  onClick={() => handleWithdrawInfo()}
                >
                  Withdraw
                </Button>
                <Button
                  className={classes.withdrawHistoryBtn}
                  component={Link}
                  to="/contributor/withdraw-history"
                >
                  Withdraw History
                </Button>
              </div>
            </div>

            <TotalCountHistory />

            <div>
              <Typography className={classes.formTitle} variant="h4">
                Select Period
              </Typography>

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
                      <Select
                        native
                        value={fromMonth}
                        onChange={(e) => setFromMonth(e.target.value)}
                        inputProps={{
                          // name: 'age',
                          id: "months",
                        }}
                      >
                        {fromMonths.length > 0 &&
                          fromMonths.map((month, index) => (
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
                      <Select
                        native
                        value={toMonth}
                        onChange={(e) => setToMonth(e.target.value)}
                        inputProps={{
                          // name: 'age',
                          id: "months",
                        }}
                      >
                        {toMonths.length > 0 &&
                          toMonths.map((month, index) => (
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
                    Display Statistics
                  </Button>
                </div>
              </div>
              {/* End Statistics form */}

              <div
                value={earningData}
                onChange={handleChange}
                aria-label="Earning Chart"
                className={classes.tabsBtnWrapper}
                classes={{ indicator: classes.indicator }}
              >
                <button
                  {...selectData(0)}
                  onClick={(e) => {
                    setOnClickEvent(!onClickEvent);
                    handleSelectedGraphRatio(e);
                  }}
                  name="earning"
                  className={classes.earningBtn}
                >
                  Earning
                </button>
                <button
                  {...selectData(1)}
                  onClick={(e) => {
                    setOnClickEvent(!onClickEvent);
                    handleSelectedGraphRatio(e);
                  }}
                  name="download"
                  className={classes.earningBtn}
                >
                  Download
                </button>
                <button
                  {...selectData(2)}
                  onClick={(e) => {
                    setOnClickEvent(!onClickEvent);
                    handleSelectedGraphRatio(e);
                  }}
                  name="file"
                  className={classes.earningBtn}
                >
                  Files
                </button>
              </div>

              <TabPanel value={earningData} index={0}>
                <canvas
                  id="earningChart"
                  ref={refChart}
                  width="600"
                  height="200"
                ></canvas>
              </TabPanel>

              <TabPanel value={earningData} index={1}>
                <canvas
                  id="earningChart"
                  ref={refChart}
                  width="600"
                  height="200"
                ></canvas>
              </TabPanel>
              <TabPanel value={earningData} index={2}>
                <canvas
                  id="earningChart"
                  ref={refChart}
                  width="600"
                  height="200"
                ></canvas>
              </TabPanel>
            </div>
          </div>
          <WithdrawModal
            openWithdrawModal={openWithdrawModal}
            setWithdrawModal={setWithdrawModal}
            username={username}
            paymentGateway={paymentGateway}
            paypalAccount={paypalAccount}
            payoneerAccount={payoneerAccount}
            accountNumber={accountNumber}
            totalBalance={totalBalance}
            minWithdraw={minWithdraw}
          />
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default EarningManagement;
