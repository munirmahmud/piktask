import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  adminRoot: {
    // display: "flex",
  },
  content: {
    padding: 0,
    marginLeft: "28rem",
    [theme.breakpoints.down(769)]: {
      width: "100%",
      marginLeft: "0rem",
    },
  },
  withdrawHistoryWrapper: {
    marginTop: "10rem",
    margin: "2rem",
  },
  headingWrapper: {
    display: "flex",
    justifyContent:"space-between",
  },
  // withdrawBtn: {
  //   padding: "0.2rem 3.5rem",
  //   backgroundColor: "#0088f2",
  //   color: "#fff",
  //   border: ".2rem solid",
  //   borderColor: "#0088f2",
  //   marginRight: "1rem",
  //   transition: "all 0.3s linear",
  //   "&:hover": {
  //     backgroundColor: "#0773c5",
  //     borderColor: "#0773c5",
  //     color: "#fff",
  //   },
  // },

  publishGridContainer: {
    padding: "0rem",
  },
  loaderItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  cardRoot: {
    height: "auto",
    borderRadius: 0,
    boxShadow: "0 8px 12px 3px rgb(0 0 0 / 6%)",
  },
  productCard: {
    padding: "2rem",
  },
  // Table
  tableContainer: {
    border: 0,
    boxShadow: "none",
    borderRadius: 0,
  },
  tableHead: {
    backgroundColor: "#ECEEF5",
    "& th": {
      borderBottom: "0px solid transparent",
    },
  },
  tableCell: {
    padding: "1rem",
    fontSize: "1.6rem",
    textAlign: "left",

    "& svg": {
      marginBottom: "-0.19rem",
    },
  },
  tableRowContent: {
    "& td": {
      borderColor: "#E3E3E3",
    },

    "&:last-child td": {
      border: 0,
    },

    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default useStyles;
