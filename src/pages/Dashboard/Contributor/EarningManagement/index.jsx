import { Button, Typography, useMediaQuery } from "@material-ui/core";
import axios from "axios";
import Chart from "chart.js";
import moment from "moment";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DateSelection from "../../../../components/ui/dashboard/contributor/DateSelection/index";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Loader from "../../../../components/ui/Loader";
import { expiredLoginTime } from "../../../../helpers";
import Layout from "../../../../Layout";
import useStyles from "./EarningManagement.styles";
import TabPanel from "./TabPanel";
import WithdrawModal from "./WithdrawModal";

const TotalCountHistory = lazy(() => import("../../../../components/ui/dashboard/contributor/TotalCountHistory"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));

const EarningManagement = () => {
  const refChart = useRef();
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const mobileView = useMediaQuery("(max-width:769px)");

  const [isLoading, setLoading] = useState(true);
  const [earningData, setEarningData] = useState(0);
  const [onClickEvent, setOnClickEvent] = useState(true);
  const [openWithdrawModal, setWithdrawModal] = useState(false);

  const [payoneerAccount, setPayoneerAccount] = useState("");
  const [paymentGateway, setPaymentGateway] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paypalAccount, setPaypalAccount] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [minWithdraw, setMinWithdraw] = useState("");
  const [chartData, setChartData] = useState({});
  const [username, setUsername] = useState("");

  // Date formation
  const dateFormat = "YYYY-MM-DD";
  let newDate = new Date();
  let firstDayCurrentMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
  let firstDay = firstDayCurrentMonth.toISOString().substring(0, 10);
  const today = moment(newDate).format(dateFormat);

  const [searchInput, setSearchInput] = useState({
    firstDay: firstDay,
    toDays: today,
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Total earning management statistics API integrate
    if (user?.isLoggedIn && user?.role === "contributor") {
      let totalCount = [];
      let labelCount = [];

      axios
        .get(`${process.env.REACT_APP_API_URL}/contributor/dashboard/statistics/?start=${searchInput.firstDay}&end=${searchInput.toDays}&status=earning`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
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
                  label: "Earning",
                  data: totalCount,
                  backgroundColor: "#2195F2",
                  borderColor: "#2195F2",
                  fill: false,
                },
              ],
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Earning management", error);
          setLoading(false);

          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  }, [user, searchInput]);

  const handleChange = (e, newValue) => {
    setEarningData(newValue);
  };

  const selectData = (index) => {
    return {
      id: `earning-tab-${index}`,
      "aria-controls": `earning-tabpanel-${index}`,
    };
  };

  const handleSelectedGraphRatio = (e) => {
    var selectedName = e.target.name;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      let totalCount = [];
      let labelCount = [];

      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/dashboard/statistics/?start=${searchInput.firstDay}&end=${searchInput.toDays}&status=${selectedName}`,
          { cancelToken: source.token, headers: { Authorization: user?.token } }
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
                  label: `${selectedName.charAt(0).toUpperCase() + selectedName.slice(1)}`,
                  backgroundColor: "#2195F2",
                  borderColor: "#2195F2",
                  data: totalCount,
                  fill: false,
                },
              ],
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Graph ratio", error);
          setLoading(false);

          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
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
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/contributor/withdrawals/info`, {
          cancelToken: source.token,
          headers: {
            Authorization: user?.token,
          },
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

          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  };

  return (
    <Layout title="Earning Management">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />

          <div className={classes.earningManagementWrapper}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Earning Management</Heading>

              <div>
                <Button className={classes.withdrawBtn} onClick={() => handleWithdrawInfo()}>
                  Withdraw
                </Button>

                <Button className={classes.withdrawHistoryBtn} component={Link} to="/contributor/withdraw-history">
                  Withdraw History
                </Button>
              </div>
            </div>

            <Suspense fallback={<Loader />}>
              <TotalCountHistory />
            </Suspense>

            <Suspense fallback={<Loader />}>
              <div>
                <Typography className={classes.formTitle} variant="h4">
                  Select Period
                </Typography>

                <DateSelection earningManagementBtn setSearchInput={setSearchInput} />

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
                  <canvas id="earningChart" ref={refChart} width="600" height="200"></canvas>
                </TabPanel>

                <TabPanel value={earningData} index={1}>
                  <canvas id="earningChart" ref={refChart} width="600" height="200"></canvas>
                </TabPanel>

                <TabPanel value={earningData} index={2}>
                  <canvas id="earningChart" ref={refChart} width="600" height="200"></canvas>
                </TabPanel>
              </div>
            </Suspense>
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
