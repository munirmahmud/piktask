import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  cardMain: {
    padding: "2rem",
    borderRadius: 15,
    boxShadow: "0px 0px 10px #ddd",
    transition: "all 0.3s linear",

    "&:hover": {
      transform: "translateY(-7px)",
    },
  },
  cardHeading: {
    textAlign: "center",
  },
  cardContent: {
    padding: "3rem 2rem 1rem",

    "& p": {
      fontSize: "1.6rem",
      lineHeight: "3rem",
    },
    "& svg": {
      fontSize: "1.6rem",
      marginBottom: "-0.2rem",
      marginRight: "1.5rem",
    },
  },
  cardButton: {
    textAlign: "center",
  },
  viewPlanButton: {
    padding: "0.5rem 6rem",
    width: "100%",
    backgroundColor: "#0088f2",
    color: "#fff",
    marginTop: "2.5rem",
    border: ".2rem solid",
    borderColor: "#0088f2",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#0773c5",
      borderColor: "#0773c5",
      color: "#fff",
    },
  },
}));

export default useStyles;
