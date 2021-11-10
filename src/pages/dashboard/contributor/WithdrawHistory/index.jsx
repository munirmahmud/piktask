import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import TotalCountHistory from "../../../../components/ui/dashboard/contributor/TotalCountHistory";
import Footer from "../../../../components/ui/Footer";
import Layout from "../../../../Layout";
import useStyles from "./WithdrawHistory.style";

const WithdrawHistory = () => {
  const classes = useStyles();
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

  return (
    <Layout title="Withdraw History | Piktask">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.withdrawHistoryWrapper}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Withdraw History</Heading>
              <div>
                <Button
                  className={classes.withdrawBtn}
                  // onClick={() => handleWithdrawInfo()}
                >
                  Withdraw
                </Button>
              </div>
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
                      <Table className={classes.table} aria-label="publish data table">
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

                        <TableBody>
                          <TableRow className={classes.tableRowContent}>
                            <TableCell className={classes.tableCell}>November 10, 2021</TableCell>
                            <TableCell className={classes.tableCell}>$500</TableCell>
                            <TableCell className={classes.tableCell}>Lorem ipsum dolor sit amet.</TableCell>
                            <TableCell className={classes.tableCell}>(No reason)</TableCell>
                          </TableRow>
                        </TableBody>
                        <TableBody>
                          <TableRow className={classes.tableRowContent}>
                            <TableCell className={classes.tableCell}>November 10, 2021</TableCell>
                            <TableCell className={classes.tableCell}>$500</TableCell>
                            <TableCell className={classes.tableCell}>Lorem ipsum dolor sit amet.</TableCell>
                            <TableCell className={classes.tableCell}>(No reason)</TableCell>
                          </TableRow>
                        </TableBody>
                        <TableBody>
                          <TableRow className={classes.tableRowContent}>
                            <TableCell className={classes.tableCell}>November 10, 2021</TableCell>
                            <TableCell className={classes.tableCell}>$500</TableCell>
                            <TableCell className={classes.tableCell}>Lorem ipsum dolor sit amet.</TableCell>
                            <TableCell className={classes.tableCell}>(No reason)</TableCell>
                          </TableRow>
                        </TableBody>
                        <TableBody>
                          <TableRow className={classes.tableRowContent}>
                            <TableCell className={classes.tableCell}>November 10, 2021</TableCell>
                            <TableCell className={classes.tableCell}>$500</TableCell>
                            <TableCell className={classes.tableCell}>Lorem ipsum dolor sit amet.</TableCell>
                            <TableCell className={classes.tableCell}>(No reason)</TableCell>
                          </TableRow>
                        </TableBody>
                        <TableBody>
                          <TableRow className={classes.tableRowContent}>
                            <TableCell className={classes.tableCell}>November 10, 2021</TableCell>
                            <TableCell className={classes.tableCell}>$500</TableCell>
                            <TableCell className={classes.tableCell}>Lorem ipsum dolor sit amet.</TableCell>
                            <TableCell className={classes.tableCell}>(No reason)</TableCell>
                          </TableRow>
                        </TableBody>
                        <TableBody>
                          <TableRow className={classes.tableRowContent}>
                            <TableCell className={classes.tableCell}>November 10, 2021</TableCell>
                            <TableCell className={classes.tableCell}>$500</TableCell>
                            <TableCell className={classes.tableCell}>Lorem ipsum dolor sit amet.</TableCell>
                            <TableCell className={classes.tableCell}>(No reason)</TableCell>
                          </TableRow>
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

export default WithdrawHistory;
