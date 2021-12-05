import React, { lazy, Suspense, useEffect, useState } from "react";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Loader from "../../../../components/ui/Loader";
import Layout from "../../../../Layout";
import useStyles from "./admin.styles";

const CurrentMonthStatus = lazy(() => import("../../../../components/Partials/ContributorDashboard/CurrentMonthStatus"));
const AuthorFiles = lazy(() => import("../../../../components/Partials/ContributorDashboard/AuthorFiles"));
const Blog = lazy(() => import("../../../../components/ui/Blog"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));

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

          <Suspense fallback={<Loader />}>
            <CurrentMonthStatus />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <AuthorFiles />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Blog />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Footer contributorFooter />
          </Suspense>
        </main>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
