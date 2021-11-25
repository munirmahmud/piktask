import React, { useEffect, useState } from "react";
import AuthorFiles from "../../../../components/Partials/ContributorDashboard/AuthorFiles";
import CurrentMonthStatus from "../../../../components/Partials/ContributorDashboard/CurrentMonthStatus";
import Blog from "../../../../components/ui/Blog";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import Layout from "../../../../Layout";
import useStyles from "./admin.styles";

const AdminDashboard = () => {
  const classes = useStyles();
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

  return (
    <Layout title="dashboard">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <CurrentMonthStatus />
          <AuthorFiles />
          <Blog />
          <Footer contributorFooter />
        </main>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
