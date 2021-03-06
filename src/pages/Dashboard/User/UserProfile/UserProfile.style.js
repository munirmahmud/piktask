import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  headingWrapper: {
    display: "flex",
    marginBottom: "2.5rem",
    justifyContent: "space-between",
    [theme.breakpoints.down(426)]: {
      display: "block",
    },
  },
  portfolioHeadingWrapper: {
    marginBottom: "2.5rem",
    justifyContent: "space-between",
  },
  socialHeadingWrapper: {
    marginBottom: "2.5rem",
    justifyContent: "space-between",
  },
  socialsButtons: {
    display: "flex",
    alignItems: "center",
    paddingRight: "3rem",
    [theme.breakpoints.down(426)]: {
      justifyContent: "center",
      padding: "0",
    },
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 3rem",
    border: "1px solid #C74C37",
    borderRadius: "4px",
    color: "#fff",
    backgroundColor: "#C74C37",
    transition: "all 0.3s linear",
    "& span": {
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: "#ab311d",
    },
  },
  googleIcon: {
    color: "#fff",
    fontSize: "1.7rem",
    marginRight: "0.8rem",
  },
  facebookBtn: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 2rem",
    border: "1px solid #425993",
    borderRadius: "4px",
    color: "white",
    backgroundColor: "#425993",
    transition: "all 0.3s linear",
    "& span": {
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: "#213567",
    },
  },
  facebookIconBtn: {
    color: "white",
    fontSize: "1.7rem",
    marginRight: "0.8rem !important",
  },
  separator: {
    borderWidth: 0,
    marginLeft: "3%",
    width: "94%",
    height: ".1rem",
    backgroundColor: "rgb(112 112 112 / 38%)",
  },
  settingsFormTitle: {
    color: "#114960",
    fontWeight: 700,
    padding: "3rem",
    [theme.breakpoints.down(426)]: {
      padding: "1.5rem 2.5rem",
    },
  },
  profileInfoField: {
    padding: "2rem",
    [theme.breakpoints.down(426)]: {
      padding: "1.5rem",
    },
  },
  personalDataField: {
    padding: "1rem",
  },
  formControl: {
    marginBottom: "1rem",
  },
  userProfileRoot: {
    backgroundColor: "white",
  },
  cardWrapper: {
    padding: ".6rem 2rem 0rem",
  },
  personalInfoTitle: {
    color: "#114960",
    fontWeight: 700,
    padding: "0 0 2rem 1rem",
  },
  accountInfoTitle: {
    color: "#114960",
    fontWeight: 700,
    padding: "0 0 2rem 1rem",
  },
  cardRoot: {
    paddingBottom: "1rem",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 10%)",
  },

  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
  fieldsGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2rem",
    "& legend": {
      display: "none",
      width: 0,
      height: 0,
    },

    "@media (max-width: 960px)": {
      width: "100%",
      flexDirection: "column",
      marginBottom: "2rem",
    },
  },
  linkField: {
    "@media (max-width: 960px)": {
      marginBottom: "inherit",
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
  fullWidth: {
    marginBottom: "1rem",
    marginRight: "1rem",
    marginLeft: "1rem",
    "@media (max-width: 960px)": {
      marginBottom: "2rem",
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
  inputField: {
    "& label": {
      color: "#B5B5B5",
      fontSize: "1.6rem",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, 2px) scale(0.90)",
      backgroundColor: "transparent",
    },
  },
  numberWrapper: {
    display: "flex",
    "& legend": {
      display: "none",
      width: 0,
      height: 0,
    },
    "@media (max-width: 960px)": {
      width: "100%",
      flexDirection: "column",
      marginBottom: "2rem",
    },
  },
  telephoneNumber: {
    marginLeft: "1rem",
  },
  dataChangeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down(426)]: {
      flexDirection: "column",
    },
  },
  inputImage: {
    position: "relative",
    "& img": {
      position: "absolute",
      right: "1rem",
      top: 0,
    },
  },
  passwordResetLink: {
    fontSize: 17,
    color: "#959595",
    textAlign: "center",
    display: "block",
    textDecoration: "none",
    transition: "all 0.3s linear",
    "&:hover": {
      color: "#0088f2",
      textDecoration: "underline",
      transition: "all 0.3s linear",
    },
    "@media (max-width: 768px)": {
      top: "-.6rem",
    },
    [theme.breakpoints.down(426)]: {
      paddingBottom: "1rem",
    },
  },
  profileInfoSaveBtn: {
    height: "5.5rem",
    width: "24rem",
    color: "#fff",
    border: "0.5px solid #0088f2",
    backgroundColor: "#0088f2",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#0773c5",
    },
  },
  // Portfolio Links
  portfolioLink: {
    position: "relative",
    paddingLeft: "8rem",

    "& fieldset": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeftColor: "transparent",
    },
    [theme.breakpoints.down(769)]: {
      paddingBottom: "1.7rem",
    },
  },
  portfolioIconWrapper: {
    position: "absolute",
    left: 0,
    top: "-.5rem",
    width: "8rem",
    height: "5.85rem",
    display: "flex",
    justifyContent: "center",
    border: "1px solid rgba(0, 0, 0, 0.23)",

    "& img": {
      width: "2.5rem",
      height: "auto",
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    padding: " 0 3rem 2rem 0",
  },
  settingsBtn: {
    padding: "1rem 2rem",
    color: theme.palette.common.white,
    fontSize: "1.4rem",
    borderRadius: ".5rem",
  },
  restoreBtn: {
    backgroundColor: "#ACB0C8",
    marginRight: "2rem",
    "&:hover": {
      backgroundColor: "rgb(149 154 185)",
    },
  },
  saveBtn: {
    backgroundColor: "#0088f2",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#0773c5",
    },
  },
  selectArea: {
    "& svg": {
      width: "3rem",
      fontSize: "4rem",
      top: "5px",
    },
  },
  notification: {
    padding: "0 0 0 3rem",
    color: "#114960",
    fontWeight: 700,
    [theme.breakpoints.down(426)]: {
      padding: "1.5rem",
    },
  },
  getNews: {
    display: "flex",
    margin: "3rem",
    padding: "2rem 3rem",
    alignItems: "center",
    justifyContent: "space-between",
    border: "0.5px solid rgb(0 0 0 / 23%)",
  },
  getNewsTitle: {
    fontWeight: "500",
  },
  basicInfo: {
    backgroundColor: "#d7d7d76e",
    margin: "3rem",
    padding: "2rem",
    borderRadius: "4px",
    lineHeight: "26px",
    textAlign: "justify",
  },
  moreInfo: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#5b5bf1",
    textDecoration: "none",
  },
  lastField: {
    "@media (max-width: 960px)": {
      marginBottom: "2rem !important",
    },
  },
}));
export default useStyles;
