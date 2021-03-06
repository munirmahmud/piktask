import { useMediaQuery } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import PublishProduct from "../../../../components/Partials/PublishProduct";
import DateSelection from "../../../../components/ui/dashboard/contributor/DateSelection/index";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import Pagination from "../../../../components/ui/Pagination";
import { expiredLoginTime } from "../../../../helpers";
import Layout from "../../../../Layout";
import useStyles from "./Publish.styles";

const Publish = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const locationPath = location.pathname;
  const user = useSelector((state) => state.user);
  const mobileView = useMediaQuery("(max-width:769px)");

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

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/contributor/images/published/?start=${searchInput.firstDay}&end=${searchInput.toDays}&limit=${limit}&page=${pageCount}`,
          { cancelToken: source.token, headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.images?.length > 0) {
            setAllPublishProduct(data?.images);
            setTotalProduct(data?.total);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Published product", error);
          if (error.response.status === 401) {
            expiredLoginTime();
            console.log("Published file", error);
          }
        });
    }

    return () => source.cancel();
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
