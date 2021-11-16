import {
  Button,
  ClickAwayListener,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { toast } from "react-toastify";
import authorPhoto from "../../../../assets/author.png";
import copyIcon from "../../../../assets/icons/copy.svg";
import downArrowIconWhite from "../../../../assets/icons/downArrowIconWhite.svg";
import likeIcon from "../../../../assets/icons/likeIcon.svg";
import shareIcon from "../../../../assets/icons/share.svg";
import { getBaseURL } from "../../../../helpers";
import SignUpModal from "../../../../pages/Authentication/SignUpModal";
import useStyles from "./ProductInfo.styles";

const ProductInfo = ({ productDetails }) => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [downloadCount, setDownloadCount] = useState();
  const [openCopyLink, setOpenCopyLink] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleCopyUrl = (e) => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess("Copied successfully!");
    setOpenCopyLink(true);
  };

  const handleTooltipClose = () => {
    setOpenCopyLink(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Handle follow author
  const handleFollower = (e) => {
    // productDetails?.setLoading(true);
    if (!user?.isLoggedIn && window.innerWidth > 900) {
      setRole(e.target.closest("button").value);
      setOpenAuthModal(true);
    } else if (!user?.isLoggedIn && window.innerWidth < 900) {
      history.push(`/login?user`);
    } else if (
      user?.id !== productDetails?.imageDetails?.user_id &&
      user &&
      user?.isLoggedIn &&
      user?.role === "user"
    ) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/contributor/followers/${productDetails?.imageDetails?.user_id}`,
          {},
          { headers: { Authorization: user?.token } }
        )
        .then((response) => {
          if (response?.status === 200) {
            productDetails?.setFollowing(!productDetails?.isFollowing);
            productDetails?.setLoading(false);
          }
        })
        .catch((error) => console.log("Followers error: ", error));
    } else {
      if (user?.isLoggedIn && user?.role === "contributor") {
        toast.error("Please, login as a user", { autoClose: 2200 });
      } else {
        // setOpenAuthModal(true);
        toast.error("You can't follow yourself", { autoClose: 2000 });
      }
    }
  };

  //Handle like image
  const handleLikeBtn = (e) => {
    if (!user?.isLoggedIn && window.innerWidth > 900) {
      setRole(e.target.closest("button").value);
      setOpenAuthModal(true);
    } else if (!user?.isLoggedIn && window.innerWidth < 900) {
      history.push(`/login?user`);
    } else if (
      user?.id !== productDetails?.imageDetails?.user_id &&
      user &&
      user?.isLoggedIn &&
      user?.role === "user"
    ) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/images/${productDetails?.imageID}/like`,
          {},
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            productDetails?.setLike(true);
            productDetails?.setLoading(false);
          } else if (!data?.status) {
            toast.error(data.message);
            productDetails?.setLike(true);
            productDetails?.setLoading(false);
          } else {
            console.log("Something wrong with the like");
            productDetails?.setLoading(false);
          }
        })
        .catch((error) => console.log("Like error: ", error));
    } else {
      if (user?.isLoggedIn && user?.role === "contributor") {
        toast.error("Please, login as a user", { autoClose: 2200 });
      } else {
        toast.error("You can't like yourself", { autoClose: 2000 });
      }
    }
  };

  //Handle download image
  const handleDownload = (e) => {
    setButtonLoading(true);

    const downloadAPI = {
      url: `${process.env.REACT_APP_API_URL}/images/${productDetails?.imageID}/download/`,
      method: "get",
    };

    if (user && user?.isLoggedIn) {
      if (user?.role === "user") {
        downloadAPI.headers = { Authorization: user?.token };
        setButtonLoading(false);
      } else {
        setRole(e.target.closest("button").value);
        setOpenAuthModal(true);
        setButtonLoading(false);
        return;
      }
    }

    axios(downloadAPI)
      .then(({ data }) => {
        if (data?.url) {
          const link = document.createElement("a");
          link.href = data?.url;
          link.setAttribute(
            "download",
            `${productDetails?.imageDetails?.title.replace(/\s/g, "-")}.${
              data?.extension
            }`
          );
          document.body.appendChild(link);
          link.click();

          const prevState =
            productDetails?.imageDetails?.user?.images?.total_downloads;
          setDownloadCount(prevState + 1);
          setButtonLoading(false);
        }
      })
      .catch((error) => {
        if (user?.isLoggedIn && user?.role === "contributor") {
          toast.error("Please, login as a user", { autoClose: 2200 });
          setButtonLoading(false);
        } else if (user?.isLoggedIn && user?.role === "user") {
          toast.error(error.response.data.message, { autoClose: 2000 });
          setButtonLoading(false);
        } else {
          toast.error(error.response.data.message, { autoClose: 2000 });
          setRole(e.target.closest("button").value);
          setOpenAuthModal(true);
          setButtonLoading(false);
        }
      });
  };

  const intToString = (value) => {
    var suffixes = ["", "k", "m", "b", "t"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = parseFloat(
      (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(
        2
      )
    );
    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
  };

  return (
    <>
      <div className={classes.productDetails}>
        <Typography className={classes.title} variant="h2">
          {productDetails?.imageDetails?.title}
        </Typography>

        <div className={classes.buttons}>
          <Typography className={classes.creationDate}>
            {productDetails?.imageDetails?.creation_ago}
          </Typography>
          <Button className={classes.button} onClick={handleClickOpen}>
            <img className={classes.buttonIcon} src={shareIcon} alt="Share" />
            Share
          </Button>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openCopyLink}
                placement="top"
                arrow
                leaveDelay={1500}
                title="Copied successfully!"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  className={classes.button}
                  onClick={() => handleCopyUrl()}
                >
                  <img
                    className={classes.buttonIcon}
                    src={copyIcon}
                    alt="Copy Link"
                  />
                  Copy Link
                </Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
        </div>

        <Grid container className={classes.detailsContainer}>
          <Grid item xs={6} className={classes.gridItem}>
            <div className={classes.singleItem}>
              <Typography>
                <strong>Image ID: </strong>
                {productDetails?.imageDetails?.id}
              </Typography>
              {/* <Typography>
              <strong>Image Size </strong>
              {productDetails?.imageDetails?.height} x{" "}
              {productDetails?.imageDetails?.width}
            </Typography> */}
              <Typography>
                <strong>File Format: </strong>{" "}
                {productDetails?.imageDetails?.extension ===
                ("jpg" || "png" || "jpeg")
                  ? "Photo"
                  : productDetails?.imageDetails?.extension?.toUpperCase()}
              </Typography>
            </div>
            <div className={classes.singleItem}>
              <Typography>
                <strong>Copyright Information: </strong>
                <br />
                Piktask
              </Typography>
            </div>
          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <div className={classes.singleItem}>
              <Typography>
                <strong>Created: </strong>
                {moment(productDetails?.imageDetails?.createdAt).format("LL")}
              </Typography>
              <Typography>
                <strong>Category: </strong>
                {productDetails?.imageDetails?.category?.name}
              </Typography>
            </div>
            <div className={classes.singleItem}>
              <Typography>
                <strong>Scope of authorization: </strong>
                personal/enterprise
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item className={classes.authorArea}>
            <div className={classes.authorProfile}>
              <Link
                to={`/author/${productDetails?.imageDetails?.user?.username}`}
              >
                {productDetails?.imageDetails?.user?.avatar ? (
                  <img
                    className={classes.authorImg}
                    src={
                      getBaseURL().bucket_base_url +
                      getBaseURL().profiles +
                      productDetails?.imageDetails?.user?.avatar
                    }
                    alt={productDetails?.imageDetails?.user?.username}
                  />
                ) : (
                  <img
                    className={classes.authorImg}
                    src={authorPhoto}
                    alt="AuthorPhoto"
                  />
                )}
              </Link>

              <div>
                <Typography
                  className={classes.profileName}
                  variant="h3"
                  component={Link}
                  to={`/author/${productDetails?.imageDetails?.user?.username}`}
                >
                  {productDetails?.imageDetails?.user?.username}
                </Typography>
                <Typography className={classes.resourceInfo} variant="body2">
                  {productDetails?.imageDetails?.user?.total_resources}{" "}
                  Resources
                </Typography>
              </div>
            </div>
            {user?.id !== productDetails?.imageDetails?.user_id && (
              <Button
                className={`${classes.authorBtn} ${classes.followBtn}`}
                onClick={handleFollower}
                value="user"
              >
                {!productDetails?.isFollowing ? <>Follow</> : <>Following</>}
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Typography>Share: </Typography>
            <div>author</div>
          </Grid>
        </Grid>

        {/* <div className={classes.premiumInfo}>
                <Typography variant="h4">
                  Premium User:
                  <Button
                    className={classes.premiumViewBtn}
                    component={Link}
                    to={`/subscription`}
                  >
                    View Plans
                  </Button>
                </Typography>
                <Typography>- High-Speed Unlimited Download</Typography>
                <Typography>
                  - For commercial use{" "}
                  <Link to="!#" className={classes.moreInfoBtn}>
                    More info
                  </Link>
                </Typography>
                <div>
                  <div className={classes.licenseButton}>
                    <Typography>Images license agreement</Typography>
                    <Button
                      className={classes.licenseBtn}
                      onClick={handleDialogOpen}
                    >
                      Download License
                    </Button>
                  </div>
                  <Dialog
                    className={classes.licenseDialog}
                    open={downloadLicenseDialog}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle className={classes.licenseTitle}>
                      {"Piktast License"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means
                        sending anonymous location data to Google, even when no
                        apps are running.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleDialogClose}
                        color="primary"
                        autoFocus
                      >
                        Download
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <Typography>&copy; Copyright : Piktask</Typography>
              </div> */}

        <div className={classes.buttonGroup}>
          <div className={classes.downloadWrapper}>
            <Button
              className={
                buttonLoading ? classes.downloadingBtn : classes.downloadBtn
              }
              onClick={handleDownload}
              value="user"
              disableElevation
              disabled={buttonLoading}
            >
              <img src={downArrowIconWhite} alt="Download" />
              {buttonLoading ? "Downloading..." : "Download"}
            </Button>
            {/* 
                    {buttonLoading ? (
                    ) : (
                      <Button
                        className={classes.downloadBtn}
                        onClick={handleDownload}
                        value="user"
                      >
                        <img src={downArrowIconWhite} alt="Download" />
                        Download
                      </Button> */}
            <div className={classes.downloadedImage}>
              {downloadCount
                ? intToString(downloadCount)
                : intToString(
                    productDetails?.imageDetails?.user?.images?.total_downloads
                  )}
            </div>
          </div>

          {user?.id !== productDetails?.imageDetails?.user_id && (
            <>
              {!productDetails?.isLike ? (
                <Button
                  className={classes.likeBtn}
                  onClick={handleLikeBtn}
                  value="user"
                >
                  <img src={likeIcon} alt="like Button" />
                </Button>
              ) : (
                <Tooltip
                  title="You already liked the image."
                  placement="top"
                  arrow
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button className={classes.likedBtn} onClick={handleLikeBtn}>
                    <FavoriteIcon />
                  </Button>
                </Tooltip>
              )}
            </>
          )}
        </div>
      </div>
      <SignUpModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        role={role}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div className={classes.socialShareWrapper}>
          <DialogTitle className={classes.socialShareTitle}>
            {"Use image social link"}
          </DialogTitle>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent dividers>
          <div
            style={{
              padding: "2rem",
              minWidth: "300px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <PinterestShareButton
              url={productDetails?.shareUrl}
              media={productDetails?.imageLink}
            >
              <PinterestIcon
                size={40}
                style={{ margin: "0.4rem" }}
                round={true}
              />
            </PinterestShareButton>

            <EmailShareButton url={productDetails?.shareUrl}>
              <EmailIcon size={40} style={{ margin: "0.4rem" }} round={true} />
            </EmailShareButton>

            <FacebookShareButton url={productDetails?.shareUrl}>
              <FacebookIcon
                size={40}
                style={{ margin: "0.4rem" }}
                round={true}
              />
            </FacebookShareButton>

            <FacebookMessengerShareButton url={productDetails?.shareUrl}>
              <FacebookMessengerIcon
                size={40}
                style={{ margin: "0.4rem" }}
                round={true}
              />
            </FacebookMessengerShareButton>

            <TwitterShareButton url={productDetails?.shareUrl}>
              <TwitterIcon
                size={40}
                style={{ margin: "0.4rem" }}
                round={true}
              />
            </TwitterShareButton>

            <LinkedinShareButton url={productDetails?.shareUrl}>
              <LinkedinIcon
                size={40}
                style={{ margin: "0.4rem" }}
                round={true}
              />
            </LinkedinShareButton>

            <TelegramShareButton url={productDetails?.shareUrl}>
              <TelegramIcon
                size={40}
                style={{ margin: "0.4rem" }}
                round={true}
              />
            </TelegramShareButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductInfo;
