import { ThemeProvider } from "@material-ui/core/styles";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import Sellers from "./pages/Sellers";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import theme from "./components/ui/Theme";
import Home from "./pages/Home";

const Publish = lazy(() => import("./pages/dashboard/contributor/Publish"));
const Revision = lazy(() => import("./pages/dashboard/contributor/Revision"));
const GuidLine = lazy(() => import("./pages/dashboard/contributor/GuidLine"));
const UploadFiles = lazy(() => import("./pages/dashboard/contributor/UploadFiles"));
const RejectFiles = lazy(() => import("./pages/dashboard/contributor/RejectFiles"));
const PendingFiles = lazy(() => import("./pages/dashboard/contributor/PendingFiles"));
const AdminDashboard = lazy(() => import("./pages/dashboard/contributor/AdminDashboard"));
const AccountSettings = lazy(() => import("./pages/dashboard/contributor/AccountSettings"));
const WithdrawHistory = lazy(() => import("./pages/dashboard/contributor/WithdrawHistory"));
const EarningManagement = lazy(() => import("./pages/dashboard/contributor/EarningManagement"));
const ContributorPricePlan = lazy(() => import("./pages/dashboard/contributor/ContributorPricePlan"));

const UserProfile = lazy(() => import("./pages/dashboard/user/UserProfile"));
const FavoriteItems = lazy(() => import("./pages/dashboard/user/FavoriteItems"));
const DownloadItems = lazy(() => import("./pages/dashboard/user/DownloadItems"));
const UserFollowing = lazy(() => import("./pages/dashboard/user/UserFollowing"));
const DeviceActivity = lazy(() => import("./pages/dashboard/user/DeviceActivity"));
const UserSubscription = lazy(() => import("./pages/dashboard/user/UserSubscription"));

const SingleProductDetails = lazy(() => import("./pages/SingleProductDetails"));
const TagRelatedProducts = lazy(() => import("./pages/TagRelatedProducts"));
const LicenseAgreement = lazy(() => import("./pages/LicenseAgreement"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const TrendingSearch = lazy(() => import("./pages/TrendingSearch"));
const SingleBlogPost = lazy(() => import("./pages/SingleBlogPost"));
const AuthorProfile = lazy(() => import("./pages/AuthorProfile"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const CopyrightInfo = lazy(() => import("./pages/CopyrightInfo"));
const PopularImages = lazy(() => import("./pages/PopularImages"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Subscription = lazy(() => import("./pages/Subscription"));
const Categories = lazy(() => import("./pages/Categories"));
const Category = lazy(() => import("./pages/Category"));
const AllBlogs = lazy(() => import("./pages/AllBlogs"));
const Contact = lazy(() => import("./pages/Contact"));
const Support = lazy(() => import("./pages/Support"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Recent = lazy(() => import("./pages/Recent"));
const Help = lazy(() => import("./pages/Help"));

const Login = lazy(() => import("./pages/Authentication/Login"));
const Registration = lazy(() => import("./pages/Authentication/Registration"));
const ResetPassword = lazy(() => import("./pages/Authentication/ResetPassword"));
const ConfirmSignup = lazy(() => import("./pages/Authentication/ConfirmSignup"));
const EmailVerification = lazy(() => import("./pages/Authentication/EmailVerification"));

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isDataLoaded, setDataLoaded] = useState(true);
  const [isTokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    // Check token auth state
    const token = window.localStorage.getItem("token");
    const avatar = window.localStorage.getItem("profileImage");

    if (token) {
      const decodeToken = jwt_decode(token.split(" ")[1]);

      if (decodeToken.email) {
        dispatch({
          type: "SET_USER",
          payload: {
            ...decodeToken,
            token: token,
            avatar: avatar,
          },
        });
      }

      const expired = new Date(decodeToken.exp * 1000) - new Date();

      setTimeout(() => {
        setTokenExpired(true);
      }, expired);
    }

    // Popular categories API integration
    axios
      .get(`${process.env.REACT_APP_API_URL}/categories/popular?limit=6`)
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

    // Product Base url API
    axios.get(`${process.env.REACT_APP_API_URL}/client/urls`).then(({ data }) => {
      if (data?.status) {
        localStorage.setItem("imageBaseURL", JSON.stringify(data.urls));
        setDataLoaded(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    // Upload total count
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios.get(`${process.env.REACT_APP_API_URL}/contributor/images/total_count`, { headers: { Authorization: user?.token } }).then(({ data }) => {
        if (data?.status) {
          dispatch({
            type: "TOTAL_PRODUCT_COUNT",
            payload: { ...data },
          });
        }
      });
    }
  }, [user?.isLoggedIn, user?.role, user?.token, dispatch]);

  const tokenExpiredAndUserSignOut = () => {
    if (isTokenExpired) {
      localStorage.removeItem("token");
      return (window.location.href = "/");
    }
  };

  return isDataLoaded ? (
    <LinearProgress />
  ) : (
    <ThemeProvider theme={theme}>
      {tokenExpiredAndUserSignOut()}

      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />

        <Suspense fallback={<LinearProgress />}>
          {/* Contributor Dashboard */}
          <Route exact path="/contributor/dashboard" component={AdminDashboard} />
          <Route exact path="/contributor/upload" component={UploadFiles} />
          <Route exact path="/contributor/pending" component={PendingFiles} />
          <Route exact path="/contributor/revision" component={Revision} />
          <Route exact path="/contributor/reject" component={RejectFiles} />
          <Route exact path="/contributor/publish" component={Publish} />
          <Route exact path="/contributor/earnings" component={EarningManagement} />
          <Route exact path="/contributor/contributor-price-plan" component={ContributorPricePlan} />
          <Route exact path="/contributor/guidLine" component={GuidLine} />
          <Route exact path="/contributor/withdraw-history" component={WithdrawHistory} />
          <Route exact path="/contributor/settings" component={AccountSettings} />

          {/* User dashboard */}
          <PrivateRoute exact path="/user/profile" component={UserProfile} />
          <PrivateRoute exact path="/user/favorites" component={FavoriteItems} />
          <PrivateRoute exact path="/user/downloads" component={DownloadItems} />
          <PrivateRoute exact path="/user/following" component={UserFollowing} />
          <PrivateRoute exact path="/user/devices" component={DeviceActivity} />
          <PrivateRoute exact path="/user/subscription" component={UserSubscription} />

          {/* Footer pages */}
          <Route exact path="/termsConditions" component={TermsConditions} />
          <Route exact path="/licenseAgreement" component={LicenseAgreement} />
          <Route exact path="/copyrightInformation" component={CopyrightInfo} />
          <Route exact path="/cookiesPolicy" component={CookiesPolicy} />
          <Route exact path="/aboutUs" component={AboutUs} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/contact" component={Contact} />

          <Route exact path="/category" component={NotFoundPage} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/help" component={Help} />

          {/* Authentication Route */}
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/confirm-signup" component={ConfirmSignup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/email/verify" component={EmailVerification} />

          {/* Subscription page */}
          <Route exact path="/subscription" component={Subscription} />
          {/* <Route exact path="/sellers" component={Sellers} /> */}
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/search-key/trending-search" component={TrendingSearch} />

          {/* Recent or Popular pages */}
          <Route exact path="/recent/new-design" component={Recent} />
          <Route exact path="/images/popular-images" component={PopularImages} />

          <Route exact path="/search/:keywords" component={SearchResults} />
          <Route exact path="/allBlogs/blogs" component={AllBlogs} />
          <Route exact path="/blog/:id" component={SingleBlogPost} />
          <Route exact path="/tag/:tagName" component={TagRelatedProducts} />
          <Route exact path="/author/:username" component={AuthorProfile} />
          <Route exact path="/category/:catName" component={Category} />
          <Route exact path="/category/:catName/:id" component={SingleProductDetails} />
        </Suspense>

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
