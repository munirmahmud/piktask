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
import DateSelection from "./../../../../components/ui/dashboard/contributor/DateSelection/index";
import Pagination from "./../../../../components/ui/Pagination/index";
import HistoryTable from "./HistoryTable";
import useStyles from "./WithdrawHistory.style";

const WithdrawHistory = () => {
  const classes = useStyles();
  const locationPath = document.location.pathname;
  const user = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState("");

  let limit = 20;
  const count = Math.ceil(totalProduct / limit);

  const [menuSate, setMenuSate] = useState({ mobileView: false });
  const { mobileView } = menuSate;

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
    const setResponsiveness = () => {
      return window.innerWidth < 769
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
          `${process.env.REACT_APP_API_URL}/contributor/withdrawals/history/?start=${searchInput.firstDay}&end=${searchInput.toDays}&limit=${limit}&page=${pageCount}`,
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            setWithdrawalHistory(data?.history);
            setTotalProduct(data?.total);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Withdrawals history", error.message);
          setLoading(false);
        });
    }
  }, [user, pageCount, limit, searchInput]);

  return (
    <Layout title="Withdraw History">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.withdrawHistoryWrapper}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Withdraw History</Heading>
            </div>

            <TotalCountHistory />

            <div className={classes.headingWrapper}>
              <Heading tag="h2">Records</Heading>
            </div>

            <DateSelection setSearchInput={setSearchInput} />

            <HistoryTable isLoading={isLoading} setLoading={setLoading} withdrawalHistory={withdrawalHistory} />

            {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
          </div>

          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default WithdrawHistory;
