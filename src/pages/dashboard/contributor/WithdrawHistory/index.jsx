import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AdminHeader from '../../../../components/ui/dashboard/contributor/Header';
import Heading from '../../../../components/ui/dashboard/contributor/Heading';
import Sidebar from '../../../../components/ui/dashboard/contributor/Sidebar';
import Footer from '../../../../components/ui/Footer';
import Layout from '../../../../Layout';
import useStyles from './WithdrawHistory.style';

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
          <div className={classes.earningManagementWrapper}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Earning Management</Heading>
              <div>
                <Button
                  // className={classes.withdrawBtn}
                  // onClick={() => handleWithdrawInfo()}
                >
                  Withdraw
                </Button>
                <Button
                  // className={classes.withdrawHistoryBtn}
                  to="#!"
                >
                  Withdraw History
                </Button>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default WithdrawHistory;