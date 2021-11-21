import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import downArrowIconWhite from "../../../../../assets/icons/downArrowIconWhite.svg";
import SignUpModal from "../../../../../pages/Authentication/SignUpModal";
import useStyles from "./DownloadButton.styles";

const DownloadButton = ({ productDetails }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const [role, setRole] = useState("");
  const [downloadCount, setDownloadCount] = useState("");
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

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
          link.setAttribute("download", `${productDetails?.imageDetails?.title.replace(/\s/g, "-")}.${data?.extension}`);
          document.body.appendChild(link);
          link.click();

          const prevState = productDetails?.imageDetails?.user?.images?.total_downloads;
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
    var shortValue = parseFloat((suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2));
    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
  };

  return (
    <>
      <div className={classes.downloadWrapper}>
        <Button
          className={buttonLoading ? classes.downloadingBtn : classes.downloadBtn}
          onClick={handleDownload}
          value="user"
          disableElevation
          disabled={buttonLoading}
        >
          <img src={downArrowIconWhite} alt="Download" />
          {buttonLoading ? "Downloading..." : "Download"}
        </Button>

        <div className={classes.downloadedImage}>
          {downloadCount ? intToString(downloadCount) : intToString(productDetails?.imageDetails?.user?.images?.total_downloads)}
        </div>
      </div>
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />
    </>
  );
};

export default DownloadButton;
