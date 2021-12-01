import { makeStyles } from "@material-ui/core";
import pricePlanBanner from "../../../../assets/banner/contributorBG.jpg";

const useStyles = makeStyles((theme) => ({
  adminRoot: {
    // display: "flex",
  },
  adminSidebar: {
    marginTop: "0rem",
    [theme.breakpoints.down(769)]: {
      display: "none",
    },
  },
  content: {
    padding: 0,
    marginLeft: "28rem",
    [theme.breakpoints.down(769)]: {
      width: "100%",
      marginLeft: "0rem",
    },
  },
  pricePlanGridContainer: {
    marginTop: "10rem",
    margin: "2rem",
  },
  pricePlanBanner: {
    backgroundImage: `url(${pricePlanBanner})`,
    backgroundPosition: "center",
    padding: "100px 0",
    borderRadius: "1rem",
  },
  priceInfo: {
    padding: "5rem 0",
    textAlign: "center",
    "& p": {
      fontSize: "1.5rem",
      paddingBottom: "1rem",
    },
  },
  detailsBtn: {
    padding: "0.2rem 3.5rem",
    backgroundColor: "#0088f2",
    color: "#fff",
    border: ".2rem solid",
    borderColor: "#0088f2",
    marginRight: "1rem",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#0773c5",
      borderColor: "#0773c5",
      color: "#fff",
    },
  },
}));

export default useStyles;
