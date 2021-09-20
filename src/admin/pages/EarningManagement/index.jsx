import {
  Button,
  Card,
  FormControl,
  Grid,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import Chart from "chart.js";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../../components/ui/Footer";
import Layout from "../../../Layout";
import AdminHeader from "../../components/Header";
import Heading from "../../components/Heading";
import Sidebar from "../../components/Sidebar";
import useStyles from "./EarningManagement.styles";
import TabPanel from "./TabPanel";


const EarningManagement = () => {
  const refChart = useRef();
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const months = moment.months();
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().format("MMMM"));
  const [currentDate, setCurrentDate] = useState(moment().date());
  
  const [earningData, setEarningData] = useState(0);
  const [onClickEvent, setOnClickEvent] = useState(true);
  const [totalSummary, setTotalSummery] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [chartData, setChartData] = useState({});

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


    // Total earning summary API integration
    if(user?.token){
      axios
      .get(`${process.env.REACT_APP_API_URL}/user/earning/summary`,
      {
        headers: {Authorization: user.token},
      })
      .then(({data}) => {
        if(data?.status){
          setTotalSummery(data?.summery);
          setLoading(false);
        }
      })
    }
    

    // Total earning management statistics API integrate

    if(user?.token){

      var newDate = new Date();
      var firstDayCurrentMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 2);
      var firstDay = firstDayCurrentMonth.toISOString().substring(0, 10);
      var todayCurrentMonth = newDate.toISOString().substring(0, 10);


      axios
      .get(`${process.env.REACT_APP_API_URL}/user/dashboard/statistics/?start=${firstDay}&end=${todayCurrentMonth}&status=earning`,
      {
        headers: {Authorization: user.token},
      })
      .then(({data}) => {
        // console.log("data", data.images);
        // if(data?.status){
        //   setTotalSummery(data?.summery);
        //   setLoading(false);
        // }
      })
    }


  }, [user.token]);


  const handleChange = (e, newValue) => {
    setEarningData(newValue);
  };

  const getAllDays = () => {
    const days = [];
    for (let i = 0; i < moment().daysInMonth(); i++) {
      days.push(i + 1);
    }
    return days;
  };

  const getAllYears = () => {
    const years = [];
    for (let i = 1970; i <= moment().year(); i++) {
      years.push(i);
    }
    return years.sort((a, b) => b - a);
  };

  const selectData = (index) => {
    return {
      id: `earning-tab-${index}`,
      "aria-controls": `earning-tabpanel-${index}`,
    };
  };



  const handleSelectedGraphRatio = (e) => {

    // console.log("targetValue", e.target.dataset.onclick);
    var selectedName = e.target.dataset.onclick;

    if(user?.token){

      let totalCount = [];
      let labelCount = [];

      var newDate = new Date();
      var firstDayCurrentMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 2);
      var firstDay = firstDayCurrentMonth.toISOString().substring(0, 10);
      var todayCurrentMonth = newDate.toISOString().substring(0, 10);


      axios
      .get(`${process.env.REACT_APP_API_URL}/user/dashboard/statistics/?start=${firstDay}&end=${todayCurrentMonth}&status=${selectedName}`,
      {
        headers: {Authorization: user.token},
      })
      .then(({data}) => {
        console.log("data1", data.images);
        if(data?.status){
          data?.images.forEach((element) => {
            totalCount.push(element.value);
            labelCount.push(element.date);
          });
          setLoading(false);
        }
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
        })
      })
    }
  };

  console.log("chartData", chartData);


  useEffect(() => {
    const canvasID = refChart.current;

    new Chart(canvasID, {
      type: "line",
      data: {chartData},
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
  
  // console.log("totalStatistics", totalStatistics);

  return (
    <Layout title={"Earning Management || Piktask"}>

      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.earningManagementWrapper}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Earning Management</Heading>
            </div>

            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Card className={classes.cardWrapper}>
                  <div className={classes.graphBox}>
                    <div className={classes.amount}>{totalSummary?.total_earning}$</div>
                    <span className={classes.title}>Total Earning</span>
                    {/* <span className={classes.duration}>Last month: 0.00</span> */}
                  </div>
                  {/* <div className={classes.graphBox}>
                    <span className={`${classes.amount} ${classes.totalEarningColor}`}>
                      {totalSummary?.total_earning}$
                    </span>
                    <span className={classes.title}>Total Earning</span>
                    <span className={`${classes.duration} ${classes.bgColor2}`}>
                      Last month: 0.00
                    </span>
                  </div> */}
                  <div className={classes.graphBox}>
                    <span className={`${classes.amount} ${classes.paidDownloadColor}`}>
                      {totalSummary?.total_images}
                    </span>
                    <span className={classes.title}>Total Files</span>
                    {/* <span className={`${classes.duration} ${classes.bgColor3}`}>
                      Last month: 0.00
                    </span> */}
                  </div>
                  <div className={classes.graphBox}>
                    <span className={`${classes.amount} ${classes.freeDownloadColor}`}>
                      {totalSummary?.total_followers}
                    </span>
                    <span className={classes.title}>Total Follower</span>
                    {/* <span className={`${classes.duration} ${classes.bgColor4}`}>
                      Last month: 0.00
                    </span> */}
                  </div>
                  <div className={classes.graphBox}>
                    <span className={`${classes.amount} ${classes.totalDownloadColor}`}>
                      {totalSummary?.total_downloads}
                    </span>
                    <span className={classes.title}>Total Download</span>
                    {/* <span className={`${classes.duration} ${classes.bgColor5}`}>
                      Last month: 0.00
                    </span> */}
                  </div>
                </Card>
              </Grid>
            </Grid>

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
                      {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
                      <Select
                        native
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        inputProps={{
                          // name: 'age',
                          id: "months",
                        }}
                      >
                        {months.length > 0 &&
                          months.map((month, index) => (
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
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
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
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
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
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        inputProps={{
                          // name: 'age',
                          id: "months",
                        }}
                      >
                        {months.length > 0 &&
                          months.map((month, index) => (
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
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
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
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
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

                  <Button className={classes.statisticsBtn}>
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
                    handleSelectedGraphRatio(e)
                  }}
                  data-onclick="earning"
                  className={`${classes.earningBtn} ${classes.earningGreenBtn}`}
                >Earning</button>
                <button
                  {...selectData(1)}
                  onClick={(e) => {
                    setOnClickEvent(!onClickEvent); 
                    handleSelectedGraphRatio(e)
                  }}
                  data-onclick="download"
                  className={`${classes.earningBtn} ${classes.earningGreenBtn}`}
                >Download</button>
                <button
                  {...selectData(2)}
                  onClick={(e) => {
                    setOnClickEvent(!onClickEvent); 
                    handleSelectedGraphRatio(e)
                  }}
                  data-onclick="file"
                  className={`${classes.earningBtn} ${classes.earningGreenBtn}`}
                >Files</button>
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
        <Footer />
        </main>
      </div>

    </Layout>
  );
};

export default EarningManagement;
