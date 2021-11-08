import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  footerRoot: {
    backgroundColor: theme.palette.common.white,
  },
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "5rem",
    paddingTop: "5rem",
    [theme.breakpoints.down(769)]:{
      display: "none",
    },
  },
  footerWrapper: {
    // paddingLeft: "11rem !important",

    "@media (max-width: 1200px)": {
      // paddingLeft: "5rem",
    },

    "@media (max-width: 769px)": {
      marginTop: "2rem",
    },

    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
      // paddingLeft: "2rem",
      marginTop: "2rem",
    },
  },
  customFooterWrapper: {
    paddingLeft: "3rem !important",
  },
  footerHeading: {
    textTransform: "uppercase",
    marginBottom: "2.4rem",
    fontSize: "1.9rem",
  },
  socialMediaTitle: {
    textTransform: "uppercase",
    marginTop: "2.4rem",
    marginBottom: "1rem",
    fontSize: "1.9rem",
  },
  menuWrapper: {
    listStyleType: "none",
    padding: 0,
  },
  navItem: {
    padding: ".6rem 0",
    "&:first-child": {
      paddingTop: 0,
    },
  },
  navLink: {
    fontSize: "1.5rem",
    textDecoration: "none",
    color: "#27434f",
    fontWeight: 400,
    fontFamily: "'Roboto', sans-serif",
    transition: "color 0.3s linear",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.secondary.main,
    },
  },
  // mobile version
  collapseRoot:{
    backgroundColor: "#001c30",
    width: "100%",
    padding:"2rem 0rem",
    color: "#ddd",
  },
  listItemBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding:"2rem",
    borderBottom: "1px solid #023458",
    "&:last-child": {
      borderBottom: "transparent",
    },
  },
  collapseInfo: {
    backgroundColor: "#023458",
    // padding: "2rem",
  },
  collapseNavLink: {
    color: "#ddd",
    fontSize: "1.5rem",
    textDecoration: "none",
    fontWeight: 400,
    padding: "2rem 4rem 0",
    fontFamily: "'Roboto', sans-serif",
    transition: "color 0.3s linear",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.secondary.main,
    },
  },
  listItemIcon:{
    minWidth:"0 !important",
  },
  title: {
    padding: "0",
    fontSize: "1.4rem",
    fontWeight: "500",
  },
  arrowIcon: {
    width: "2em !important",
    height: "1.5em !important",
  },
}));
