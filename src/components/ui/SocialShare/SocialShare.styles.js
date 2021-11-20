import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    // justifyContent:"center",
  },
  title: {
    color: theme.palette.common.white,
    fontSize: "1.4rem",
    fontWeight: 500,
    marginRight: "2.3rem",
    [theme.breakpoints.down(576)]: {
      marginRight: "0",
    },
  },
  socialIcon: {
    width: "2.8rem",
    marginRight: ".8rem",
  },
}));

export default useStyles;
