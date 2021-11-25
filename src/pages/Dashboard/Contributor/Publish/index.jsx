import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import PublishProduct from "../../../../components/Partials/PublishProduct";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import Pagination from "../../../../components/ui/Pagination";
import Layout from "../../../../Layout";
import DateSelection from "./../../../../components/ui/dashboard/contributor/DateSelection/index";
import useStyles from "./Publish.styles";

const Publish = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const locationPath = location.pathname;
  const user = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [allPublishProduct, setAllPublishProduct] = useState([]);

  const dateFormat = "YYYY-MM-DD";
  let newDate = new Date();
  let firstDayCurrentMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
  let firstDay = firstDayCurrentMonth.toISOString().substring(0, 10);
  const today = moment(newDate).format(dateFormat);

  const [searchInput, setSearchInput] = useState({
    firstDay: firstDay,
    toDays: today,
  });

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();
  let limit = 30;
  const count = Math.ceil(totalProduct / limit);

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

  useEffect(() => {
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/images/published/?start=${searchInput.firstDay}&end=${searchInput.toDays}&limit=${limit}&page=${pageCount}`,
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.images.length > 0) {
            setAllPublishProduct(data?.images);
            setTotalProduct(data?.total);
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
    }
  }, [user, dispatch, pageCount, limit, searchInput]);

  return (
    <Layout title="Publish">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.publishFileWrapper}>
            <div className={classes.headingWrapepr}>
              <Heading tag="h2">Publish File</Heading>
            </div>

            <DateSelection setSearchInput={setSearchInput} />

            <PublishProduct isLoading={isLoading} allPublishProduct={allPublishProduct} />

            {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
          </div>
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default Publish;
