import {
  Button,
  Container,
  Drawer,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../../../assets/Logo/piktask.png";
import { getBaseURL } from "../../../../../helpers";
import CustomPopper from "../../../CustomPopper";
import MobileSidebarMenu from "../Sidebar/MobileSidebarMenu";
import useStyles from "./AdminHeader.styles";

const customStyles = makeStyles({
  menuWrapper: {
    top: "1.8rem",
    marginTop: 20,
    color: "#FFF",
    display: "flex",
    justifyContent: "space-between",

    "@media (max-width: 425px)": {
      marginTop: 10,
    },
  },
  closeIconWrapper: {
    backgroundColor: "#063B52",
    padding: "1rem",
    boxShadow: "0px 0px 50px 50px #042C3D",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: "4rem",
    cursor: "pointer",
    color: "#001c30",
    "@media (max-width: 769px)": {
      fontSize: "3.5rem",
      marginBottom: "0.3rem",
    },
    "@media (max-width: 426px)": {
      fontSize: "2.5rem",
      marginBottom: "-0.8rem",
    },
  },
  closeMenuIcon: {
    fontSize: "3rem",
    cursor: "pointer",
    color: "#FFF",
  },
});

const AdminHeader = () => {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const iconClass = customStyles();
  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
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

  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };
  const handleListKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };
  const handleMobileMenu = () => {
    setOpenMobileMenu(true);
  };

  return (
    <>
      <div position="fixed" className={classes.appbarHeader}>
        {mobileView ? (
          <div className={classes.fullWidth}>
            <Container classes={{ root: classes.root }}>
              <Grid
                container
                spacing={2}
                classes={{ container: classes.container }}
              >
                <Grid item xs={2}>
                  <Link to="/" className={classes.adminLogoLink}>
                    <img
                      className={classes.adminLogo}
                      src={logo}
                      alt="Piktask"
                    />
                  </Link>
                </Grid>

                <Grid item xs={10} classes={{ item: classes.item }}>
                  <div className={classes.headerInfo}>
                    <div
                      className={classes.userProfile}
                      onClick={handleToggle}
                      aria-controls={open ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      ref={anchorRef}
                    >
                      {user?.isLoggedIn &&
                      user?.role === "contributor" &&
                      user?.avatar &&
                      user?.avatar !== "null" ? (
                        <>
                          {user?.avatar_from === "own" ? (
                            <img
                              className={classes.avatar}
                              src={
                                getBaseURL().bucket_base_url +
                                getBaseURL().profiles +
                                user?.avatar
                              }
                              alt={user?.username}
                            />
                          ) : (
                            <img
                              className={classes.avatar}
                              src={user?.avatar}
                              alt={user?.username}
                            />
                          )}
                        </>
                      ) : (
                        <AccountCircleIcon className={classes.avatar} />
                      )}
                      <Typography className={classes.userName} variant="h4">
                        {user ? user?.username : "Design Studio"}
                      </Typography>
                      <ArrowDropDownIcon className={classes.arrowDown} />
                    </div>
                    <MenuIcon
                      onClick={handleMobileMenu}
                      className={iconClass.menuIcon}
                    />
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        ) : (
          <div className={classes.fullWidth}>
            <div className={classes.root}>
              <div>
                <Button
                  className={classes.uploadBtn}
                  component={Link}
                  to="/contributor/upload"
                >
                  <CloudUploadIcon className={classes.ButtoncrownIcon} />
                  Upload
                </Button>
              </div>

              <div>
                <div className={classes.headerInfo}>
                  <div className={classes.notificationIcon}>
                    <NotificationsIcon />
                  </div>
                  <div
                    className={classes.userProfile}
                    onClick={handleToggle}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    ref={anchorRef}
                  >
                    {user?.isLoggedIn &&
                    user?.role === "contributor" &&
                    user?.avatar &&
                    user?.avatar !== "null" ? (
                      <>
                        {user?.avatar_from === "own" ? (
                          <img
                            className={classes.avatar}
                            src={
                              getBaseURL().bucket_base_url + "/" + user?.avatar
                            }
                            alt={user?.username}
                          />
                        ) : (
                          <img
                            className={classes.avatar}
                            src={user?.avatar}
                            alt={user?.username}
                          />
                        )}
                      </>
                    ) : (
                      <AccountCircleIcon className={classes.avatar} />
                    )}
                    <Typography className={classes.userName} variant="h4">
                      {user ? user.username : "Design Studio"}
                    </Typography>
                    <ArrowDropDownIcon className={classes.arrowDown} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Drawer
          anchor="right"
          classes={{ paper: classes.paper }}
          open={openMobileMenu}
          onClose={() => setOpenMobileMenu(false)}
        >
          <div className={iconClass.closeIconWrapper}>
            <CloseIcon
              onClick={() => setOpenMobileMenu(false)}
              className={iconClass.closeMenuIcon}
            />
            {user && user?.isLoggedIn ? (
              <Button
                component={Link}
                to="/"
                className={classes.logoWrapper}
                disableRipple
              >
                <img src={logo} className={classes.logo} alt="piktask" />
              </Button>
            ) : (
              <div>
                <Button
                  className={classes.loginBtn}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  className={classes.signUpBtn}
                  component={Link}
                  to="/registration"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
          <MobileSidebarMenu />
        </Drawer>
        <CustomPopper
          open={open}
          handleToggle={handleToggle}
          anchorRef={anchorRef}
          handleClose={handleClose}
          handleListKeyDown={handleListKeyDown}
        />
      </div>
    </>
  );
};

export default AdminHeader;
