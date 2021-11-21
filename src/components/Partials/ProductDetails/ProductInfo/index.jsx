import { Button, ClickAwayListener, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import authorPhoto from "../../../../assets/author.png";
import copyIcon from "../../../../assets/icons/copy.svg";
import shareIcon from "../../../../assets/icons/share.svg";
import { getBaseURL } from "../../../../helpers";
import DownloadButton from "./DownloadButton/index";
import FavouriteButton from "./FavouriteButton/index";
import FollowButton from "./FollowButton/index,";
import useStyles from "./ProductInfo.styles";

const ProductInfo = ({ productDetails }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [openCopyLink, setOpenCopyLink] = useState(false);

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

  return (
    <>
      <div className={classes.productDetails}>
        <Typography className={classes.title} variant="h2">
          {productDetails?.imageDetails?.title}
        </Typography>

        <div className={classes.buttons}>
          <Typography className={classes.creationDate}>{productDetails?.imageDetails?.creation_ago}</Typography>
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
                <Button className={classes.button} onClick={() => handleCopyUrl()}>
                  <img className={classes.buttonIcon} src={copyIcon} alt="Copy Link" />
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
                {productDetails?.imageDetails?.extension === ("jpg" || "png" || "jpeg") ? "Photo" : productDetails?.imageDetails?.extension?.toUpperCase()}
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
              <Link to={`/author/${productDetails?.imageDetails?.user?.username}`}>
                {productDetails?.imageDetails?.user?.avatar ? (
                  <img
                    className={classes.authorImg}
                    src={getBaseURL().bucket_base_url + "/" + productDetails?.imageDetails?.user?.avatar}
                    alt={productDetails?.imageDetails?.user?.username}
                  />
                ) : (
                  <img className={classes.authorImg} src={authorPhoto} alt={productDetails?.imageDetails?.user?.username} />
                )}
              </Link>

              <div>
                <Typography className={classes.profileName} variant="h3" component={Link} to={`/author/${productDetails?.imageDetails?.user?.username}`}>
                  {productDetails?.imageDetails?.user?.username}
                </Typography>
                <Typography className={classes.resourceInfo} variant="body2">
                  {productDetails?.imageDetails?.user?.total_resources} Resources
                </Typography>
              </div>
            </div>

            {/* Follow button */}
            <FollowButton productDetails={productDetails} />
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
          <DownloadButton productDetails={productDetails} />

          <FavouriteButton productDetails={productDetails} />
        </div>
      </div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <div className={classes.socialShareWrapper}>
          <DialogTitle className={classes.socialShareTitle}>{"Use image social link"}</DialogTitle>

          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
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
            <PinterestShareButton url={productDetails?.shareUrl} media={productDetails?.imageLink}>
              <PinterestIcon size={40} style={{ margin: "0.4rem" }} round={true} />
            </PinterestShareButton>

            <EmailShareButton url={productDetails?.shareUrl}>
              <EmailIcon size={40} style={{ margin: "0.4rem" }} round={true} />
            </EmailShareButton>

            <FacebookShareButton url={productDetails?.shareUrl}>
              <FacebookIcon size={40} style={{ margin: "0.4rem" }} round={true} />
            </FacebookShareButton>

            <FacebookMessengerShareButton url={productDetails?.shareUrl}>
              <FacebookMessengerIcon size={40} style={{ margin: "0.4rem" }} round={true} />
            </FacebookMessengerShareButton>

            <TwitterShareButton url={productDetails?.shareUrl}>
              <TwitterIcon size={40} style={{ margin: "0.4rem" }} round={true} />
            </TwitterShareButton>

            <LinkedinShareButton url={productDetails?.shareUrl}>
              <LinkedinIcon size={40} style={{ margin: "0.4rem" }} round={true} />
            </LinkedinShareButton>

            <TelegramShareButton url={productDetails?.shareUrl}>
              <TelegramIcon size={40} style={{ margin: "0.4rem" }} round={true} />
            </TelegramShareButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductInfo;
