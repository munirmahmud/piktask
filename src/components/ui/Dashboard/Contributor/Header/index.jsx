import React, { useEffect, useState } from "react";
import useStyles from "./AdminHeader.styles";
import DashboardDesktopMenu from "./DashboardDesktopMenu";
import DashboardMobileMenu from "./DashboardMobileMenu/index";

const AdminHeader = () => {
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
    <div position="fixed" className={classes.appbarHeader}>
      <div className={classes.fullWidth}>{mobileView ? <DashboardMobileMenu /> : <DashboardDesktopMenu />}</div>
    </div>
  );
};

export default AdminHeader;
