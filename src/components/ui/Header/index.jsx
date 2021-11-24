import { AppBar, Container, makeStyles, useMediaQuery } from "@material-ui/core";
import React from "react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const useStyles = makeStyles((theme) => ({
  mainHeader: {
    // position: "fixed",
    // zIndex: 99,
    // width: "100%",
    // top: 0,
    "& > .MuiAppBar-colorPrimary": {
      background: "#001c30",
      padding: "0.4rem 0",
      [theme.breakpoints.down(769)]: {
        padding: "1.2rem 0",
      },
      [theme.breakpoints.down(480)]: {
        padding: "0.8rem 0",
      },
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const mobileMenu = useMediaQuery("(max-width:769px)");

  return (
    <div className={classes.mainHeader}>
      <AppBar position="static">
        <Container>{mobileMenu ? <MobileMenu /> : <DesktopMenu />}</Container>
      </AppBar>
    </div>
  );
};
export default Header;
