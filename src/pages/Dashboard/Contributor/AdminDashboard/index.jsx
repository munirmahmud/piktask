// import premiumFileSell from '../../../assets/icons/crownEnterpriseIcon.svg';
import React, { useEffect, useState } from "react";
// import { TopSeller } from "../../../components/ui/TopSeller";
// import SectionHeading from "../../../components/ui/Heading";
import Blog from "../../../../components/ui/Blog";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import AuthorFiles from "../../../../components/ui/partials/ContributorDashboard/AuthorFiles";
import CurrentMonthStatus from "../../../../components/ui/partials/ContributorDashboard/CurrentMonthStatus";
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
    <Layout title="dashboard | Piktask">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <CurrentMonthStatus />
          <AuthorFiles />

          {/* <Container>
            <SectionHeading title="Top Selling Author" large>
              <Button
                className={classes.headingButton}
                component={Link}
                to="/sellers"
              >
                See More
              </Button>
            </SectionHeading>
          </Container>
          <TopSeller adminDashBoard /> */}
          <Blog />
          <Footer contributorFooter />
        </main>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
