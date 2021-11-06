import { ThemeProvider } from "@material-ui/core/styles";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AccountSettings from "./admin/pages/AccountSettings";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ContributorPricePlan from "./admin/pages/ContributorPricePlan";
import EarningManagement from "./admin/pages/EarningManagement";
import JoinNow from "./admin/pages/JoinNow";
import PendingFiles from "./admin/pages/PendingFiles";
// import Sellers from "./pages/Sellers";
import Publish from "./admin/pages/Publish";
import RejectFiles from "./admin/pages/RejectFiles";
import Revision from "./admin/pages/Revision";
import UploadFiles from "./admin/pages/UploadFiles";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import theme from "./components/ui/Theme";
import {
  AboutUs,
  Category,
  ConfirmSignup,
  Contact,
  CookiesPolicy,
  CopyrightInfo,
  Help,
  LicenseAgreement,
  Login,
  NotFoundPage,
  PopularImages,
  Pricing,
  Recent,
  Registration,
  ResetPassword,
  Support,
  TermsConditions,
  TrendingSearch,
} from "./pages";
import AllBlogs from "./pages/AllBlogs";
import CompleteRegistration from "./pages/Authentication/EmailVerification";
import AuthorProfile from "./pages/AuthorProfile";
import Categories from "./pages/Categories";
import GuidLine from "./pages/GuidLine";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SingleBlogPost from "./pages/SingleBlogPost";
import SingleProductDetails from "./pages/SingleProductDetails";
import Subscription from "./pages/Subscription";
import TagRelatedProducts from "./pages/TagRelatedProducts";
import DeviceActivity from "./userDashboard/pages/DeviceActivity";
import DownloadItems from "./userDashboard/pages/DownloadItems";
import FavoriteItems from "./userDashboard/pages/FavoriteItems";
import UserFollowing from "./userDashboard/pages/UserFollowing";
import UserProfile from "./userDashboard/pages/UserProfile";
import UserSubscription from "./userDashboard/pages/UserSubscription";

const App = () => {
  const dispatch = useDispatch();
  const [isDataLoaded, setDataLoaded] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Check username/password auth state
    const setUserToken = window.localStorage.getItem("token") || "";
    const avatar = window.localStorage.getItem("profileImage") || "";
    if (setUserToken) {
      const decode = jwt_decode(setUserToken.split(" ")[1]);
      if (decode.email) {
        dispatch({
          type: "SET_USER",
          payload: {
            ...decode,
            token: setUserToken,
            avatar: avatar,
          },
        });
      }
    }

    // Popular categories API integration
    axios
      .get(`${process.env.REACT_APP_API_URL}/categories/popular`)
      .then(({ data }) => {
        if (data?.status) {
          dispatch({
            type: "POPULAR_CATEGORIES",
            payload: [...data.categories],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Author last file API
    // if (user?.token) {
    //   axios
    //     .get(`${process.env.REACT_APP_API_URL}/contributor/earning/images`, {
    //       headers: { Authorization: user?.token },
    //     })
    //     .then(({ data }) => {
    //       if (data?.status) {
    //         dispatch({
    //           type: "TOTAL_IMAGE_EARNING",
    //           payload: [...data?.images],
    //         });
    //       }
    //     });
    // }

    // Product Base url API
    axios
      .get(`${process.env.REACT_APP_API_URL}/client/urls`)
      .then(({ data }) => {
        if (data?.status) {
          localStorage.setItem("imageBaseURL", JSON.stringify(data.urls));
          setDataLoaded(false);
        }
      });
  }, [dispatch]);

  return isDataLoaded ? (
    <LinearProgress />
  ) : (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* Contributor Dashboard */}
        <Route exact path="/contributor/dashboard" component={AdminDashboard} />
        <Route exact path="/contributor/upload" component={UploadFiles} />
        <Route exact path="/contributor/pending" component={PendingFiles} />
        <Route exact path="/contributor/revision" component={Revision} />
        <Route exact path="/contributor/reject" component={RejectFiles} />
        <Route exact path="/contributor/publish" component={Publish} />
        <Route
          exact
          path="/contributor/earnings"
          component={EarningManagement}
        />
        <Route
          exact
          path="/contributor/contributorPricePlan"
          component={ContributorPricePlan}
        />
        <Route exact path="/contributor/guidLine" component={GuidLine} />
        <Route exact path="/contributor/settings" component={AccountSettings} />
        <Route exact path="/contributor/join" component={JoinNow} />

        {/* User Dashboard */}
        <PrivateRoute exact path="/user/profile" component={UserProfile} />
        <PrivateRoute exact path="/user/favorites" component={FavoriteItems} />
        <PrivateRoute exact path="/user/downloads" component={DownloadItems} />
        <PrivateRoute exact path="/user/following" component={UserFollowing} />
        <PrivateRoute exact path="/user/devices" component={DeviceActivity} />
        <PrivateRoute
          exact
          path="/user/subscription"
          component={UserSubscription}
        />

        {/* Footer pages */}
        <Route exact path="/termsConditions" component={TermsConditions} />
        <Route exact path="/licenseAgreement" component={LicenseAgreement} />
        <Route exact path="/copyrightInformation" component={CopyrightInfo} />
        <Route exact path="/cookiesPolicy" component={CookiesPolicy} />
        <Route exact path="/aboutUs" component={AboutUs} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/contact" component={Contact} />

        {/* Category pages */}
        <Route exact path="/vector" component={Category} />
        <Route exact path="/psd" component={Category} />
        <Route exact path="/photos" component={Category} />
        <Route exact path="/background" component={Category} />
        <Route exact path="/template" component={Category} />
        <Route exact path="/png" component={Category} />

        <Route exact path="/category" component={Category} />
        <Route exact path="/pricing" component={Pricing} />
        <Route exact path="/help" component={Help} />

        {/* Authentication Route */}
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/confirm-signup" component={ConfirmSignup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/email/verify" component={CompleteRegistration} />

        {/* Subscription page */}
        <Route exact path="/subscription" component={Subscription} />
        {/* <Route exact path="/sellers" component={Sellers} /> */}
        <Route exact path="/categories" component={Categories} />
        <Route
          exact
          path="/search/trending-search"
          component={TrendingSearch}
        />

        {/* Recent or Popular pages */}
        <Route exact path="/recentImage/recent-images" component={Recent} />
        <Route exact path="/images/popular-images" component={PopularImages} />

        <Route exact path="/search/:keywords" component={SearchResults} />
        <Route exact path="/allBlogs/blogs" component={AllBlogs} />
        <Route exact path="/blog/:id" component={SingleBlogPost} />
        <Route exact path="/tag/:tagName" component={TagRelatedProducts} />
        <Route exact path="/author/:username" component={AuthorProfile} />
        <Route exact path="/category/:catName" component={Category} />
        <Route exact path="/images/:id" component={SingleProductDetails} />

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
