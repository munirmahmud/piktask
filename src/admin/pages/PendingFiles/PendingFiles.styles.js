import { makeStyles } from "@material-ui/core";

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
    marginRight: "0rem",
    marginTop: "6rem",
    [theme.breakpoints.down(769)]: {
      width: "100%",
      marginLeft: "0rem",
    },
  },
  dashboardGridContainer: {
    // padding: "1.5rem 1rem 1rem 1rem",
    padding: "2rem",
  },
  headingWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "2rem",
    marginBottom: "4.5rem",

    "@media (max-width: 990px)": {
      flexDirection: "column",
      alignItems: "flex-start",

      "& h2": {
        marginBottom: "1.5rem",
      },
    },
  },
  actionBtn: {
    ...theme.typography.button,
    padding: ".2rem 2rem",
    backgroundColor: theme.palette.primary.main,
    marginLeft: "1rem",
    border: ".2rem solid",
    borderColor: "transparent",
    fontWeight: 500,
    fontSize: "1.6rem",

    "@media (max-width: 990px)": {
      marginBottom: "1.5rem",
      padding: ".4rem 2rem",
      fontSize: "1.4rem",
    },
  },
  deleteBtn: {
    backgroundColor: "#FB5252",
    "&:hover": {
      borderColor: "#FB5252",
      color: "#FB5252",
    },

    "@media (max-width: 990px)": {
      marginLeft: 0,
    },
  },
  addFileBtn: {
    "&:hover": {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
  },
  workInfoBtn: {
    backgroundColor: "#EF9D38",
    "&:hover": {
      borderColor: "#EF9D38",
      color: "#EF9D38",
    },
  },

  pendingFileCard: {
    position: "relative",
    padding: "3.5rem 3rem 0",
    "& img": {
      width: "100%",
      borderRadius: theme.shape.borderRadius,
      // objectFit: "cover",
    },
    "& h3": {
      fontSize: "1.4rem",
      marginBottom: "1rem",
    },
    "& p": {
      fontSize: "1.2rem",
    },
  },
  deleteIcon: {
    color: "#DDD",
    position: "absolute",
    top: ".8rem",
    right: ".8rem",
    border: ".1rem solid",
    borderColor: "#DDDDDD",
    padding: ".1rem",
    fontSize: "2.2rem",
    cursor: "pointer",
    transition: `all .3s ${theme.transitions.easing.easeInOut}`,

    "&:hover": {
      borderColor: "#FB5252",
      color: "#FB5252",
    },
  },
  noItemsFound: {
    marginLeft: "1.5rem",
  },

  editItemContainer: {
    width: "55rem",
    padding: "3rem 4.5rem",

    "@media (max-width: 600px)": {
      width: "100%",
    },
  },

  editItemHeader: {
    padding: "2rem 4rem 0",
    "& hr": {
      border: "0 solid transparent",
      backgroundColor: "#ddd",
      height: "0.1rem",
    },
  },
  headingContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  closeIcon: {
    cursor: "pointer",
    fontSize: "3.5rem",
    color: "#B7B7B7",
    "&:hover": {
      color: "#FB5252",
    },
  },
}));

export default useStyles;
