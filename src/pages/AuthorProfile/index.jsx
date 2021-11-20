import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import authorImg from "../../assets/author.png";
import heroBanner from "../../assets/banner/lucas-wesney-s-y2HJElONo-unsplash.jpg";
import Spacing from "../../components/Spacing";
import AuthorItems from "../../components/ui/AuthorItems";
import CallToAction from "../../components/ui/CallToAction";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import SocialShare from "../../components/ui/SocialShare";
import { getBaseURL } from "../../helpers";
import Layout from "../../Layout";
import SignUpModal from "../Authentication/SignUpModal";
import useStyles from "./AuthorProfile.styles";

const AuthorProfile = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { username } = useParams();
  const user = useSelector((state) => state.user);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [imageSummery, setImageSummery] = useState([]);
  const [isFollowing, setFollowing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/contributor/${username}/statistics`
      )
      .then(({ data }) => {
        if (data?.status) {
          setProfileInfo(data?.profile);
          setImageSummery(data?.images_summary);
          setLoading(false);

          if (user && user?.isLoggedIn && user?.role === "user") {
            axios
              .get(
                `${process.env.REACT_APP_API_URL}/contributor/follow_status/${data.profile.id}`,
                { headers: { Authorization: user?.token } }
              )
              .then((response) => {
                if (response.data.status) {
                  setFollowing(true);
                  setLoading(false);
                } else {
                  setFollowing(false);
                  setLoading(false);
                }
              });
          }
        }
      })
      .catch((error) => {
        console.log("statistics", error);
        setLoading(false);
      });
  }, [username, user]);

  const handleJoinUsButton = () => {
    if (!user.token) {
      setOpenAuthModal(true);
    }
  };

  const handleFollower = () => {
    if (!user?.isLoggedIn && window.innerWidth > 900) {
      setOpenAuthModal(true);
    } else if (!user?.isLoggedIn && window.innerWidth < 900) {
      history.push(`/login?user`);
    } else if (user?.isLoggedIn && user?.role === "user") {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/contributor/followers/${profileInfo?.id}`,
          {},
          { headers: { Authorization: user?.token } }
        )
        .then((response) => {
          if (response?.status === 200) {
            setFollowing(!isFollowing);
          }
        })
        .catch((error) => console.log("Followers error: ", error));
    } else {
      if (user?.isLoggedIn && user?.role === "contributor") {
        toast.error("Please, login as a user", { autoClose: 2200 });
      } else {
        toast.error("You can't follow yourself", { autoClose: 2000 });
      }
    }
  };

  return (
    <Layout title={`${profileInfo?.username} | Piktask`}>
      <Header />
      <div
        className={classes.authorHero}
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <Container>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                height: 300,
              }}
            >
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              {profileInfo ? (
                <Grid container className={classes.profileWrapper}>
                  <div className={classes.authorImg}>
                    {profileInfo?.avatar ? (
                      <img
                        src={
                          getBaseURL().bucket_base_url +
                          "/" +
                          profileInfo?.avatar
                        }
                        alt={profileInfo?.username}
                      />
                    ) : (
                      <img src={authorImg} alt={profileInfo?.username} />
                    )}
                  </div>
                  <div className={classes.authorInfo}>
                    <Typography className={classes.authorName} variant="h3">
                      {profileInfo?.username}
                    </Typography>
                    <div className={classes.resourceDetails}>
                      <Typography className={classes.infoItem} variant="body2">
                        Resources
                        <span>{profileInfo?.total_images}</span>
                      </Typography>
                      <Typography className={classes.infoItem} variant="body2">
                        Followers
                        <span>{profileInfo?.total_followers}</span>
                      </Typography>
                      <Typography className={classes.infoItem} variant="body2">
                        Downloads
                        <span>{profileInfo?.total_downloads}</span>
                      </Typography>
                      {user?.id !== profileInfo?.id && (
                        <div>
                          <Button
                            className={classes.followBtn}
                            onClick={handleFollower}
                          >
                            {!isFollowing ? <>Follow</> : <>Following</>}
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className={classes.authorSocials}>
                      {(profileInfo?.facebook ||
                        profileInfo?.instagram ||
                        profileInfo?.twitter) && (
                        <SocialShare
                          title="Follow this author:"
                          profileInfo={profileInfo}
                        />
                      )}
                    </div>
                  </div>
                </Grid>
              ) : (
                <h1>No information found</h1>
              )}
            </>
          )}
        </Container>
      </div>
      <AuthorItems userId={profileInfo.id} imageSummery={imageSummery} />
      <Spacing space={{ height: "4rem" }} />
      {!user?.isLoggedIn ? (
        <CallToAction
          title="Join Piktask team"
          subtitle="Upload your first copyrighted design. Get $5 designer coupon packs"
          buttonText="Join Us"
          buttonClicked={() => handleJoinUsButton()}
        />
      ) : (
        <CallToAction
          title="Go Premium"
          subtitle="Upload your first copyrighted design. Get $5 designer coupon packs"
          buttonLink="/subscription"
          buttonText="See Plans"
        />
      )}

      {/* Sign up modal section*/}
      <SignUpModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
      />
      <Footer />
    </Layout>
  );
};

export default AuthorProfile;
