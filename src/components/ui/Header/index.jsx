import { AppBar, Container, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const useStyles = makeStyles((theme) => ({
  mainHeader: {
    "& > .MuiAppBar-colorPrimary": {
      background: "#001c30",
      height: 70,
    },
    [theme.breakpoints.down(426)]: {
      height: 58,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [menuSate, setMenuSate] = useState({ mobileView: false });
  const { mobileView } = menuSate;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 769
        ? setMenuSate((prevState) => ({ ...prevState, mobileView: true }))
        : setMenuSate((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  return (
    <div className={classes.mainHeader}>
      <AppBar position="static">
        <Container>{mobileView ? <MobileMenu /> : <DesktopMenu />}</Container>
      </AppBar>
    </div>
  );
};
export default Header;
