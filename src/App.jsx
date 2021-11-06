import { ThemeProvider } from "@material-ui/core/styles";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import Sellers from "./pages/Sellers";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import theme from "./components/ui/Theme";
import Home from "./pages/Home";

const Publish = lazy(() => import("./pages/Dashboard/Contributor/Publish"));
const RejectFiles = lazy(() =>
  import("./pages/Dashboard/Contributor/RejectFiles")
);
const Revision = lazy(() => import("./pages/Dashboard/Contributor/Revision"));
const UploadFiles = lazy(() =>
  import("./pages/Dashboard/Contributor/UploadFiles")
);
const UserProfile = lazy(() => import("./pages/Dashboard/User/UserProfile"));
const PendingFiles = lazy(() =>
  import("./pages/Dashboard/Contributor/PendingFiles")
);
const JoinNow = lazy(() => import("./pages/Dashboard/Contributor/JoinNow"));
const EarningManagement = lazy(() =>
  import("./pages/Dashboard/Contributor/EarningManagement")
);
const ContributorPricePlan = lazy(() =>
  import("./pages/Dashboard/Contributor/ContributorPricePlan")
);
const AccountSettings = lazy(() =>
  import("./pages/Dashboard/Contributor/AccountSettings")
);
const AdminDashboard = lazy(() =>
  import("./pages/Dashboard/Contributor/AdminDashboard")
);
const SingleBlogPost = lazy(() => import("./pages/SingleBlogPost"));
const Category = lazy(() => import("./pages/Category"));
const ConfirmSignup = lazy(() =>
  import("./pages/Authentication/ConfirmSignup")
);
const Contact = lazy(() => import("./pages/Contact"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const CopyrightInfo = lazy(() => import("./pages/CopyrightInfo"));
const Help = lazy(() => import("./pages/Help"));
const LicenseAgreement = lazy(() => import("./pages/LicenseAgreement"));
const Login = lazy(() => import("./pages/Authentication/Login"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PopularImages = lazy(() => import("./pages/PopularImages"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Recent = lazy(() => import("./pages/Recent"));
const Registration = lazy(() => import("./pages/Authentication/Registration"));
const ResetPassword = lazy(() =>
  import("./pages/Authentication/ResetPassword")
);
const Support = lazy(() => import("./pages/Support"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const TrendingSearch = lazy(() => import("./pages/TrendingSearch"));
const AuthorProfile = lazy(() => import("./pages/AuthorProfile"));
const Categories = lazy(() => import("./pages/Categories"));
const GuidLine = lazy(() => import("./pages/GuidLine"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const SingleProductDetails = lazy(() => import("./pages/SingleProductDetails"));
const Subscription = lazy(() => import("./pages/Subscription"));
const TagRelatedProducts = lazy(() => import("./pages/TagRelatedProducts"));
const DeviceActivity = lazy(() =>
  import("./pages/Dashboard/User/DeviceActivity")
);
const DownloadItems = lazy(() =>
  import("./pages/Dashboard/User/DownloadItems")
);
const FavoriteItems = lazy(() =>
  import("./pages/Dashboard/User/FavoriteItems")
);
const UserFollowing = lazy(() =>
  import("./pages/Dashboard/User/UserFollowing")
);
const UserSubscription = lazy(() =>
  import("./pages/Dashboard/User/UserSubscription")
);
const AboutUs = lazy(() => import("./pages/AboutUs"));
const AllBlogs = lazy(() => import("./pages/AllBlogs"));
const CompleteRegistration = lazy(() =>
  import("./pages/Authentication/EmailVerification")
);

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

        <Suspense fallback={<LinearProgress />}>
          {/* Contributor Dashboard */}
          <Route
            exact
            path="/contributor/dashboard"
            component={AdminDashboard}
          />
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
          <Route
            exact
            path="/contributor/settings"
            component={AccountSettings}
          />
          <Route exact path="/contributor/join" component={JoinNow} />

          {/* User Dashboard */}
          <PrivateRoute exact path="/user/profile" component={UserProfile} />
          <PrivateRoute
            exact
            path="/user/favorites"
            component={FavoriteItems}
          />
          <PrivateRoute
            exact
            path="/user/downloads"
            component={DownloadItems}
          />
          <PrivateRoute
            exact
            path="/user/following"
            component={UserFollowing}
          />
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
          <Route
            exact
            path="/images/popular-images"
            component={PopularImages}
          />

          <Route exact path="/search/:keywords" component={SearchResults} />
          <Route exact path="/allBlogs/blogs" component={AllBlogs} />
          <Route exact path="/blog/:id" component={SingleBlogPost} />
          <Route exact path="/tag/:tagName" component={TagRelatedProducts} />
          <Route exact path="/author/:username" component={AuthorProfile} />
          <Route exact path="/category/:catName" component={Category} />
          <Route exact path="/images/:id" component={SingleProductDetails} />
        </Suspense>

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
