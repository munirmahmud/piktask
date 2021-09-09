import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  Paper,
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
// import DoughnutChart from "../../components/Charts/DoughnutChart";
import arrowDown from "../../../assets/dashboardicons/icon1.svg";
import moneyIcon from "../../../assets/dashboardicons/money.svg";
import downloadIcon from "../../../assets/icons/downArrow.svg";
import box from "../../../assets/dashboardicons/box.svg";
import portfolioData from "../../../data/portfolio.json";
import authorBadge from "../../../assets/badge.png";
import image3 from "../../../assets/bangladesh.png";
import authorImg from "../../../assets/author.png";
import Footer from "../../../components/ui/Footer";
import AdminHeader from "../../components/Header";
import { withStyles } from "@material-ui/styles";
import image1 from "../../../assets/brazil.png";
import image4 from "../../../assets/india.png";
import image2 from "../../../assets/japan.png";
import Heading from "../../components/Heading";
import Sidebar from "../../components/Sidebar";
import DoughnutChart from "./DoughnutChart";
import useStyles from "../../admin.styles";
import { useSelector } from "react-redux";
import map from "../../../assets/map.png";
import React, { useState } from "react";
import Layout from "../../../Layout";

const ProfileProgress = withStyles((theme) => ({
  root: {
    height: ".6rem",
    marginBottom: "1.4rem",
  },
  colorPrimary: {
    backgroundColor: "#D1D1D1",
  },
  bar: {
    backgroundColor: "#117A00",
  },
}))(LinearProgress);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const AdminDashboard = () => {
  const classes = useStyles();
  const { portfolios } = portfolioData;
  const user = useSelector((state) => state.user);


  const [value, setValue] = useState(0);

  function selectTab(index) {
    return {
      id: `portfolio-${index}`,
      "aria-controls": `portfolio-tabpanel-${index}`,
    };
  }

  const handleChange = (e, index) => { setValue(index); };

  const rows = [
    {
      id: 1,
      image: image1,
      location: "Brazil",
      earning: 0.2,
      date: "31-1-2021",
      author: authorImg,
    },
    {
      id: 2,
      image: image2,
      location: "Bangladesh",
      earning: 0.4,
      date: "31-1-2021",
      author: authorImg,
    },
    {
      id: 3,
      image: image3,
      location: "Japan",
      earning: 0.35,
      date: "31-1-2021",
      author: authorImg,
    },
    {
      id: 4,
      image: image4,
      location: "India",
      earning: 0.6,
      date: "31-1-2021",
      author: authorImg,
    },
  ];

  return (
    <Layout title={`Dashboard || Piktask`}>

      <div className={classes.adminRoot}>
        <div>
          <Sidebar />
        </div>

        <main className={classes.content}>
          <AdminHeader />
          <Grid
            container
            spacing={2}
            className={classes.dashboardGridContainer}
          >
            <Grid item xs={12} sm={7}>
              <Card className={classes.cardRoot}>
                <CardContent className={classes.statisticCardContent}>
                  <div className={classes.cardHeading}>
                    <Typography className={classes.statistics} variant="h5">
                      Statistics
                    </Typography>
                    <Button className={classes.updateBtn}>Update Daily</Button>
                  </div>
                  <div className={classes.statisticsInnerWrapper}>
                    <div className={classes.statisticsContent}>
                      <div
                        className={`${classes.arrowIcon} ${classes.statisticsIcon}`}
                      >
                        <img src={arrowDown} alt="Download" />
                      </div>
                      <Typography className={classes.statisticsText}>
                        2.0k
                        <span>Download</span>
                      </Typography>
                    </div>

                    <div className={classes.statisticsContent}>
                      <div
                        className={`${classes.boxIcon} ${classes.statisticsIcon}`}
                      >
                        <img src={box} alt="Products" />
                      </div>
                      <Typography className={classes.statisticsText}>
                        2.0k
                        <span>Products</span>
                      </Typography>
                    </div>
                    <div className={classes.statisticsContent}>
                      <div
                        className={`${classes.moneyIcon} ${classes.statisticsIcon}`}
                      >
                        <img src={moneyIcon} alt="Money" />
                      </div>
                      <Typography className={classes.statisticsText}>
                        2.0k
                        <span>Earning</span>
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Card className={classes.cardRoot}>
                <CardContent className={classes.authorCard}>
                  <div className={classes.authorInfo}>
                    <img
                      className={classes.authorBadge}
                      src={authorBadge}
                      alt="Badge"
                    />

                    <div className={classes.authorArea}>
                      {
                        user && user?.avatar ? (
                          <img
                            className={classes.authorImg}
                            src={user.avatar}
                            alt="UserPhoto"
                          />
                        ) : (
                          <img
                            className={classes.authorImg}
                            src={authorImg}
                            alt="Design Studio"
                          />
                        )
                      }
                      <Typography variant="h4">Hi, Alamin Sourov</Typography>
                      <Typography>50% Profile strength</Typography>
                    </div>
                    <ProfileProgress variant="determinate" value={60} />
                    <Typography className={classes.aboutText}>
                      Increase your discoverability > Tell us{" "}
                      <span>about you</span>
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Map & country wise earning statistics */}
          <Grid
            container
            spacing={0}
            className={classes.dashboardGridContainer}
          >
            <Grid item xs={12} sm={6}>
              <Card className={classes.cardRoot}>
                <CardContent className={classes.mapCard}>
                  <img src={map} alt="Map" />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card className={classes.cardRoot}>
                <CardHeader>Location</CardHeader>
                <CardContent className={classes.authorCard}>
                  <TableContainer
                    className={classes.tableContainer}
                    component={Paper}
                  >
                    <Table
                      className={classes.table}
                      aria-label="earning data table"
                    >
                      <TableHead>
                        <TableRow className={classes.tableHead}>
                          <TableCell className={classes.tableCell}></TableCell>
                          <TableCell className={classes.tableCell}>
                            Location
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
                        {rows.map((row) => (
                          <TableRow
                            key={row.id}
                            className={classes.tableRowContent}
                          >
                            <TableCell className={classes.tableCell}>
                              <img
                                className={classes.earningImg}
                                src={row.image}
                                alt={row.location}
                              />
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {row.location}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {row.earning}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {row.date}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card className={`${classes.cardRoot} ${classes.portfolioContainer}`}>
            <Grid container className={classes.portfolioTabWrapper}>
              <Typography className={classes.portfolioHeading} variant="h2">
                My Portfolio
              </Typography>

              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="portfolio tabs"
                className={`${classes.portfolioTabs}`}
                classes={{ indicator: classes.indicator }}
              >
                <Tab
                  disableRipple
                  classes={{ selected: classes.selected }}
                  label="PNG Images(90)"
                  {...selectTab(0)}
                />
                <Tab
                  disableRipple
                  classes={{ selected: classes.selected }}
                  label="PSD Templates(120)"
                  {...selectTab(1)}
                />
                <Tab
                  disableRipple
                  classes={{ selected: classes.selected }}
                  label="Illustrations(30)"
                  {...selectTab(2)}
                />
              </Tabs>
            </Grid>

            <CardContent className={classes.portfolioWrapper}>
              <TabPanel value={value} index={0} className={classes.tabPanel}>
                <Grid container spacing={3}>
                  {portfolios.length &&
                    portfolios.map((portfolio) => (
                      <Grid
                        key={portfolio._id}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className={classes.portfolioItem}
                      >
                        <div className={classes.portfolioContentWrapper}>
                          <img src={portfolio.image} alt={portfolio.name} />
                          <div className={classes.portfolioContent}>
                            <Typography
                              className={classes.portfoioTitle}
                              variant="h4"
                            >
                              {portfolio.name}
                            </Typography>
                            <div className={classes.downloadInfo}>
                              <img src={downloadIcon} alt="Download" />
                              Download: {portfolio.total_downloads}k
                            </div>
                          </div>
                        </div>
                      </Grid>
                    ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                PSD Templates
              </TabPanel>
              <TabPanel value={value} index={2}>
                Illustrations
              </TabPanel>
            </CardContent>
          </Card>

          <Grid
            container
            spacing={2}
            className={classes.dashboardGridContainer}
          >
            <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.cardRoot}>
                <CardContent>
                  <div className={classes.cardHeading}>
                    <Heading tag="h2">Top Selling Author</Heading>
                  </div>

                  <TableContainer
                    className={classes.tableContainer}
                    component={Paper}
                  >
                    <Table
                      className={classes.table}
                      aria-label="earning data table"
                    >
                      <TableHead>
                        <TableRow className={classes.topAuthorTableHead}>
                          <TableCell className={classes.tableCell}></TableCell>
                          <TableCell className={classes.tableCell}>
                            Download
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            Author
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.id}
                            className={classes.tableRowContent}
                          >
                            <TableCell className={classes.tableCell}>
                              <img
                                className={classes.earningImg}
                                src={row.image}
                                alt={row.location}
                              />
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              50: 00K
                            </TableCell>
                            <TableCell
                              className={`${classes.tableCell} ${classes.authorImgWrapper}`}
                            >
                              <img
                                className={classes.authorImg}
                                src={row.author}
                                alt="Author"
                              />
                              <img
                                className={classes.bestAuthorBadge}
                                src={authorBadge}
                                alt="Badge"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.cardRoot}>
                <CardContent>
                  <div className={classes.monthlyEarningHeader}>
                    <div>
                      <Heading tag="h2">Earnings</Heading>
                      <Typography
                        variant="subtitle2"
                        className={classes.subText}
                      >
                        This Month
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className={classes.subText}
                      >
                        68.2% more earnings than last month.
                      </Typography>
                    </div>
                    <Typography variant="h4">$3201: 00</Typography>
                  </div>

                  <div className={classes.earningGraph}>
                    <DoughnutChart />
                    <div className={classes.earningAmount}>$344.5.00</div>
                    {/* <div className={classes.graphFront}>
                      <Typography
                        variant="subtitle1"
                        className={classes.currentEarning}
                      >
                        $344.5.00
                      </Typography>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Footer addminFooter />
        </main>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
