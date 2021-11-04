import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  pageNotFound: {
    background: "#001c30",
    height: "100vh",
  },
  pageNotFoundImg: {
    height: "60rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    [theme.breakpoints.down(426)]: {
      height: "40rem",
      width: "100%",
    },
  },
}));

export default useStyles;
