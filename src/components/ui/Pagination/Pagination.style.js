import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // "& button": {
    //   fontSize: "1.4rem",
    //   fontWeight: 500,
    //   borderColor: "#0088f2",
    //   color: "#0088f2",
    // },
    "& button:hover": {
      backgroundColor: "#0773c5",
      color: "#fff",
    },
    // "& button svg": {
    //   fontSize: "2.5rem",
    // },
    // "& .Mui-selected ": {
    //   backgroundColor: "#0088f2",
    //   color: "#fff",
    //   borderColor: "#0088f2",
    // },
    // "& .Mui-selected:hover ": {
    //   backgroundColor: "#0773c5",
    // },
  },
  prevButton: {
    padding: "0.4rem 3rem",
    backgroundColor: "#0088f2",
    color: "#fff",
    borderRadius: "0.2rem",
    marginRight: "1rem",
  },
  disablePreviousButton: {
    padding: "0.4rem 3rem",
    border: "2px solid #0088f2",
    color: "#0088f2",
    borderRadius: "0.2rem",
    marginRight: "1rem",
  },
  nextButton: {
    padding: "0.4rem 4.5rem",
    backgroundColor: "#0088f2",
    color: "#fff",
    borderRadius: "0.2rem",
    marginLeft: "1rem",
  },
  disableNextButton: {
    padding: "0.4rem 4.5rem",
    border: "2px solid #0088f2",
    color: "#0088f2",
    borderRadius: "0.2rem",
    marginLeft: "1rem",
  },
}));
export default useStyles;
