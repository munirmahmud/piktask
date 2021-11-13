import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import TotalCountHistory from "../../../../components/ui/dashboard/contributor/TotalCountHistory";
import Footer from "../../../../components/ui/Footer";
import Layout from "../../../../Layout";
import useStyles from "./WithdrawHistory.style";

const WithdrawHistory = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);

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
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/withdrawals/history/?start=2021-11-13&end=2021-11-13`,
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            setWithdrawalHistory(data?.history);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Withdrawals history", error.message);
          setLoading(false);
        });
    }
  }, [user?.isLoggedIn, user?.role, user?.token]);

  return (
    <Layout title="Withdraw History | Piktask">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.withdrawHistoryWrapper}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Withdraw History</Heading>
              {/* <div>
                <Button
                  className={classes.withdrawBtn}
                  onClick={() => handleWithdrawInfo()}
                >
                  Withdraw
                </Button>
              </div> */}
            </div>

            <TotalCountHistory />

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
                            <TableCell className={classes.tableCell}>
                              Date
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              Withdrawal Amount
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              Status
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              Reason
                            </TableCell>
                          </TableRow>
                        </TableHead>

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
                            {withdrawalHistory?.length > 0 &&
                              withdrawalHistory?.map((historyItem) => (
                                <TableBody key={historyItem?.id}>
                                  <TableRow className={classes.tableRowContent}>
                                    <TableCell className={classes.tableCell}>
                                      {moment(historyItem?.date_paid).format(
                                        "ll"
                                      )}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                      ${historyItem?.amount}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                      {historyItem?.status}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                      {historyItem?.reason}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              ))}
                          </>
                        )}
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

export default WithdrawHistory;
